# Tailwind CSS - Quick Reference for MediFind

## ✅ Installation Complete!

Tailwind CSS v4 has been successfully installed and configured in your React project.

## 📁 Files Created/Modified:

1. **tailwind.config.js** - Tailwind configuration with custom colors
2. **postcss.config.js** - PostCSS configuration
3. **src/index.css** - Updated with Tailwind directives
4. **package.json** - Added Tailwind dependencies

## 🎨 Custom Colors Available:

Based on your design docs, these custom colors are pre-configured:

```jsx
// Primary Colors (Blue)
className="bg-primary-600"  // #2563eb
className="text-primary-600"

// Secondary Colors (Green)
className="bg-secondary-600"  // #16a34a
className="text-secondary-600"
```

## 🚀 Usage Examples:

### Basic Styling
```jsx
<div className="bg-white p-4 rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-800">Hello</h1>
  <p className="text-gray-600">This is a card</p>
</div>
```

### Buttons
```jsx
// Primary Button
<button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
  Login
</button>

// Secondary Button
<button className="bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-6 rounded-lg transition duration-200">
  Register
</button>
```

### Input Fields
```jsx
<input 
  type="email"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  placeholder="Enter email"
/>
```

### Cards
```jsx
<div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition duration-200">
  <h3 className="text-lg font-semibold mb-2">Pharmacy Name</h3>
  <p className="text-gray-600 text-sm">2.3 km away</p>
</div>
```

### Responsive Design
```jsx
// Mobile first approach
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* Full width on mobile, half on tablet, third on desktop */}
</div>

// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile only</div>
```

### Flexbox Layout
```jsx
<div className="flex items-center justify-between">
  <span>Left</span>
  <span>Right</span>
</div>

<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>
```

## 🧪 Testing Tailwind

To verify Tailwind is working:

1. **Option 1: Use the test component**
   ```jsx
   // In App.js, temporarily replace content with:
   import TailwindTest from './TailwindTest';
   
   function App() {
     return <TailwindTest />;
   }
   ```

2. **Option 2: Add Tailwind classes to existing elements**
   ```jsx
   <h1 className="text-4xl font-bold text-blue-600">Test</h1>
   ```

3. **Start the dev server**
   ```bash
   npm start
   ```

## 📚 Common Utilities:

### Spacing
- **Padding:** `p-4`, `px-4`, `py-4`, `pt-4`, `pr-4`, `pb-4`, `pl-4`
- **Margin:** `m-4`, `mx-4`, `my-4`, `mt-4`, `mr-4`, `mb-4`, `ml-4`

### Colors
- **Background:** `bg-blue-500`, `bg-gray-100`
- **Text:** `text-blue-500`, `text-gray-800`
- **Border:** `border-blue-500`

### Typography
- **Size:** `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`
- **Weight:** `font-light`, `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Align:** `text-left`, `text-center`, `text-right`

### Display
- **Flex:** `flex`, `inline-flex`
- **Grid:** `grid`, `inline-grid`
- **Block:** `block`, `inline-block`, `inline`
- **Hidden:** `hidden`

### Effects
- **Shadow:** `shadow`, `shadow-md`, `shadow-lg`, `shadow-xl`
- **Opacity:** `opacity-0` to `opacity-100`
- **Hover:** `hover:bg-blue-700`, `hover:scale-105`
- **Transition:** `transition`, `duration-200`, `ease-in-out`

## 🎯 Design System Match:

Your design docs specify these values, which translate to:

- **Primary Color (#2563eb):** `bg-primary-600` or `bg-blue-600`
- **Secondary Color (#10b981):** `bg-green-500`
- **Border Radius (8px):** `rounded-lg`
- **Border Radius (12px):** `rounded-xl`
- **Padding (16px):** `p-4`
- **Padding (20px):** `p-5`
- **Padding (24px):** `p-6`

## 📖 Resources:

- **Official Docs:** https://tailwindcss.com/docs
- **Cheat Sheet:** https://nerdcave.com/tailwind-cheat-sheet
- **Component Examples:** https://tailwindui.com/components
- **Play CDN (for testing):** https://play.tailwindcss.com/

## ⚠️ Important Notes:

1. **Restart dev server** after configuration changes
2. **Purge unused styles** in production (configured automatically)
3. **Use arbitrary values** when needed: `w-[137px]`, `text-[#1da1f2]`
4. **IntelliSense:** Install "Tailwind CSS IntelliSense" VS Code extension

## 🔧 Next Steps:

1. Start your dev server: `npm start`
2. Test with TailwindTest component
3. Start styling your pages according to the docs
4. Reference this guide while building components

Happy styling! 🎨
