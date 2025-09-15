# MediFind Backend API

A modular Node.js backend API for the MediFind application, built with Express.js and MySQL.

## Features

- **User Authentication**: Customer and pharmacy owner registration/login
- **Session Management**: Secure session-based authentication
- **Modular Architecture**: Well-organized code structure
- **Input Validation**: Comprehensive validation using express-validator
- **Database Integration**: MySQL with Sequelize ORM
- **Error Handling**: Global error handling middleware
- **CORS Support**: Cross-origin resource sharing enabled

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js      # Database connection
│   │   └── config.js        # Environment configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication endpoints
│   │   └── userController.js    # User management endpoints
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   └── validation.js    # Input validation middleware
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── UserProfile.js   # User profile model
│   │   ├── PharmacyDetails.js   # Pharmacy details model
│   │   ├── UserSession.js   # User session model
│   │   └── index.js         # Model exports
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── user.js          # User routes
│   ├── services/
│   │   ├── authService.js   # Authentication business logic
│   │   └── userService.js   # User business logic
│   ├── utils/
│   │   ├── helpers.js       # Utility helper functions
│   │   └── validators.js    # Custom validation functions
│   └── app.js               # Express app configuration
├── .env.example             # Environment variables template
├── package.json
└── index.js                 # Main entry point
```

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd medifind/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your MySQL database credentials.

4. **Create MySQL database**
   ```sql
   CREATE DATABASE medifind;
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `4000` |
| `NODE_ENV` | Environment mode | `development` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | `''` |
| `DB_NAME` | MySQL database name | `medifind` |
| `DB_PORT` | MySQL port | `3306` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `24h` |
| `SESSION_EXPIRE_HOURS` | Session expiration hours | `24` |
| `SALT_ROUNDS` | Password hashing rounds | `12` |

## API Endpoints

### Authentication

#### Register Customer
```http
POST /api/auth/register/customer
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phoneNumber": "0771234567"
}
```

#### Register Pharmacy
```http
POST /api/auth/register/pharmacy
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@pharmacy.com",
  "password": "password123",
  "confirmPassword": "password123",
  "phoneNumber": "0112345678",
  "pharmacyName": "Smith Pharmacy",
  "licenseNumber": "PH001234",
  "businessAddress": "123 Main St, Colombo",
  "latitude": 6.9271,
  "longitude": 79.8612,
  "operatingHours": {
    "monday": {"open": "08:00", "close": "20:00"},
    "tuesday": {"open": "08:00", "close": "20:00"}
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Logout
```http
POST /api/auth/logout
Content-Type: application/json
Authorization: Bearer <session-token>

{
  "sessionToken": "abc123xyz"
}
```

### User Management

#### Get Profile
```http
GET /api/user/profile
Authorization: Bearer <session-token>
```

#### Update Profile
```http
PUT /api/user/profile
Authorization: Bearer <session-token>
Content-Type: application/json

{
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Main St",
  "city": "Colombo",
  "postalCode": "00100"
}
```

#### Update Pharmacy Details
```http
PUT /api/user/pharmacy-details
Authorization: Bearer <session-token>
Content-Type: application/json

{
  "pharmacyName": "Updated Pharmacy Name",
  "licenseNumber": "PH001234",
  "businessAddress": "Updated Address",
  "phoneNumber": "0112345678",
  "latitude": 6.9271,
  "longitude": 79.8612,
  "operatingHours": {
    "monday": {"open": "09:00", "close": "21:00"}
  }
}
```

## Database Schema

The application uses four main tables:

1. **users** - User accounts
2. **user_profiles** - Extended user information
3. **pharmacy_details** - Pharmacy-specific information
4. **user_sessions** - Session management

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Session management with expiration
- Input validation and sanitization
- CORS protection
- SQL injection prevention with Sequelize ORM

## Development

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

## Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update database credentials for production
3. Use a process manager like PM2 for production deployment
4. Set up SSL/TLS certificates for HTTPS

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please contact the development team or create an issue in the repository.