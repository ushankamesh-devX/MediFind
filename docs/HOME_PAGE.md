# Home Page Documentation

## Overview
The Home page is the main dashboard of MediFind where users can search for medicines, view nearby pharmacies on a map, and access key features of the application.

---

## Page Information

- **Route:** `/` or `/home`
- **Component File:** `src/pages/Home.js` (to be created)
- **Style File:** `src/styles/Home.css` (to be created)
- **Authentication:** Protected (requires login)

---

## Page Layout

```
+------------------------------------------+
|  [☰]  MediFind    [🔔] [👤]            |
+------------------------------------------+
|                                          |
|  Hello, John! 👋                         |
|  Find medicines near you                 |
|                                          |
|  +------------------------------------+  |
|  | 🔍 Search for medicines...    [→] |  |
|  +------------------------------------+  |
|                                          |
|  [📍 Use Current Location]               |
|                                          |
+------------------------------------------+
|                                          |
|           🗺️ MAP VIEW                   |
|                                          |
|     +---------------------------+        |
|     |                           |        |
|     |    📍  📍  📍  📍        |        |
|     |  📍  🔵  📍  📍  📍    |        |
|     |    📍  📍  📍  📍        |        |
|     |                           |        |
|     +---------------------------+        |
|                                          |
|  [🗺️ Map] [📋 List]                    |
|                                          |
+------------------------------------------+
|                                          |
|  Nearby Pharmacies (12)                  |
|                                          |
|  +------------------------------------+  |
|  | 💊 HealthCare Pharmacy       2.3km|  |
|  | ⭐ 4.5 • Open Now                 |  |
|  | 📞 +1-555-0123  [→]              |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  | 💊 MediPlus Store            3.1km|  |
|  | ⭐ 4.8 • Closes at 9 PM          |  |
|  | 📞 +1-555-0456  [→]              |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  | 💊 City Pharmacy             4.2km|  |
|  | ⭐ 4.2 • Open 24/7               |  |
|  | 📞 +1-555-0789  [→]              |  |
|  +------------------------------------+  |
|                                          |
|  [Show More]                             |
|                                          |
+------------------------------------------+
|  [🏠] [🔍] [❤️] [👤]                   |
+------------------------------------------+
```

---

## Content Structure

### 1. Navigation Header

#### Top Bar
- **Menu Icon (☰):** Opens side navigation drawer
- **Logo/Brand:** "MediFind" text/logo
- **Notification Icon (🔔):** Shows notification badge if unread
- **Profile Icon (👤):** Opens user profile menu

#### Side Navigation Drawer (on menu click)
- Home
- Search History
- Favorites
- Nearby Pharmacies
- Settings
- Help & Support
- Logout

### 2. Welcome Section

#### Greeting
- **Text:** "Hello, [User Name]! 👋"
- **Subtext:** "Find medicines near you"
- **Style:** Large, friendly font

### 3. Search Section

#### Medicine Search Bar
- **Placeholder:** "Search for medicines..."
- **Icon:** Search icon (🔍)
- **Features:**
  - Auto-complete suggestions
  - Recent searches dropdown
  - Voice search button (optional)
- **Action:** Navigate to search results on submit

#### Location Button
- **Text:** "Use Current Location"
- **Icon:** Location pin (📍)
- **Action:** Get user's current GPS location
- **Alternative:** "Change Location" to manually enter address

### 4. Map View Section

#### Interactive Map
- **Map Provider:** Google Maps / Mapbox / OpenStreetMap
- **Features:**
  - User's current location (blue dot 🔵)
  - Pharmacy markers (red pins 📍)
  - Zoom controls (+/-)
  - Current location button
  - Full-screen toggle
  - Cluster markers for nearby pharmacies

#### Map Markers
- **User Location:** Blue pulsing dot
- **Pharmacy Markers:** Red pins with pharmacy icon
- **Selected Pharmacy:** Highlighted/different color marker
- **Info Window:** Shows pharmacy name and distance on marker click

#### View Toggle
- **Map View Button:** Active when map displayed
- **List View Button:** Switch to list-only view
- **Style:** Toggle buttons or tabs

### 5. Pharmacy List Section

#### Section Header
- **Title:** "Nearby Pharmacies"
- **Count:** Number of pharmacies found (e.g., "(12)")
- **Filter Icon:** Optional filter button for sorting/filtering

#### Pharmacy Cards

Each pharmacy card contains:

**Card Header:**
- Pharmacy icon (💊)
- Pharmacy name (bold)
- Distance from user (right-aligned)

**Card Body:**
- Star rating (⭐ 4.5)
- Status: "Open Now" / "Closes at 9 PM" / "Closed"
- Phone number with call icon
- Arrow button for more details

**Card Footer (optional):**
- Available medicine indicator
- "View Details" button

#### Card States
- **Default:** White background
- **Hover:** Light gray background
- **Selected:** Blue border/background
- **Closed:** Grayed out with status

#### Load More
- **Button:** "Show More" or "Load More"
- **Action:** Load next batch of pharmacies
- **Alternative:** Infinite scroll

### 6. Bottom Navigation (Mobile)

#### Navigation Items
- **Home (🏠):** Current page - highlighted
- **Search (🔍):** Quick search
- **Favorites (❤️):** Saved pharmacies
- **Profile (👤):** User profile

---

## Functionality

### Search Features

#### Medicine Search
1. User types in search bar
2. Auto-complete shows suggestions
3. Display recent searches
4. Show popular medicines
5. Submit search → Navigate to results page

#### Auto-complete
- Fetch suggestions from API as user types
- Show medicine names, brands, and generic names
- Highlight matching text
- Keyboard navigation (arrow keys)
- Select with Enter or click

#### Voice Search (Optional)
- Microphone icon in search bar
- Click to activate voice input
- Convert speech to text
- Auto-submit or show in search bar

### Location Services

#### Get Current Location
1. Request location permission
2. Show loading indicator
3. Fetch GPS coordinates
4. Update map center
5. Load nearby pharmacies
6. Show accuracy indicator

#### Manual Location Entry
- Open location picker modal
- Enter address or city
- Autocomplete suggestions
- Confirm location
- Update map and results

### Map Interactions

#### Map Controls
- **Zoom In/Out:** +/- buttons or pinch gesture
- **Pan:** Click and drag or swipe
- **Recenter:** Button to recenter on user location
- **Full-screen:** Expand map to full screen
- **Map Type:** Switch between standard, satellite, terrain

#### Marker Interactions
- **Click Marker:** Show info window with pharmacy details
- **Hover Marker:** Highlight corresponding pharmacy card
- **Select Marker:** Navigate to pharmacy details page

#### Info Window Content
```
+---------------------------+
| HealthCare Pharmacy       |
| ⭐ 4.5 • 2.3 km away     |
| Open until 9 PM           |
| [View Details] [Directions]|
+---------------------------+
```

### Pharmacy List Interactions

#### Card Actions
- **Click Card:** Navigate to pharmacy details page
- **Phone Icon:** Initiate phone call
- **Arrow Button:** Open pharmacy details
- **Favorite Icon:** Add/remove from favorites

#### Sorting & Filtering
- Sort by: Distance, Rating, Open Now
- Filter by: Open status, 24/7, Rating (>4 stars)
- Apply filters without page reload

#### Load More
- Click button to load next 10 pharmacies
- Show loading spinner
- Append to existing list
- Disable when no more results

### Real-time Updates

#### Live Status
- Update pharmacy open/close status
- Refresh every minute or on focus
- Show status changes (e.g., "Closing soon")

#### Location Changes
- Watch for location changes
- Update map and results automatically
- Show notification of location change

---

## API Integration

### Get Nearby Pharmacies

#### Endpoint
```
GET /api/pharmacies/nearby
```

#### Query Parameters
```
?latitude=40.7128
&longitude=-74.0060
&radius=5000
&limit=20
```

#### Response
```json
{
  "success": true,
  "count": 12,
  "pharmacies": [
    {
      "id": "pharm_001",
      "name": "HealthCare Pharmacy",
      "location": {
        "latitude": 40.7158,
        "longitude": -74.0090,
        "address": "123 Main St, New York, NY"
      },
      "distance": 2.3,
      "rating": 4.5,
      "phone": "+1-555-0123",
      "isOpen": true,
      "hours": {
        "open": "08:00",
        "close": "21:00"
      }
    }
  ]
}
```

### Search Medicines

#### Endpoint
```
GET /api/medicines/search
```

#### Query Parameters
```
?q=aspirin
&limit=10
```

#### Response
```json
{
  "success": true,
  "suggestions": [
    {
      "id": "med_001",
      "name": "Aspirin 100mg",
      "genericName": "Acetylsalicylic Acid",
      "brand": "Bayer"
    }
  ]
}
```

### Get User Location

#### Browser Geolocation API
```javascript
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    // Update map and fetch pharmacies
  },
  (error) => {
    // Handle error
  }
);
```

---

## Styling Guidelines

### Color Scheme
- **Primary:** #2563eb (Blue)
- **Secondary:** #10b981 (Green)
- **Accent:** #8b5cf6 (Purple)
- **Background:** #ffffff (White)
- **Background Alt:** #f9fafb (Light Gray)
- **Text Primary:** #1f2937 (Dark Gray)
- **Text Secondary:** #6b7280 (Medium Gray)
- **Border:** #e5e7eb (Light Gray)
- **Success:** #10b981 (Green) - Open status
- **Warning:** #f59e0b (Orange) - Closing soon
- **Error:** #ef4444 (Red) - Closed

### Typography
- **Page Title:** 24px, Bold
- **Section Header:** 20px, Semi-bold
- **Pharmacy Name:** 18px, Semi-bold
- **Body Text:** 16px, Regular
- **Caption:** 14px, Regular
- **Distance:** 14px, Medium Gray

### Card Styling
- **Background:** White
- **Border:** 1px solid #e5e7eb
- **Border Radius:** 12px
- **Shadow:** 0 1px 3px rgba(0,0,0,0.1)
- **Hover Shadow:** 0 4px 6px rgba(0,0,0,0.1)
- **Padding:** 16px
- **Margin:** 12px between cards

### Map Styling
- **Height:** 400px (desktop), 300px (mobile)
- **Border Radius:** 12px
- **Shadow:** 0 2px 4px rgba(0,0,0,0.1)

### Spacing
- **Container Padding:** 20px
- **Section Margin:** 24px
- **Element Spacing:** 12px

### Responsive Breakpoints
- **Mobile:** < 640px
  - Single column
  - Stacked map and list
  - Bottom navigation visible
  
- **Tablet:** 640px - 1024px
  - Two column option for list
  - Larger map
  - Side navigation drawer
  
- **Desktop:** > 1024px
  - Split view: Map (60%) + List (40%)
  - Fixed header
  - Side navigation permanent (optional)

---

## Loading States

### Initial Load
1. Show skeleton screens for pharmacy cards
2. Display loading spinner on map
3. Show "Finding nearby pharmacies..." message

### Search Loading
- Show spinner in search bar
- Display "Searching..." text
- Dim background slightly

### Location Loading
- Show pulse animation on location button
- Display "Getting your location..." message
- Show map loading overlay

---

## Empty States

### No Pharmacies Found
```
+---------------------------+
|     🏥                    |
|  No pharmacies found      |
|  nearby                   |
|                           |
|  Try expanding your       |
|  search radius            |
|                           |
|  [Expand Search]          |
+---------------------------+
```

### No Search Results
```
+---------------------------+
|     🔍                    |
|  No results found         |
|                           |
|  Try a different search   |
|  term                     |
+---------------------------+
```

### Location Permission Denied
```
+---------------------------+
|     📍                    |
|  Location access denied   |
|                           |
|  Please enable location   |
|  services to find nearby  |
|  pharmacies               |
|                           |
|  [Enable Location]        |
+---------------------------+
```

---

## Accessibility

### Keyboard Navigation
- Tab through all interactive elements
- Enter to activate buttons
- Arrow keys to navigate map
- Escape to close modals

### Screen Reader Support
- Descriptive labels for all elements
- ARIA landmarks for page sections
- Announce location updates
- Announce pharmacy count changes

### Visual Accessibility
- High contrast mode support
- Scalable text (respects user settings)
- Focus indicators on all interactive elements
- Color not sole indicator of status

---

## Performance Optimization

### Map Performance
- Lazy load map component
- Cluster markers when zoomed out
- Debounce map move events
- Cache map tiles

### List Performance
- Virtual scrolling for long lists
- Lazy load pharmacy images
- Pagination or infinite scroll
- Debounce search input

### Data Caching
- Cache nearby pharmacies for 5 minutes
- Cache user location for 10 minutes
- Cache search suggestions
- Use service worker for offline support

---

## User Experience Enhancements

### Animations
- Smooth page transitions
- Card hover animations
- Map marker bounce on select
- Loading skeleton screens

### Notifications
- Toast for location updates
- Toast for search completion
- Badge on notification icon
- In-app messaging

### Personalization
- Remember last search location
- Show recent searches
- Suggest based on history
- Favorite pharmacies quick access

---

## Error Handling

### Common Errors
1. **Location Error:** "Unable to get your location"
2. **Network Error:** "Connection lost. Please check your internet"
3. **API Error:** "Something went wrong. Please try again"
4. **No Results:** "No pharmacies found nearby"

### Error Display
- Show error message at top of page
- Provide actionable solutions
- Option to retry
- Fallback UI for critical errors

---

## Testing Checklist

- [ ] Search functionality works correctly
- [ ] Map displays and loads markers
- [ ] Location services work
- [ ] Pharmacy cards display correctly
- [ ] Navigation links work
- [ ] Responsive on all devices
- [ ] Loading states display properly
- [ ] Error handling works
- [ ] Accessibility features functional
- [ ] Performance acceptable (< 3s load)
