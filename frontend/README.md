# MediFind Frontend

A modern React frontend application for the MediFind healthcare platform, built with React.js and styled with Tailwind CSS.

## Features

- **User Authentication**: Customer and pharmacy owner registration/login
- **Responsive Design**: Mobile-first design with modern UI components
- **Medical Theme**: Healthcare-focused color scheme and design elements
- **Session Management**: Secure authentication with session tokens
- **Form Validation**: Comprehensive client-side validation
- **Modern UI Components**: Reusable components with consistent styling

## Tech Stack

- **React 19**: Latest React with hooks and modern features
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Theme**: Medical/pharmacy themed color palette
- **Context API**: State management for authentication
- **ES6+**: Modern JavaScript features

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx              # Login form component
│   │   │   ├── CustomerRegister.jsx    # Customer registration form
│   │   │   └── PharmacyRegister.jsx    # Pharmacy registration form
│   │   ├── common/
│   │   │   ├── Header.jsx             # Application header
│   │   │   ├── Footer.jsx             # Application footer
│   │   │   └── Layout.jsx             # Main layout wrapper
│   │   └── ui/
│   │       ├── Input.jsx              # Reusable input component
│   │       ├── Button.jsx             # Reusable button component
│   │       └── Card.jsx               # Reusable card component
│   ├── context/
│   │   └── AuthContext.jsx            # Authentication context
│   ├── hooks/
│   │   ├── useAuth.js                 # Authentication hook
│   │   └── useApi.js                  # API communication hook
│   ├── pages/
│   │   ├── HomePage.jsx               # Landing page
│   │   ├── LoginPage.jsx              # Login page
│   │   ├── RegisterPage.jsx           # Registration selection page
│   │   └── DashboardPage.jsx          # User dashboard
│   ├── services/
│   │   └── api.js                     # API service functions
│   ├── utils/
│   │   ├── constants.js               # Application constants
│   │   └── validators.js              # Form validation functions
│   ├── App.js                         # Main application component
│   └── index.js                       # Application entry point
├── public/
│   ├── index.html                     # HTML template
│   └── ...                            # Static assets
├── package.json
├── tailwind.config.js                 # Tailwind CSS configuration
├── postcss.config.js                  # PostCSS configuration
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (see backend README)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`

## Environment Setup

The frontend connects to the backend API at `http://localhost:4000`. Make sure the backend server is running before starting the frontend.

## Available Scripts

### `npm start`
Runs the app in development mode with hot reloading.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: This is a one-way operation!**

Ejects from Create React App for advanced customization.

## Authentication Flow

### Customer Registration
1. User selects "Customer Account" on registration page
2. Fills out personal information form
3. Account is created and user is redirected to login

### Pharmacy Registration
1. User selects "Pharmacy Owner" on registration page
2. Fills out personal and pharmacy information
3. Account and pharmacy details are created
4. User is redirected to login

### Login
1. User enters email and password
2. Credentials are validated against backend
3. Session token is stored locally
4. User is redirected to dashboard

## Theme Configuration

The application uses a custom medical/pharmacy theme with the following color palette:

- **Primary**: Medical blue (#2563eb)
- **Secondary**: Pharmacy green (#16a34a)
- **Accent**: Emergency red (#dc2626)
- **Background**: Light medical blue gradients

Custom utilities include:
- `.text-gradient`: Gradient text effect
- `.bg-glass`: Glassmorphism background
- `.shadow-medical`: Medical-themed shadows

## API Integration

The frontend communicates with the backend through RESTful APIs:

- `POST /api/auth/login` - User login
- `POST /api/auth/register/customer` - Customer registration
- `POST /api/auth/register/pharmacy` - Pharmacy registration
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/pharmacy-details` - Update pharmacy details

## Component Architecture

### UI Components
- **Input**: Reusable form input with validation
- **Button**: Configurable button with loading states
- **Card**: Container component with shadow variants

### Auth Components
- **Login**: Email/password login form
- **CustomerRegister**: Customer registration form
- **PharmacyRegister**: Pharmacy registration form

### Layout Components
- **Header**: Navigation and branding
- **Footer**: Links and company information
- **Layout**: Page wrapper with header/footer

## State Management

Authentication state is managed through React Context:

- **AuthContext**: Provides authentication state and methods
- **useAuth**: Hook for accessing authentication context
- **Local Storage**: Session tokens and user data persistence

## Validation

Client-side validation includes:

- Email format validation
- Password strength requirements
- Phone number format (Sri Lankan)
- Required field validation
- Password confirmation matching

## Responsive Design

The application is fully responsive with:

- Mobile-first approach
- Flexible grid layouts
- Responsive typography
- Touch-friendly interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Code Style
- ESLint configuration for code quality
- Prettier for code formatting
- Consistent component structure

### Hot Reloading
- Automatic browser refresh on file changes
- Fast development workflow

## Deployment

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Serve static files**
   ```bash
   npm install -g serve
   serve -s build
   ```

3. **Deploy to hosting platform**
   - Netlify
   - Vercel
   - AWS S3 + CloudFront
   - Traditional web server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Troubleshooting

### Common Issues

**API Connection Failed**
- Ensure backend server is running on port 4000
- Check CORS configuration
- Verify API endpoints match backend

**Styling Issues**
- Clear browser cache
- Check Tailwind CSS compilation
- Verify theme configuration

**Authentication Problems**
- Clear local storage
- Check session token validity
- Verify backend authentication logic

## License

This project is licensed under the ISC License.

## Support

For support, please contact the development team or create an issue in the repository.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
