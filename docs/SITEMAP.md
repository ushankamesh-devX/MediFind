# MediFind - Site Map

## Application Overview
MediFind is a mobile-friendly web application that helps users locate medicines at nearby pharmacies using an interactive map interface.

---

## Site Structure

```
MediFind Application
│
├── Authentication
│   ├── Login Page (/login)
│   └── Register Page (/register)
│
├── Home Page (/)
│   ├── Search Medicine
│   ├── Map View
│   └── Pharmacy List
│
├── Medicine Search Results (/search)
│   ├── Medicine Details
│   ├── Available Pharmacies Map
│   └── Pharmacy Cards with Distance
│
├── Pharmacy Details (/pharmacy/:id)
│   ├── Pharmacy Information
│   ├── Available Medicines
│   ├── Contact Details
│   └── Directions
│
├── User Profile (/profile)
│   ├── User Information
│   ├── Search History
│   └── Favorite Pharmacies
│
└── Settings (/settings)
    ├── Notification Preferences
    ├── Location Settings
    └── Account Management
```

---

## Current Phase - Initial Pages

### 1. Login Page (`/login`)
- User authentication
- Email/password input
- Social login options
- Forgot password link
- Link to registration

### 2. Register Page (`/register`)
- New user registration
- Form validation
- Terms and conditions
- Link to login

### 3. Home Page (`/`)
- Medicine search functionality
- Interactive map showing pharmacies
- List of nearby pharmacies
- Quick access to user profile

---

## Future Pages (Not Yet Implemented)

- Medicine Search Results
- Pharmacy Details
- User Profile
- Settings
- Favorites
- Search History
- Notifications

---

## Navigation Flow

```
Register → Login → Home → Search Results → Pharmacy Details
                  ↓
                Profile → Settings
```
