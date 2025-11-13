# Login Page Documentation

## Overview
The Login page allows existing users to authenticate and access the MediFind application.

---

## Page Information

- **Route:** `/login`
- **Component File:** `src/pages/Login.js` (to be created)
- **Style File:** `src/styles/Login.css` (to be created)
- **Authentication:** Public (unauthenticated users only)

---

## Page Layout

```
+----------------------------------+
|          MediFind Logo           |
|                                  |
|     Welcome Back!                |
|     Sign in to continue          |
|                                  |
|  +----------------------------+  |
|  | Email Address              |  |
|  +----------------------------+  |
|                                  |
|  +----------------------------+  |
|  | Password           [👁]    |  |
|  +----------------------------+  |
|                                  |
|  [ ] Remember me                 |
|                   Forgot Password?|
|                                  |
|  +----------------------------+  |
|  |      LOGIN BUTTON          |  |
|  +----------------------------+  |
|                                  |
|  --------  OR  --------          |
|                                  |
|  +----------------------------+  |
|  | 🔵 Continue with Google    |  |
|  +----------------------------+  |
|  +----------------------------+  |
|  | 📘 Continue with Facebook  |  |
|  +----------------------------+  |
|                                  |
|  Don't have an account? Register |
|                                  |
+----------------------------------+
```

---

## Content Structure

### 1. Header Section
- **Logo:** MediFind logo/brand name
- **Tagline:** "Your Medicine Finder"

### 2. Form Section

#### Email Input
- **Label:** "Email Address"
- **Type:** email
- **Placeholder:** "Enter your email"
- **Required:** Yes
- **Validation:** Email format validation

#### Password Input
- **Label:** "Password"
- **Type:** password (with toggle visibility)
- **Placeholder:** "Enter your password"
- **Required:** Yes
- **Features:** Show/hide password toggle icon

#### Remember Me Checkbox
- **Label:** "Remember me"
- **Type:** checkbox
- **Default:** Unchecked

#### Forgot Password Link
- **Text:** "Forgot Password?"
- **Action:** Navigate to password recovery page
- **Position:** Right-aligned under password field

### 3. Action Buttons

#### Primary Login Button
- **Text:** "Login" or "Sign In"
- **Type:** submit
- **Style:** Primary button (brand color)
- **Action:** Authenticate user credentials

### 4. Social Login Section
- **Divider:** "OR" text with horizontal lines
- **Google Login Button**
  - Icon: Google logo
  - Text: "Continue with Google"
  - Style: White background with Google brand colors
  
- **Facebook Login Button**
  - Icon: Facebook logo
  - Text: "Continue with Facebook"
  - Style: Facebook blue background

### 5. Registration Link
- **Text:** "Don't have an account? Register"
- **Action:** Navigate to `/register`
- **Style:** Text link, centered

---

## Functionality

### Form Validation
1. **Email Validation**
   - Check for valid email format
   - Show error message for invalid format
   
2. **Password Validation**
   - Minimum 6 characters
   - Show error for empty field

3. **Real-time Validation**
   - Display error messages below each field
   - Highlight invalid fields with red border

### Login Process
1. User enters credentials
2. Form validates input
3. Submit credentials to backend API
4. On success: Redirect to home page
5. On failure: Display error message

### Error Handling
- Invalid credentials: "Invalid email or password"
- Network error: "Unable to connect. Please try again"
- Server error: "Something went wrong. Please try again later"

---

## API Integration

### Endpoint
```
POST /api/auth/login
```

### Request Body
```json
{
  "email": "user@example.com",
  "password": "userpassword"
}
```

### Response (Success)
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### Response (Error)
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## Styling Guidelines

### Color Scheme
- **Primary Color:** #2563eb (Blue)
- **Secondary Color:** #10b981 (Green)
- **Error Color:** #ef4444 (Red)
- **Background:** #ffffff (White)
- **Text Primary:** #1f2937 (Dark Gray)
- **Text Secondary:** #6b7280 (Medium Gray)

### Typography
- **Heading:** 28px, Bold, Inter/Roboto
- **Body Text:** 16px, Regular
- **Button Text:** 16px, Semi-bold
- **Input Text:** 16px, Regular

### Spacing
- **Container Padding:** 24px
- **Input Margin:** 16px between fields
- **Button Height:** 48px
- **Border Radius:** 8px

### Responsive Design
- **Mobile:** Single column, full width inputs
- **Tablet:** Centered form, max-width 400px
- **Desktop:** Centered form, max-width 400px

---

## Accessibility

- All form fields have proper labels
- Keyboard navigation support (Tab order)
- ARIA labels for screen readers
- Focus indicators on interactive elements
- High contrast for text readability
- Alt text for images/logos

---

## User Experience Features

1. **Auto-focus:** Email field auto-focused on page load
2. **Loading State:** Show spinner during authentication
3. **Success Feedback:** Brief success message before redirect
4. **Password Toggle:** Eye icon to show/hide password
5. **Remember Me:** Store login preference in localStorage
6. **Error Messages:** Clear, actionable error messages

---

## Security Considerations

- Passwords not visible by default
- HTTPS required for form submission
- JWT token stored securely (httpOnly cookies)
- CSRF protection
- Rate limiting on login attempts
- Input sanitization to prevent XSS attacks
