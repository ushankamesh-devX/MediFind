/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Medical Theme Colors
        medical: {
          primary: '#2563eb',      // Deep medical blue
          secondary: '#059669',    // Medical green (health/wellness)
          accent: '#dc2626',       // Emergency red
          light: '#f0f9ff',        // Light medical blue
          dark: '#1e3a8a',         // Dark medical blue
        },

        // Pharmacy Brand Colors
        pharmacy: {
          blue: '#1e40af',         // Professional pharmacy blue
          green: '#16a34a',        // Pharmacy cross green
          teal: '#0d9488',         // Modern healthcare teal
          mint: '#10b981',         // Fresh mint green
          navy: '#1e293b',         // Professional navy
        },

        // Status & Notification Colors
        status: {
          available: '#22c55e',    // Available/In stock
          unavailable: '#ef4444',  // Out of stock
          pending: '#f59e0b',      // Order pending
          processing: '#3b82f6',   // Order processing
          completed: '#10b981',    // Order completed
          cancelled: '#6b7280',    // Order cancelled
        },

        // UI Theme Colors
        theme: {
          primary: '#2563eb',      // Main brand color
          secondary: '#64748b',    // Secondary text/elements
          success: '#059669',      // Success states
          warning: '#d97706',      // Warning states
          error: '#dc2626',        // Error states
          info: '#0284c7',         // Information states
        },

        // Background Colors
        background: {
          primary: '#ffffff',      // Main background
          secondary: '#f8fafc',    // Secondary background
          tertiary: '#f1f5f9',     // Card backgrounds
          dark: '#0f172a',         // Dark mode background
          gradient: {
            start: '#eff6ff',      // Gradient start (light blue)
            end: '#f0fdf4',        // Gradient end (light green)
          },
        },

        // Text Colors
        text: {
          primary: '#1e293b',      // Primary text
          secondary: '#475569',    // Secondary text
          muted: '#64748b',        // Muted text
          light: '#94a3b8',        // Light text
          white: '#ffffff',        // White text
          accent: '#2563eb',       // Accent text (links, highlights)
        },

        // Border Colors
        border: {
          primary: '#e2e8f0',      // Primary borders
          secondary: '#cbd5e1',    // Secondary borders
          accent: '#2563eb',       // Accent borders
          success: '#059669',      // Success borders
          warning: '#d97706',      // Warning borders
          error: '#dc2626',        // Error borders
        },

        // Map & Location Colors
        map: {
          marker: '#dc2626',       // Pharmacy location markers
          route: '#2563eb',        // Route/direction lines
          user: '#059669',         // User location marker
          cluster: '#7c3aed',      // Marker clusters
        },

        // Prescription & ML Colors
        prescription: {
          scan: '#8b5cf6',         // Prescription scanning
          detected: '#10b981',     // Successfully detected medicine
          error: '#ef4444',        // Scanning error
          processing: '#f59e0b',    // Processing prescription
        },

        // Interactive Elements
        interactive: {
          hover: '#3b82f6',        // Hover states
          active: '#1d4ed8',       // Active states
          focus: '#2563eb',        // Focus states
          disabled: '#9ca3af',     // Disabled states
        },
      },

      // Custom CSS Variables for Dynamic Theming
      backgroundColor: {
        'primary-gradient': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      },

      // Custom Gradients
      backgroundImage: {
        'medical-gradient': 'linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)',
        'pharmacy-gradient': 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        'prescription-gradient': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        'status-gradient': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      },

      // Custom Box Shadows
      boxShadow: {
        'medical': '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -1px rgba(37, 99, 235, 0.06)',
        'pharmacy': '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -1px rgba(5, 150, 105, 0.06)',
        'prescription': '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },

      // Custom Animations
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'scan': 'scan 2s ease-in-out infinite',
        'locate': 'locate 1.5s ease-in-out infinite',
      },

      // Custom Keyframes
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        locate: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },

      // Custom Spacing
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '96': '24rem',
      },

      // Custom Border Radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },

      // Custom Font Sizes
      fontSize: {
        'xxs': ['0.625rem', { lineHeight: '0.75rem' }],
        '2.5xl': ['1.75rem', { lineHeight: '2rem' }],
        '3.5xl': ['2rem', { lineHeight: '2.25rem' }],
        '4.5xl': ['2.5rem', { lineHeight: '2.75rem' }],
      },

      // Custom Z-Index
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // Add custom CSS utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #2563eb, #059669)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-glass': {
          'background': 'rgba(255, 255, 255, 0.8)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
        '.border-glass': {
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
  // Dark mode configuration
  darkMode: 'class',

  // Safelist important classes to prevent purging
  safelist: [
    'bg-medical-primary',
    'bg-pharmacy-green',
    'bg-status-available',
    'text-medical-primary',
    'border-pharmacy-blue',
    'shadow-medical',
    'animate-scan',
    'animate-locate',
  ],
}

