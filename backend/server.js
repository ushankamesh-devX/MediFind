const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// JWT Secret (use environment variable in production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// MySQL Connection with retry logic
let db;
const maxRetries = 10;
const retryDelay = 3000; // 3 seconds

function connectWithRetry(retries = 0) {
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '@Kamesh9396164',
    database: process.env.DB_NAME || 'healthdb'
  });

  db.connect(err => {
    if (err) {
      console.error(`MySQL Connection Failed (attempt ${retries + 1}/${maxRetries}):`, err.message);

      if (retries < maxRetries) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        setTimeout(() => connectWithRetry(retries + 1), retryDelay);
      } else {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      return;
    }

    console.log('MySQL Connected!');

    // Create users table
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(createUsersTable, (err) => {
      if (err) {
        console.error('Users table creation failed:', err.message);
      } else {
        console.log('Users table ready');

        // Create a default test user (email: user@example.com, password: password)
        const hashedPassword = bcrypt.hashSync('password', 10);
        db.query(
          'INSERT IGNORE INTO users (email, password) VALUES (?, ?)',
          ['user@example.com', hashedPassword],
          (err) => {
            if (err) {
              console.error('Default user creation failed:', err.message);
            } else {
              console.log('Default user created: user@example.com / password');
            }
          }
        );
      }
    });

    // Create symptoms table with user_id reference
    const createSymptomsTable = `
      CREATE TABLE IF NOT EXISTS symptoms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        text VARCHAR(255),
        date VARCHAR(50),
        user_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    db.query(createSymptomsTable, (err) => {
      if (err) {
        console.error('Symptoms table creation failed:', err.message);
      } else {
        console.log('Symptoms table ready');
      }
    });
  });

  // Handle connection errors after initial connection
  db.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Attempting to reconnect...');
      connectWithRetry(0);
    }
  });
}

// Start connection attempt
connectWithRetry();

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Health check endpoint
app.get('/health', (req, res) => {
  if (!db || db.state === 'disconnected') {
    return res.status(503).json({ status: 'unhealthy', message: 'Database not connected' });
  }
  res.json({ status: 'healthy' });
});

// ==================== AUTH ROUTES ====================

// Register new user
app.post('/register', (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not ready' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'User with this email already exists' });
        }
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Failed to register user' });
      }

      res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId
      });
    }
  );
});

// Login user
app.post('/login', (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not ready' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  db.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Login query error:', err);
        return res.status(500).json({ error: 'Login failed' });
      }

      if (!results.length) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email
        }
      });
    }
  );
});

// ==================== PROTECTED ROUTES ====================

// GET /symptoms - Protected route (only returns current user's symptoms)
app.get('/symptoms', authenticateToken, (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not ready' });
  }

  // Get symptoms only for the authenticated user
  db.query(
    'SELECT * FROM symptoms WHERE user_id = ? ORDER BY date DESC',
    [req.user.id],
    (err, results) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results);
    }
  );
});

// POST /symptoms - Protected route (adds symptom for current user)
app.post('/symptoms', authenticateToken, (req, res) => {
  if (!db) {
    return res.status(503).json({ error: 'Database not ready' });
  }

  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const date = new Date().toLocaleDateString();

  // Add symptom with the authenticated user's ID
  db.query(
    'INSERT INTO symptoms (text, date, user_id) VALUES (?, ?, ?)',
    [text, date, req.user.id],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Failed to save symptom' });
      }
      res.json({
        id: result.insertId,
        text,
        date,
        user_id: req.user.id
      });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});