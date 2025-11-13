# MediFind - Style Guide

## Overview
This document defines the visual design system, UI components, and styling standards for the MediFind application.

---

## Color Palette

### Primary Colors
```css
--primary-50:  #eff6ff
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-300: #93c5fd
--primary-400: #60a5fa
--primary-500: #3b82f6  /* Main Primary */
--primary-600: #2563eb  /* Primary Dark */
--primary-700: #1d4ed8
--primary-800: #1e40af
--primary-900: #1e3a8a
```

### Secondary Colors
```css
--secondary-50:  #f0fdf4
--secondary-100: #dcfce7
--secondary-200: #bbf7d0
--secondary-300: #86efac
--secondary-400: #4ade80
--secondary-500: #22c55e  /* Main Secondary */
--secondary-600: #16a34a  /* Secondary Dark */
--secondary-700: #15803d
--secondary-800: #166534
--secondary-900: #14532d
```

### Accent Colors
```css
--accent-purple: #8b5cf6
--accent-pink:   #ec4899
--accent-orange: #f59e0b
```

### Neutral Colors (Grayscale)
```css
--gray-50:  #f9fafb
--gray-100: #f3f4f6
--gray-200: #e5e7eb
--gray-300: #d1d5db
--gray-400: #9ca3af
--gray-500: #6b7280
--gray-600: #4b5563
--gray-700: #374151
--gray-800: #1f2937
--gray-900: #111827
```

### Semantic Colors
```css
--success:  #10b981
--warning:  #f59e0b
--error:    #ef4444
--info:     #3b82f6
```

### Status Colors
```css
--open-status:    #10b981  /* Green - Open */
--closing-soon:   #f59e0b  /* Orange - Closing Soon */
--closed-status:  #ef4444  /* Red - Closed */
--24-hours:       #3b82f6  /* Blue - 24/7 */
```

### Background Colors
```css
--bg-primary:   #ffffff
--bg-secondary: #f9fafb
--bg-tertiary:  #f3f4f6
--bg-dark:      #1f2937
```

---

## Typography

### Font Families
```css
--font-primary:   'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
--font-secondary: 'Roboto', sans-serif
--font-mono:      'Fira Code', 'Courier New', monospace
```

### Font Sizes
```css
--text-xs:   0.75rem   /* 12px */
--text-sm:   0.875rem  /* 14px */
--text-base: 1rem      /* 16px */
--text-lg:   1.125rem  /* 18px */
--text-xl:   1.25rem   /* 20px */
--text-2xl:  1.5rem    /* 24px */
--text-3xl:  1.875rem  /* 30px */
--text-4xl:  2.25rem   /* 36px */
--text-5xl:  3rem      /* 48px */
```

### Font Weights
```css
--font-light:     300
--font-regular:   400
--font-medium:    500
--font-semibold:  600
--font-bold:      700
--font-extrabold: 800
```

### Line Heights
```css
--leading-none:    1
--leading-tight:   1.25
--leading-snug:    1.375
--leading-normal:  1.5
--leading-relaxed: 1.625
--leading-loose:   2
```

### Typography Usage

```css
/* Headings */
h1 { font-size: var(--text-4xl); font-weight: var(--font-bold); line-height: var(--leading-tight); }
h2 { font-size: var(--text-3xl); font-weight: var(--font-bold); line-height: var(--leading-tight); }
h3 { font-size: var(--text-2xl); font-weight: var(--font-semibold); line-height: var(--leading-snug); }
h4 { font-size: var(--text-xl); font-weight: var(--font-semibold); line-height: var(--leading-snug); }
h5 { font-size: var(--text-lg); font-weight: var(--font-medium); line-height: var(--leading-normal); }

/* Body Text */
body { font-size: var(--text-base); font-weight: var(--font-regular); line-height: var(--leading-normal); }

/* Small Text */
small { font-size: var(--text-sm); line-height: var(--leading-normal); }

/* Captions */
.caption { font-size: var(--text-xs); color: var(--gray-500); }
```

---

## Spacing System

### Base Unit: 4px

```css
--space-0:  0
--space-1:  0.25rem  /* 4px */
--space-2:  0.5rem   /* 8px */
--space-3:  0.75rem  /* 12px */
--space-4:  1rem     /* 16px */
--space-5:  1.25rem  /* 20px */
--space-6:  1.5rem   /* 24px */
--space-8:  2rem     /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
```

### Common Spacing Usage
- **Component padding:** 16px (--space-4)
- **Card padding:** 20px (--space-5)
- **Section margin:** 24px (--space-6)
- **Page padding:** 20-24px
- **Between form fields:** 16px
- **Button padding:** 12px 24px

---

## Border Radius

```css
--radius-none: 0
--radius-sm:   0.125rem  /* 2px */
--radius-base: 0.25rem   /* 4px */
--radius-md:   0.375rem  /* 6px */
--radius-lg:   0.5rem    /* 8px */
--radius-xl:   0.75rem   /* 12px */
--radius-2xl:  1rem      /* 16px */
--radius-3xl:  1.5rem    /* 24px */
--radius-full: 9999px    /* Fully rounded */
```

### Usage
- **Buttons:** 8px (--radius-lg)
- **Cards:** 12px (--radius-xl)
- **Input fields:** 8px (--radius-lg)
- **Modals:** 16px (--radius-2xl)
- **Badges:** 9999px (--radius-full)
- **Avatar:** 9999px (--radius-full)

---

## Shadows

```css
--shadow-sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
--shadow:     0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)
--shadow-md:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
--shadow-lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
--shadow-xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

### Usage
- **Cards:** --shadow
- **Buttons (hover):** --shadow-md
- **Modals:** --shadow-xl
- **Dropdowns:** --shadow-lg
- **Floating elements:** --shadow-2xl

---

## Components

### Buttons

#### Primary Button
```css
.btn-primary {
  background-color: var(--primary-600);
  color: white;
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--primary-700);
  box-shadow: var(--shadow-md);
}

.btn-primary:active {
  background-color: var(--primary-800);
}

.btn-primary:disabled {
  background-color: var(--gray-300);
  cursor: not-allowed;
}
```

#### Secondary Button
```css
.btn-secondary {
  background-color: white;
  color: var(--primary-600);
  border: 2px solid var(--primary-600);
  padding: 12px 24px;
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--primary-50);
}
```

#### Button Sizes
```css
.btn-sm  { padding: 8px 16px; font-size: var(--text-sm); }
.btn-md  { padding: 12px 24px; font-size: var(--text-base); }
.btn-lg  { padding: 14px 28px; font-size: var(--text-lg); }
```

### Input Fields

```css
.input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input:disabled {
  background-color: var(--gray-100);
  cursor: not-allowed;
}

.input-error {
  border-color: var(--error);
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### Cards

```css
.card {
  background-color: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: var(--shadow);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.card-body {
  margin-bottom: var(--space-4);
}

.card-footer {
  border-top: 1px solid var(--gray-200);
  padding-top: var(--space-4);
}
```

### Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
}

.badge-success {
  background-color: #d1fae5;
  color: #065f46;
}

.badge-warning {
  background-color: #fef3c7;
  color: #92400e;
}

.badge-error {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge-info {
  background-color: #dbeafe;
  color: #1e40af;
}
```

### Modals

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background-color: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--gray-200);
}

.modal-body {
  padding: var(--space-6);
}

.modal-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}
```

---

## Icons

### Icon Library
- **Recommended:** Heroicons, Lucide, or Material Icons
- **Size:** 20px (standard), 16px (small), 24px (large)
- **Color:** Inherit from parent or use semantic colors

### Icon Usage
```css
.icon-sm  { width: 16px; height: 16px; }
.icon-md  { width: 20px; height: 20px; }
.icon-lg  { width: 24px; height: 24px; }
.icon-xl  { width: 32px; height: 32px; }
```

---

## Animations & Transitions

### Standard Transitions
```css
--transition-fast:   150ms ease
--transition-base:   200ms ease
--transition-slow:   300ms ease
```

### Common Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## Responsive Design

### Breakpoints
```css
--breakpoint-sm:  640px   /* Small devices */
--breakpoint-md:  768px   /* Medium devices */
--breakpoint-lg:  1024px  /* Large devices */
--breakpoint-xl:  1280px  /* Extra large */
--breakpoint-2xl: 1536px  /* 2X large */
```

### Media Queries
```css
/* Mobile First Approach */
@media (min-width: 640px) { /* Small devices and up */ }
@media (min-width: 768px) { /* Medium devices and up */ }
@media (min-width: 1024px) { /* Large devices and up */ }
```

---

## Accessibility

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### Color Contrast
- Ensure WCAG AA compliance (4.5:1 for normal text)
- Use dark text on light backgrounds
- Use light text on dark backgrounds

### Interactive Elements
- Minimum touch target: 44x44px
- Clear hover and active states
- Keyboard navigation support

---

## File Organization

```
src/
├── styles/
│   ├── variables.css       /* CSS custom properties */
│   ├── base.css           /* Reset and base styles */
│   ├── components/
│   │   ├── buttons.css
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── modals.css
│   │   └── badges.css
│   ├── pages/
│   │   ├── Login.css
│   │   ├── Register.css
│   │   └── Home.css
│   └── utilities.css      /* Utility classes */
```

---

## Best Practices

1. **Use CSS Variables** - For consistent theming
2. **Mobile First** - Design for mobile, enhance for desktop
3. **Reusable Components** - Create modular, reusable styles
4. **Semantic HTML** - Use appropriate HTML tags
5. **Accessibility** - Always consider keyboard and screen reader users
6. **Performance** - Minimize CSS file size, use efficient selectors
7. **Consistency** - Follow this guide for all new components
8. **Documentation** - Comment complex CSS rules

---

## Dark Mode (Optional)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #111827;
    --bg-secondary: #1f2937;
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    /* Adjust other colors as needed */
  }
}
```
