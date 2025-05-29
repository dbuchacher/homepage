# 🏠 Modern Homepage 2025

A beautiful, customizable browser homepage with drag-and-drop functionality, real-time Bitcoin tracking, and a sleek glassmorphism design.

![Modern Homepage](https://img.shields.io/badge/Version-2.0-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 **Modern Design**
- **Glassmorphism UI** with backdrop blur effects
- **Dark theme** optimized for browser integration
- **Responsive layout** that works on all screen sizes
- **Smooth animations** and hover effects

### 📋 **Bookmark Management**
- **Drag & Drop** bookmarks between groups
- **Custom groups** with editable titles
- **Auto-favicon** generation from URLs
- **Clipboard integration** for quick bookmark creation
- **Right-click context menus** for easy management

### 🔍 **Multi-Search Integration**
- **Google Search** with instant results
- **Pirate Bay Search** for torrents
- **Enter key support** for quick searching

### 📊 **Real-Time Crypto Tracking**
- **Bitcoin price widget** in CAD currency
- **15-day price chart** with interactive data
- **5-minute auto-updates** with smart caching
- **Clickable widget** opens CoinGecko page

### 🎯 **Advanced Layout System**
- **Drag & resize** all elements freely
- **20px grid snapping** for perfect alignment
- **Global lock/unlock** system
- **Layout persistence** across browser sessions
- **1200×1200px workspace** with infinite scroll

### 💾 **Data Management**
- **Auto-save** to localStorage
- **Export/Import** functionality with layout preservation
- **Version 2.0 format** with backward compatibility
- **Backup system** with timestamps

## 🚀 Quick Start

### 1. **Download & Setup**
```bash
# Clone or download the repository
git clone https://github.com/yourusername/modern-homepage.git
cd modern-homepage

# Or simply download and extract the ZIP file
```

### 2. **Open in Browser**
```bash
# Option 1: Direct file opening
open index.html

# Option 2: Local server (recommended)
python -m http.server 8000
# Then visit: http://localhost:8000
```

### 3. **Set as Homepage**
- **Firefox**: Settings → Home → Homepage → Custom URLs → `file:///path/to/index.html`
- **Chrome**: Settings → On startup → Open specific pages → Add `file:///path/to/index.html`
- **Safari**: Preferences → General → Homepage → Set to file path

## 🎮 Usage Guide

### **Basic Navigation**
- **Right-click** anywhere for context menu
- **Left-click** on bookmarks to open links
- **Drag** elements to reposition them
- **Resize** using handles in bottom-right corners

### **Managing Bookmarks**
1. **Add Bookmark**: Right-click → "Add Bookmark"
2. **Auto-fill**: Copy URL to clipboard before adding
3. **Edit**: Right-click bookmark → "Edit Bookmark"
4. **Move**: Drag bookmarks between groups
5. **Delete**: Right-click bookmark → "Delete Bookmark"

### **Group Management**
1. **Add Group**: Right-click → "Add Group"
2. **Rename**: Click group title to edit
3. **Delete**: Right-click group → "Delete Group"
4. **Resize**: Drag resize handle to adjust size

### **Layout Controls**
- **Lock All**: Right-click → "Lock All Elements" (prevents dragging)
- **Unlock All**: Right-click → "Unlock All Elements"
- **Reset Layout**: Right-click → "Reset Layout"
- **Grid Snapping**: Automatic 20px alignment while dragging

### **Data Backup**
- **Export**: Right-click → "Export Bookmarks" (saves .json file)
- **Import**: Right-click → "Import Bookmarks" (restores from .json)

## 🗂️ File Structure

```
modern-homepage/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styling and animations
├── js/
│   └── app.js              # Core functionality and logic
└── README.md               # This file
```

## ⚙️ Configuration

### **Customizing Default Data**
Edit the `homeData` object in `js/app.js`:

```javascript
let homeData = {
    groups: [
        {
            id: 'your-group',
            title: 'Your Group',
            bookmarks: [
                { 
                    name: 'Your Site', 
                    url: 'https://yoursite.com', 
                    icon: 'https://yoursite.com/favicon.ico' 
                }
            ]
        }
    ]
};
```

### **Adjusting Configuration**
Modify the `CONFIG` object in `js/app.js`:

```javascript
const CONFIG = {
    GRID_SIZE: 20,                    // Grid snap size in pixels
    CRYPTO_UPDATE_INTERVAL: 300000,   // Bitcoin update frequency (ms)
    LAYOUT_LOAD_DELAY: 200,           // Layout loading delay (ms)
    
    GROUP_DEFAULT: {
        LEFT_OFFSET: 150,             // Default group X position
        TOP_OFFSET: 200,              // Default group Y position
        WIDTH_SPACING: 320,           // Horizontal spacing between groups
        HEIGHT_SPACING: 280,          // Vertical spacing between groups
        GRID_COLUMNS: 3               // Groups per row
    }
};
```

### **Styling Customization**
Key CSS variables to modify in `css/styles.css`:

```css
/* Main colors */
background: #1d1d1d;                    /* Page background */
background: rgb(32, 32, 32);            /* Element backgrounds */
border: rgba(92, 92, 92, 0.3);          /* Border colors */

/* Lock state colors */
border: rgba(255, 165, 0, 0.4);         /* Unlocked (orange) */
border: rgba(92, 92, 92, 0.3);          /* Locked (gray) */

/* Grid settings */
background-size: 20px 20px;             /* Grid size */
```

## 🔧 Technical Details

### **Core Technologies**
- **HTML5** with semantic structure
- **CSS3** with modern features (backdrop-filter, CSS Grid, Flexbox)
- **Vanilla JavaScript** (ES6+) with async/await
- **Chart.js** for Bitcoin price visualization
- **Font Awesome** for icons
- **Google Fonts** (Inter, Poppins)

### **APIs Used**
- **CoinGecko API**: Bitcoin price and historical data
- **Google Favicon API**: Automatic bookmark icons
- **Clipboard API**: Auto-fill functionality

### **Browser Support**
- **Chrome 88+** ✅
- **Firefox 87+** ✅
- **Safari 14+** ✅
- **Edge 88+** ✅

### **Performance Features**
- **DOM element caching** for reduced queries
- **Debounced layout saving** to prevent excessive writes
- **Efficient event delegation** for dynamic content
- **Smart API caching** with keepalive connections

## 🎨 Customization Ideas

### **Visual Themes**
- Change color scheme in CSS variables
- Adjust glassmorphism blur values
- Modify border radius for different aesthetics
- Create seasonal themes

### **Functionality Extensions**
- Add weather widget
- Integrate calendar/todo functionality
- Create custom search providers
- Add news feed integration

### **Layout Modifications**
- Adjust grid size for different snapping
- Change default element positions
- Modify container dimensions
- Add new draggable elements

## 🐛 Troubleshooting

### **Common Issues**

**Bookmarks not saving:**
- Check browser localStorage permissions
- Ensure you're not in incognito mode

**Layout not loading:**
- Clear browser cache and localStorage
- Check for JavaScript errors in console

**Bitcoin widget not updating:**
- Check internet connection
- Verify API access (no CORS issues)

**Drag/drop not working:**
- Ensure elements are unlocked (right-click → Unlock)
- Check for JavaScript errors

### **Reset Everything**
```javascript
// Run in browser console to reset all data
localStorage.clear();
location.reload();
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Font Awesome** for beautiful icons
- **CoinGecko** for reliable crypto API
- **Chart.js** for smooth data visualization
- **Google Fonts** for typography
- Modern web standards that make this possible

---

**Made with ❤️ for a better browsing experience** 