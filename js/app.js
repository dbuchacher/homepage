// Configuration and Constants
const CONFIG = {
    GRID_SIZE: 20,
    CRYPTO_UPDATE_INTERVAL: 300000, // 5 minutes
    LAYOUT_LOAD_DELAY: 200,
    GROUP_INIT_DELAY: 100,
    
    // Default positioning
    GROUP_DEFAULT: {
        LEFT_OFFSET: 150,
        TOP_OFFSET: 200,
        WIDTH_SPACING: 320,
        HEIGHT_SPACING: 280,
        GRID_COLUMNS: 3
    },
    
    // Layout boundaries
    LAYOUT: {
        MIN_ELEMENT_MARGIN: 200,
        MIN_HEIGHT_MARGIN: 100
    },
    
    // API URLs
    API: {
        COINGECKO_PRICE: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=cad',
        COINGECKO_CHART: 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=cad&days=15&interval=daily',
        PIRATE_SEARCH: 'https://thepiratebay.org/search.php?q=',
        GOOGLE_FAVICON: 'https://www.google.com/s2/favicons?domain='
    }
};

// DOM Element Cache
const DOM = {
    layoutContainer: null,
    contextMenu: null,
    bookmarkModal: null,
    pirateInput: null,
    
    init() {
        this.layoutContainer = document.getElementById('layoutContainer');
        this.contextMenu = document.getElementById('contextMenu');
        this.bookmarkModal = document.getElementById('bookmarkModal');
        this.pirateInput = document.getElementById('pirateInput');
    },
    
    get(id) {
        return document.getElementById(id);
    }
};

// Selectors for commonly used element groups
const SELECTORS = {
    DRAGGABLE_ELEMENTS: '#searchBar, #pirateBar, #cryptoWidget1',
    GROUP_CARDS: '.group-card',
    BOOKMARK_ITEMS: '.bookmark-item',
    ALL_DRAGGABLES: '.draggable-element'
};

// Default data structure with your bookmarks
let homeData = {
    groups: [
        {
            id: 'media',
            title: 'Media',
            bookmarks: [
                { name: 'X', url: 'https://x.com/', icon: 'https://abs.twimg.com/favicons/twitter.3.ico' },
                { name: 'YouTube', url: 'https://www.youtube.com/', icon: 'https://www.youtube.com/s/desktop/7197d3dc/img/favicon_96x96.png' },
                { name: 'Reddit', url: 'https://www.reddit.com', icon: 'https://www.reddit.com/favicon.ico' },
                { name: 'Twitch', url: 'https://www.twitch.tv/', icon: 'https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png' }
            ]
        },
        {
            id: 'personal',
            title: 'Personal',
            bookmarks: [
                { name: 'Bank', url: 'https://www.atb.com/sign-in/', icon: 'https://www.atb.com/static/img/favicon.ico' },
                { name: 'PayPal', url: 'https://www.paypal.com/ca/home', icon: 'data:image/png;base64,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' }
            ]
        },
        {
            id: 'email',
            title: 'Email',
            bookmarks: [
                { name: 'Proton', url: 'https://mail.proton.me/u/30/inbox', icon: 'https://mail.proton.me/assets/favicon.ico' },
                { name: 'Gmail', url: 'https://mail.google.com/mail/u/0/#inbox', icon: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico' }
            ]
        },
        {
            id: 'tech',
            title: 'Tech',
            bookmarks: [
                { name: 'GitHub', url: 'https://github.com/', icon: 'https://github.com/fluidicon.png' },
                { name: 'ChatGPT', url: 'https://chat.openai.com/', icon: 'https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png' }
            ]
        }
    ]
};

let currentGroupId = null;
let draggedItem = null;

// Grid settings for snap-to-grid functionality
const GRID_SIZE = 20; // 20px grid

// Snap value to grid
function snapToGrid(value) {
    return Math.round(value / CONFIG.GRID_SIZE) * CONFIG.GRID_SIZE;
}

// Global lock state - simple boolean
let isGloballyLocked = false;

// Load global lock state from localStorage
function loadLockState() {
    const saved = localStorage.getItem('globalLockState');
    if (saved) {
        isGloballyLocked = JSON.parse(saved);
        updateGlobalLockVisuals();
    }
}

// Save global lock state to localStorage
function saveLockState() {
    localStorage.setItem('globalLockState', JSON.stringify(isGloballyLocked));
}

// Toggle global lock state
function toggleGlobalLock() {
    isGloballyLocked = !isGloballyLocked;
    saveLockState();
    updateGlobalLockVisuals();
    
    // Hide context menu
    document.getElementById('contextMenu').style.display = 'none';
}

// Update visual indicators for global lock state
function updateGlobalLockVisuals() {
    const allDraggableElements = document.querySelectorAll('.draggable-element');
    allDraggableElements.forEach(element => {
        if (isGloballyLocked) {
            element.classList.add('locked');
        } else {
            element.classList.remove('locked');
        }
    });
}

// Load data from localStorage or use defaults
function loadData() {
    const saved = localStorage.getItem('modernHomepage');
    if (saved) {
        homeData = JSON.parse(saved);
    }
    renderGroups();
}

// Save data to localStorage  
function saveData() {
    localStorage.setItem('modernHomepage', JSON.stringify(homeData));
}

// Render all groups
function renderGroups() {
    // Clear existing groups from DOM
    document.querySelectorAll(SELECTORS.GROUP_CARDS).forEach(group => group.remove());

    homeData.groups.forEach((group, index) => {
        const groupEl = createGroupElement(group, index);
        DOM.layoutContainer.appendChild(groupEl);
    });
    
    // Re-initialize drag and resize for new groups
    setTimeout(() => {
        document.querySelectorAll(SELECTORS.GROUP_CARDS).forEach(element => {
            makeDraggable(element);
            makeResizable(element);
        });
        loadLayout();
        updateGlobalLockVisuals();
    }, CONFIG.GROUP_INIT_DELAY);
}

// Create group element
function createGroupElement(group, index) {
    const groupEl = document.createElement('div');
    groupEl.className = 'group-card draggable-element';
    groupEl.dataset.groupId = group.id;
    groupEl.id = `group-${group.id}`;

    // Set default position based on index using CONFIG
    const defaultLeft = CONFIG.GROUP_DEFAULT.LEFT_OFFSET + 
                       (index % CONFIG.GROUP_DEFAULT.GRID_COLUMNS) * CONFIG.GROUP_DEFAULT.WIDTH_SPACING;
    const defaultTop = CONFIG.GROUP_DEFAULT.TOP_OFFSET + 
                      Math.floor(index / CONFIG.GROUP_DEFAULT.GRID_COLUMNS) * CONFIG.GROUP_DEFAULT.HEIGHT_SPACING;
    
    groupEl.style.left = defaultLeft + 'px';
    groupEl.style.top = defaultTop + 'px';

    const bookmarksHtml = group.bookmarks.map(bookmark => `
        <a href="${bookmark.url}" class="bookmark-item" draggable="true" 
           data-bookmark='${JSON.stringify(bookmark)}'>
            <img src="${bookmark.icon || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzU5NTk1OSIvPgo8cGF0aCBkPSJNOCAxNkMxMC4yMDkxIDE2IDEyIDE0LjIwOTEgMTIgMTJDMTIgOS43OTA4NiAxMC4yMDkxIDggOCA4QzUuNzkwODYgOCA0IDkuNzkwODYgNCAxMkM0IDE0LjIwOTEgNS43OTA4NiAxNiA4IDE2WiIgZmlsbD0iIzc3Nzc3NyIvPgo8cGF0aCBkPSJNMjQgMjBDMjMuNDQ3NyAyMCAyMyAyMC40NDc3IDIzIDIxVjIzQzIzIDIzLjU1MjMgMjMuNDQ3NyAyNCAyNCAyNEgyNkMyNi41NTIzIDI0IDI3IDIzLjU1MjMgMjcgMjNWMjFDMjcgMjAuNDQ3NyAyNi41NTIzIDIwIDI2IDIwSDI0WiIgZmlsbD0iIzc3Nzc3NyIvPgo8L3N2Zz4K'}" 
                 class="bookmark-icon" 
                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iOCIgZmlsbD0iIzU5NTk1OSIvPgo8cGF0aCBkPSJNOCAxNkMxMC4yMDkxIDE2IDEyIDE0LjIwOTEgMTIgMTJDMTIgOS43OTA4NiAxMC4yMDkxIDggOCA4QzUuNzkwODYgOCA0IDkuNzkwODYgNCAxMkM0IDE0LjIwOTEgNS43OTA4NiAxNiA4IDE2WiIgZmlsbD0iIzc3Nzc3NyIvPgo8cGF0aCBkPSJNMjQgMjBDMjMuNDQ3NyAyMCAyMyAyMC40NDc3IDIzIDIxVjIzQzIzIDIzLjU1MjMgMjMuNDQ3NyAyNCAyNCAyNEgyNkMyNi41NTIzIDI0IDI3IDIzLjU1MjMgMjcgMjNWMjFDMjcgMjAuNDQ3NyAyNi41NTIzIDIwIDI2IDIwSDI0WiIgZmlsbD0iIzc3Nzc3NyIvPgo8L3N2Zz4K'">
            <span class="bookmark-name">${bookmark.name}</span>
        </a>
    `).join('');

    groupEl.innerHTML = `
        <div class="group-header">
            <input type="text" class="group-title" value="${group.title}" 
                   onblur="updateGroupTitle('${group.id}', this.value)"
                   onkeypress="if(event.key==='Enter') this.blur()">
        </div>
        <div class="bookmark-grid" 
             ondrop="drop(event, '${group.id}')" 
             ondragover="allowDrop(event)"
             ondragenter="dragEnter(event)"
             ondragleave="dragLeave(event)">
            ${bookmarksHtml || '<div class="drop-zone">Drop bookmarks here or right-click to add</div>'}
        </div>
        <div class="resize-handle"></div>
    `;

    // Add event listeners for drag and drop
    const bookmarkItems = groupEl.querySelectorAll('.bookmark-item');
    bookmarkItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
        item.addEventListener('contextmenu', showBookmarkContextMenu);
    });

    // Add right-click context menu for group
    groupEl.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        currentGroupId = group.id;
        showGroupContextMenu(e, group.id);
    });

    return groupEl;
}

// Drag and drop functions
function dragStart(e) {
    draggedItem = JSON.parse(e.target.dataset.bookmark);
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
}

function allowDrop(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function dragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function drop(e, groupId) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (draggedItem) {
        // Remove from source group
        homeData.groups.forEach(group => {
            group.bookmarks = group.bookmarks.filter(b => 
                !(b.name === draggedItem.name && b.url === draggedItem.url)
            );
        });

        // Add to target group
        const targetGroup = homeData.groups.find(g => g.id === groupId);
        if (targetGroup) {
            targetGroup.bookmarks.push(draggedItem);
        }

        saveData();
        renderGroups();
    }
}

// Context menu functions
function showGroupContextMenu(e, groupId) {
    const deleteItem = ContextMenuUtils.createMenuItem('trash', 'Delete Group', `deleteGroup('${groupId}')`);
    const addToGroupItem = ContextMenuUtils.createMenuItem('plus', 'Add Bookmark', `addBookmarkToGroup('${groupId}')`);
    
    const menuHtml = [
        addToGroupItem,
        ContextMenuUtils.getLockMenuItem(),
        deleteItem,
        ContextMenuUtils.getStandardMenuItems()
    ].join('');
    
    ContextMenuUtils.showMenu(e, menuHtml);
}

function showContextMenu(e) {
    const menu = document.getElementById('contextMenu');
    menu.style.display = 'block';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
}

function showBookmarkContextMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const bookmark = JSON.parse(e.currentTarget.dataset.bookmark);
    const menuHtml = [
        ContextMenuUtils.createMenuItem('edit', 'Edit Bookmark', `editBookmark('${bookmark.name}', '${bookmark.url}')`),
        ContextMenuUtils.createMenuItem('trash', 'Delete Bookmark', `deleteBookmark('${bookmark.name}', '${bookmark.url}')`)
    ].join('');
    
    ContextMenuUtils.showMenu(e, menuHtml);
}

// Update the general right-click handler (for all elements)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    
    // Check if clicking on a draggable element (search bar, crypto widget, etc.)
    const draggableElement = e.target.closest('.draggable-element');
    if (draggableElement) {
        showDraggableElementContextMenu(e, draggableElement);
        return;
    }
    
    // Check if clicking on a group card
    const groupCard = e.target.closest('.group-card');
    if (groupCard) {
        const groupId = groupCard.dataset.groupId;
        showGroupContextMenu(e, groupId);
        return;
    }
    
    // Check if clicking on a bookmark
    const bookmarkItem = e.target.closest('.bookmark-item');
    if (bookmarkItem) {
        showBookmarkContextMenu(e);
        return;
    }
    
    // Default context menu for empty space
    const menu = document.getElementById('contextMenu');
    menu.innerHTML = `
        <div class="context-menu-item" onclick="toggleGlobalLock()">
            <i class="fas fa-${isGloballyLocked ? 'unlock' : 'lock'}"></i>
            ${isGloballyLocked ? 'Unlock' : 'Lock'} All Elements
        </div>
        <div class="context-menu-item" onclick="addBookmark()">
            <i class="fas fa-plus"></i>
            Add Bookmark
        </div>
        <div class="context-menu-item" onclick="addGroup()">
            <i class="fas fa-folder-plus"></i>
            Add Group
        </div>
        <div class="context-menu-item" onclick="exportData()">
            <i class="fas fa-download"></i>
            Export Bookmarks
        </div>
        <div class="context-menu-item" onclick="importData()">
            <i class="fas fa-upload"></i>
            Import Bookmarks
        </div>
        <div class="context-menu-item" onclick="resetLayout()">
            <i class="fas fa-undo"></i>
            Reset Layout
        </div>
    `;
    
    showContextMenu(e);
});

// Context menu for draggable elements (search bar, crypto widget)
function showDraggableElementContextMenu(e, element) {
    const menu = document.getElementById('contextMenu');
    const isLocked = isGloballyLocked;
    const elementName = getElementDisplayName(element.id);
    
    menu.innerHTML = `
        <div class="context-menu-item" onclick="toggleGlobalLock()">
            <i class="fas fa-${isLocked ? 'unlock' : 'lock'}"></i>
            ${isLocked ? 'Unlock' : 'Lock'} All Elements
        </div>
        <div class="context-menu-item" onclick="addBookmark()">
            <i class="fas fa-plus"></i>
            Add Bookmark
        </div>
        <div class="context-menu-item" onclick="addGroup()">
            <i class="fas fa-folder-plus"></i>
            Add Group
        </div>
        <div class="context-menu-item" onclick="exportData()">
            <i class="fas fa-download"></i>
            Export Bookmarks
        </div>
        <div class="context-menu-item" onclick="resetLayout()">
            <i class="fas fa-undo"></i>
            Reset Layout
        </div>
    `;
    
    showContextMenu(e);
}

// Get display name for elements
function getElementDisplayName(elementId) {
    const names = {
        'searchBar': 'Search Bar',
        'pirateBar': 'Pirate Bay Bar',
        'cryptoWidget1': 'Bitcoin Widget'
    };
    
    // Handle group elements
    if (elementId.startsWith('group-')) {
        return 'Group';
    }
    
    return names[elementId] || 'Element';
}

// Hide context menu when clicking elsewhere
document.addEventListener('click', () => {
    document.getElementById('contextMenu').style.display = 'none';
});

// Group management functions
function updateGroupTitle(groupId, newTitle) {
    const group = homeData.groups.find(g => g.id === groupId);
    if (group) {
        group.title = newTitle;
        saveData();
    }
}

function addGroup() {
    const id = 'group_' + Date.now();
    homeData.groups.push({
        id: id,
        title: 'New Group',
        bookmarks: []
    });
    saveData();
    renderGroups();
    document.getElementById('contextMenu').style.display = 'none';
}

function deleteGroup(groupId) {
    if (confirm('Are you sure you want to delete this group?')) {
        homeData.groups = homeData.groups.filter(g => g.id !== groupId);
        saveData();
        renderGroups();
    }
}

// Bookmark management functions
async function addBookmark() {
    DOM.bookmarkModal.style.display = 'flex';
    DOM.get('bookmarkName').value = '';
    DOM.get('bookmarkUrl').value = '';
    DOM.get('bookmarkIcon').value = '';
    DOM.contextMenu.style.display = 'none';
    
    // Try to auto-fill from clipboard
    try {
        const clipboardText = await navigator.clipboard.readText();
        
        if (clipboardText && isValidURL(clipboardText.trim())) {
            const url = clipboardText.trim();
            DOM.get('bookmarkUrl').value = url;
            
            try {
                const urlObj = new URL(url);
                const siteName = urlObj.hostname.replace('www.', '').split('.')[0];
                const capitalizedName = siteName.charAt(0).toUpperCase() + siteName.slice(1);
                DOM.get('bookmarkName').value = capitalizedName;
                
                // Auto-generate favicon URL using CONFIG
                DOM.get('bookmarkIcon').value = CONFIG.API.GOOGLE_FAVICON + urlObj.hostname + '&sz=32';
            } catch (error) {
                // Could not parse URL for auto-naming
            }
        }
    } catch (error) {
        // Clipboard access not available
    }
}

// Helper function to validate URLs
function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        // Also check for URLs without protocol
        try {
            new URL('https://' + string);
            return string.includes('.') && !string.includes(' ');
        } catch (_) {
            return false;
        }
    }
}

function addBookmarkToGroup(groupId) {
    currentGroupId = groupId;
    addBookmark();
}

function saveBookmark() {
    const name = document.getElementById('bookmarkName').value;
    const url = document.getElementById('bookmarkUrl').value;
    const icon = document.getElementById('bookmarkIcon').value;

    if (!name || !url) {
        alert('Please fill in name and URL');
        return;
    }

    const bookmark = {
        name: name,
        url: url,
        icon: icon || `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32`
    };

    if (currentGroupId) {
        const group = homeData.groups.find(g => g.id === currentGroupId);
        if (group) {
            group.bookmarks.push(bookmark);
        }
    } else {
        // Add to first group if no specific group selected
        homeData.groups[0].bookmarks.push(bookmark);
    }

    saveData();
    renderGroups();
    closeModal();
}

function editBookmark(name, url) {
    // Find and populate modal with existing bookmark data
    let bookmark = null;
    homeData.groups.forEach(group => {
        const found = group.bookmarks.find(b => b.name === name && b.url === url);
        if (found) bookmark = found;
    });

    if (bookmark) {
        document.getElementById('bookmarkName').value = bookmark.name;
        document.getElementById('bookmarkUrl').value = bookmark.url;
        document.getElementById('bookmarkIcon').value = bookmark.icon || '';
        document.getElementById('bookmarkModal').style.display = 'flex';
        
        // Delete the old bookmark when saving
        deleteBookmark(name, url, false);
    }
    document.getElementById('contextMenu').style.display = 'none';
}

function deleteBookmark(name, url, confirm = true) {
    if (!confirm || window.confirm('Delete this bookmark?')) {
        homeData.groups.forEach(group => {
            group.bookmarks = group.bookmarks.filter(b => 
                !(b.name === name && b.url === url)
            );
        });
        saveData();
        renderGroups();
    }
    document.getElementById('contextMenu').style.display = 'none';
}

function closeModal() {
    document.getElementById('bookmarkModal').style.display = 'none';
    currentGroupId = null;
}

// Export/Import functions
function exportData() {
    // Get current layout positions
    const layout = {};
    
    // Save search bar, pirate bar, and crypto widget
    document.querySelectorAll('#searchBar, #pirateBar, #cryptoWidget1').forEach(element => {
        layout[element.id] = {
            left: element.style.left,
            top: element.style.top,
            width: element.style.width,
            height: element.style.height
        };
    });
    
    // Save all group positions and sizes
    document.querySelectorAll('.group-card').forEach(element => {
        layout[element.id] = {
            left: element.style.left,
            top: element.style.top,
            width: element.style.width,
            height: element.style.height
        };
    });
    
    // Combine bookmark data and layout
    const fullData = {
        bookmarks: homeData,
        layout: layout,
        exportDate: new Date().toISOString(),
        version: "2.0"
    };
    
    const dataStr = JSON.stringify(fullData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `homepage-full-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    document.getElementById('contextMenu').style.display = 'none';
}

function importData() {
    document.getElementById('importFile').click();
    document.getElementById('contextMenu').style.display = 'none';
}

function handleImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Check if it's the new format with layout data
            if (importedData.version === "2.0" && importedData.bookmarks && importedData.layout) {
                if (confirm('This will replace all your current bookmarks and layout. Are you sure?')) {
                    // Import bookmarks
                    homeData = importedData.bookmarks;
                    saveData();
                    
                    // Import layout
                    localStorage.setItem('dashboardLayout', JSON.stringify(importedData.layout));
                    
                    // Reload page to apply everything
                    location.reload();
                }
            }
            // Check if it's old format (just bookmarks)
            else if (importedData.groups && Array.isArray(importedData.groups)) {
                if (confirm('This will replace all your current bookmarks (layout positions will be reset). Are you sure?')) {
                    homeData = importedData;
                    saveData();
                    renderGroups();
                    alert('Bookmarks imported successfully! Note: Layout positions were reset.');
                }
            } else {
                alert('Invalid file format. Please select a valid bookmark export file.');
            }
        } catch (error) {
            alert('Error reading file. Please make sure it\'s a valid JSON file.');
        }
    };
    reader.readAsText(file);
    
    // Reset the file input
    event.target.value = '';
}

// Close modal when clicking outside
document.getElementById('bookmarkModal').addEventListener('click', (e) => {
    if (e.target.id === 'bookmarkModal') {
        closeModal();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    DOM.init(); // Initialize DOM element cache
    loadData();
    loadLockState();
    initializeDragAndResize();
    initializeCryptoWidgets();
    
    // Allow Enter key to submit Pirate Bay searches
    if (DOM.pirateInput) {
        DOM.pirateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchPirateBay();
            }
        });
    }
});

// Pirate Bay Search Functionality
function searchPirateBay() {
    const searchTerm = DOM.pirateInput.value.trim();
    
    if (!searchTerm) {
        alert('Please enter a search term!');
        return;
    }
    
    try {
        const searchUrl = CONFIG.API.PIRATE_SEARCH + encodeURIComponent(searchTerm);
        window.open(searchUrl, '_blank');
        showPirateMessage(`Searching for: "${searchTerm}"`);
    } catch (error) {
        alert('Error opening search. Please try again.');
    }
    
    DOM.pirateInput.value = '';
}

// Show a temporary message for Pirate Bay searches
function showPirateMessage(message) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(210, 105, 30, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(210, 105, 30, 0.3);
        z-index: 10000;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.4;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(210, 105, 30, 0.5);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Drag and Resize Functionality
function initializeDragAndResize() {
    // Initialize search bar, pirate bar, and crypto widget
    const fixedElements = document.querySelectorAll('#searchBar, #pirateBar, #cryptoWidget1');
    fixedElements.forEach(element => {
        makeDraggable(element);
        makeResizable(element);
    });
    
    // Groups are initialized in renderGroups()
    // Load saved positions and sizes
    setTimeout(() => loadLayout(), 200);
}

function makeDraggable(element) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;
    
    element.addEventListener('mousedown', (e) => {
        // Don't drag if element is locked
        if (isGloballyLocked) {
            return;
        }
        
        // Don't drag if clicking on resize handle
        if (e.target.classList.contains('resize-handle')) return;
        
        // Don't drag if clicking on form elements
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        
        isDragging = true;
        element.classList.add('dragging');
        document.body.classList.add('show-grid'); // Show grid during drag
        
        startX = e.clientX;
        startY = e.clientY;
        startLeft = parseInt(window.getComputedStyle(element).left, 10);
        startTop = parseInt(window.getComputedStyle(element).top, 10);
        
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        
        e.preventDefault();
    });
    
    function dragMove(e) {
        if (!isDragging || isGloballyLocked) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Get layout container boundaries
        const layoutContainer = document.getElementById('layoutContainer');
        const containerRect = layoutContainer.getBoundingClientRect();
        
        // Calculate new positions with grid snapping
        const rawLeft = startLeft + deltaX;
        const rawTop = startTop + deltaY;
        
        const newLeft = Math.max(0, Math.min(layoutContainer.offsetWidth - element.offsetWidth, snapToGrid(rawLeft)));
        const newTop = Math.max(0, Math.min(layoutContainer.offsetHeight - element.offsetHeight, snapToGrid(rawTop)));
        
        element.style.left = newLeft + 'px';
        element.style.top = newTop + 'px';
        
        // Remove default transforms for search bars that have translateX(-50%)
        if (element.id === 'searchBar' || element.id === 'pirateBar') {
            element.style.transform = 'none';
        }
    }
    
    function dragEnd() {
        if (isDragging && !isGloballyLocked) {
            isDragging = false;
            element.classList.remove('dragging');
            document.body.classList.remove('show-grid'); // Hide grid after drag
            saveLayout();
        }
        
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
    }
}

function makeResizable(element) {
    const resizeHandle = element.querySelector('.resize-handle');
    if (!resizeHandle) return;
    
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    
    resizeHandle.addEventListener('mousedown', (e) => {
        // Don't resize if element is locked
        if (isGloballyLocked) {
            return;
        }
        
        isResizing = true;
        document.body.classList.add('show-grid'); // Show grid during resize
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(window.getComputedStyle(element).width, 10);
        startHeight = parseInt(window.getComputedStyle(element).height, 10);
        
        document.addEventListener('mousemove', resizeMove);
        document.addEventListener('mouseup', resizeEnd);
        
        e.preventDefault();
        e.stopPropagation();
    });
    
    function resizeMove(e) {
        if (!isResizing || isGloballyLocked) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // Get layout container boundaries
        const layoutContainer = document.getElementById('layoutContainer');
        
        // Get computed style constraints
        const computedStyle = window.getComputedStyle(element);
        const minWidth = parseInt(computedStyle.minWidth) || 120;
        const maxWidth = parseInt(computedStyle.maxWidth) || layoutContainer.offsetWidth;
        const minHeight = parseInt(computedStyle.minHeight) || 100;
        const maxHeight = parseInt(computedStyle.maxHeight) || layoutContainer.offsetHeight;
        
        // Calculate new sizes with grid snapping
        const rawWidth = startWidth + deltaX;
        const rawHeight = startHeight + deltaY;
        
        const newWidth = Math.max(minWidth, Math.min(maxWidth, snapToGrid(rawWidth)));
        const newHeight = Math.max(minHeight, Math.min(maxHeight, snapToGrid(rawHeight)));
        
        element.style.width = newWidth + 'px';
        element.style.height = newHeight + 'px';
    }
    
    function resizeEnd() {
        if (isResizing && !isGloballyLocked) {
            isResizing = false;
            document.body.classList.remove('show-grid'); // Hide grid after resize
            saveLayout();
        }
        
        document.removeEventListener('mousemove', resizeMove);
        document.removeEventListener('mouseup', resizeEnd);
    }
}

function saveLayout() {
    const layout = {};
    
    // Save search bar, pirate bar, and crypto widget
    document.querySelectorAll('#searchBar, #pirateBar, #cryptoWidget1').forEach(element => {
        layout[element.id] = {
            left: element.style.left,
            top: element.style.top,
            width: element.style.width,
            height: element.style.height
        };
    });
    
    // Save all group positions and sizes
    document.querySelectorAll('.group-card').forEach(element => {
        layout[element.id] = {
            left: element.style.left,
            top: element.style.top,
            width: element.style.width,
            height: element.style.height
        };
    });
    
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
}

function loadLayout() {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (!savedLayout) return;
    
    try {
        const layout = JSON.parse(savedLayout);
        const layoutContainer = document.getElementById('layoutContainer');
        
        Object.keys(layout).forEach(elementId => {
            if (elementId === '_screenInfo') return;
            
            const element = document.getElementById(elementId);
            if (element && layout[elementId]) {
                const pos = layout[elementId];
                
                if (pos.left) {
                    const left = Math.max(0, Math.min(layoutContainer.offsetWidth - 200, parseInt(pos.left)));
                    element.style.left = left + 'px';
                }
                if (pos.top) {
                    const top = Math.max(0, Math.min(layoutContainer.offsetHeight - 100, parseInt(pos.top)));
                    element.style.top = top + 'px';
                }
                if (pos.width) element.style.width = pos.width;
                if (pos.height) element.style.height = pos.height;
                
                // Remove default transform for search bars if positioned
                if ((elementId === 'searchBar' || elementId === 'pirateBar') && pos.left) {
                    element.style.transform = 'none';
                }
            }
        });
    } catch (error) {
        // Could not load layout
    }
}

// Reset layout function (for right-click menu)
function resetLayout() {
    localStorage.removeItem('dashboardLayout');
    location.reload();
}

// Bitcoin Price Tracking
let chart = null;

function initializeCryptoWidgets() {
    // Initialize CoinGecko chart
    initializeCoinGeckoChart();
    
    // Start fetching prices immediately and then at configured interval
    fetchCoinGecko24h();
    setInterval(fetchCoinGecko24h, CONFIG.CRYPTO_UPDATE_INTERVAL);
}

function initializeCoinGeckoChart() {
    const canvas = document.getElementById('chart1');
    
    chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'BTC/CAD 15 Days',
                data: [],
                borderColor: '#4ade80',
                backgroundColor: '#4ade8020',
                borderWidth: 2,
                fill: true,
                tension: 0.3,
                pointRadius: 0,
                pointHoverRadius: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(32, 32, 32, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#4ade80',
                    borderWidth: 1,
                    displayColors: false
                }
            },
            scales: {
                x: { display: false },
                y: { display: false }
            },
            elements: {
                point: { radius: 0 }
            }
        }
    });
}

// CoinGecko 15 Day Chart
async function fetchCoinGecko24h() {
    try {
        // Get current price
        const priceResponse = await fetch(CONFIG.API.COINGECKO_PRICE, {
            method: 'GET',
            cache: 'no-cache',
            keepalive: true
        });
        
        if (!priceResponse.ok) {
            throw new Error(`Price API failed: ${priceResponse.status}`);
        }
        
        const priceData = await priceResponse.json();
        
        if (priceData.bitcoin && priceData.bitcoin.cad) {
            const currentPrice = priceData.bitcoin.cad;
            updatePriceDisplay('coinGeckoWidget', `$${currentPrice.toLocaleString('en-CA', {minimumFractionDigits: 2})} CAD`);
        }
        
        // Get 15-day historical data
        const chartResponse = await fetch(CONFIG.API.COINGECKO_CHART, {
            method: 'GET',
            cache: 'no-cache',
            keepalive: true
        });
        
        if (chartResponse.ok) {
            const chartData = await chartResponse.json();
            
            if (chartData.prices && chartData.prices.length > 0) {
                updateCoinGeckoChart(chartData.prices);
            } else {
                // Create fallback chart with current price
                const now = Date.now();
                const fallbackData = [];
                const currentPrice = priceData.bitcoin?.cad || 100000;
                for (let i = 14; i >= 0; i--) {
                    const time = now - (i * 24 * 60 * 60 * 1000);
                    const variance = (Math.random() - 0.5) * 0.08;
                    fallbackData.push([time, currentPrice * (1 + variance)]);
                }
                updateCoinGeckoChart(fallbackData);
            }
        } else {
            throw new Error(`Chart API failed: ${chartResponse.status}`);
        }
    } catch (error) {
        updatePriceDisplay('coinGeckoWidget', 'Error', true);
        
        // Try to show a basic fallback chart
        try {
            const now = Date.now();
            const fallbackData = [];
            for (let i = 14; i >= 0; i--) {
                const time = now - (i * 24 * 60 * 60 * 1000);
                fallbackData.push([time, 100000 + Math.random() * 15000]);
            }
            updateCoinGeckoChart(fallbackData);
        } catch (fallbackError) {
            // Fallback failed
        }
    }
}

function updateCoinGeckoChart(dataPoints) {
    if (!chart) return;
    if (!dataPoints || dataPoints.length === 0) return;
    
    try {
        // Convert data points to chart format with day labels
        const labels = dataPoints.map(point => new Date(point[0]).toLocaleDateString('en-US', { 
            month: 'short',
            day: 'numeric'
        }));
        const prices = dataPoints.map(point => point[1]);
        
        chart.data.labels = labels;
        chart.data.datasets[0].data = prices;
        chart.update('none');
    } catch (error) {
        // Error updating chart
    }
}

function updatePriceDisplay(widgetId, priceText, isError = false) {
    const widget = document.getElementById(widgetId);
    if (widget) {
        const priceDisplay = widget.querySelector('.price-display');
        priceDisplay.textContent = priceText;
        
        // Update styling based on status
        priceDisplay.classList.remove('loading', 'negative');
        if (isError) {
            priceDisplay.classList.add('negative');
        }
    }
}

// Open CoinGecko Bitcoin page
function openCoinGecko() {
    window.open('https://www.coingecko.com/en/coins/bitcoin', '_blank');
}

// Utility Functions for Context Menus
const ContextMenuUtils = {
    createMenuItem(icon, text, onclick) {
        return `
            <div class="context-menu-item" onclick="${onclick}">
                <i class="fas fa-${icon}"></i>
                ${text}
            </div>
        `;
    },
    
    getLockMenuItem() {
        const icon = isGloballyLocked ? 'unlock' : 'lock';
        const text = isGloballyLocked ? 'Unlock' : 'Lock';
        return this.createMenuItem(icon, `${text} All Elements`, 'toggleGlobalLock()');
    },
    
    getStandardMenuItems() {
        return [
            this.createMenuItem('plus', 'Add Bookmark', 'addBookmark()'),
            this.createMenuItem('folder-plus', 'Add Group', 'addGroup()'),
            this.createMenuItem('download', 'Export Bookmarks', 'exportData()'),
            this.createMenuItem('upload', 'Import Bookmarks', 'importData()')
        ].join('');
    },
    
    showMenu(e, html) {
        DOM.contextMenu.innerHTML = html;
        DOM.contextMenu.style.display = 'block';
        DOM.contextMenu.style.left = e.pageX + 'px';
        DOM.contextMenu.style.top = e.pageY + 'px';
    }
}; 