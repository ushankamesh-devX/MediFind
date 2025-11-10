const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'healthapp',           // ← NEW USER
  password: '@Kamesh9396164',   // ← NEW PASSWORD
  database: 'healthdb'
});

db.connect(err => {
  if (err) {
    console.error('MySQL Connection Failed:', err.message);
    process.exit(1);
  }
  console.log('MySQL Connected!');
});

// Create table if not exists
const createTable = `
  CREATE TABLE IF NOT EXISTS symptoms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255),
    date VARCHAR(50),
    user_id INT DEFAULT 1
  )
`;

db.query(createTable, (err) => {
  if (err) {
    console.error('Table creation failed:', err.message);
  } else {
    console.log('Symptoms table ready');
  }
});

// GET /symptoms
app.get('/symptoms', (req, res) => {
  db.query('SELECT * FROM symptoms ORDER BY date DESC', (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// POST /symptoms
app.post('/symptoms', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const date = new Date().toLocaleDateString();
  db.query(
    'INSERT INTO symptoms (text, date) VALUES (?, ?)',
    [text, date],
    (err, result) => {
      if (err) {
        console.error('Insert error:', err);
        return res.status(500).json({ error: 'Failed to save symptom' });
      }
      res.json({ id: result.insertId, text, date });
    }
  );
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});