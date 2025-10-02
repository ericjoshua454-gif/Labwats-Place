// ==================== TABLET-SPECIFIC FEATURES ====================

function initTabletFeatures() {
    console.log('Initializing tablet features...');
    
    initSplitScreen();
    initTabletGestures();
    initEnhancedLayouts();
    addTabletUtilities();
}

// Split-screen functionality for tablets
function initSplitScreen() {
    const recipeContainers = document.querySelectorAll('.recipes-container');
    
    recipeContainers.forEach(container => {
        container.classList.add('tablet-split-view');
        
        // Add split view toggle
        const splitViewBtn = document.createElement('button');
        splitViewBtn.className = 'split-view-btn tablet-only';
        splitViewBtn.innerHTML = '🔍 Split View';
        splitViewBtn.onclick = toggleSplitView;
        
        container.insertBefore(splitViewBtn, container.firstChild);
    });
}

function toggleSplitView() {
    const body = document.body;
    body.classList.toggle('split-view-active');
    
    if (body.classList.contains('split-view-active')) {
        // Enhanced split view styling
        const style = document.createElement('style');
        style.id = 'split-view-styles';
        style.textContent = `
            .split-view-active .recipe-accordion-container {
                grid-template-columns: 1fr !important;
                max-height: 50vh;
                overflow-y: auto;
            }
            .split-view-active .recipe-accordion-body {
                max-height: none !important;
            }
        `;
        document.head.appendChild(style);
    } else {
        const existingStyle = document.getElementById('split-view-styles');
        if (existingStyle) existingStyle.remove();
    }
}

// Tablet gesture support
function initTabletGestures() {
    // Pinch to zoom for recipe images
    const recipeImages = document.querySelectorAll('.recipe-accordion-body img');
    
    recipeImages.forEach(img => {
        let initialDistance = null;
        
        img.addEventListener('touchstart', function(e) {
            if (e.touches.length === 2) {
                initialDistance = getDistance(e.touches[0], e.touches[1]);
            }
        });
        
        img.addEventListener('touchmove', function(e) {
            if (e.touches.length === 2 && initialDistance !== null) {
                e.preventDefault();
                const currentDistance = getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / initialDistance;
                
                // Limit scale
                if (scale >= 0.5 && scale <= 3) {
                    this.style.transform = `scale(${scale})`;
                }
            }
        });
        
        img.addEventListener('touchend', function() {
            initialDistance = null;
            // Reset transform after a delay
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 1000);
        });
    });
}

function getDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Enhanced layouts for tablet
function initEnhancedLayouts() {
    // Add tablet-specific grid layouts
    const highlights = document.querySelector('.highlights');
    if (highlights) {
        highlights.classList.add('tablet-grid-layout');
    }
    
    // Enhanced recipe grid
    const recipeGrids = document.querySelectorAll('.recipe-accordion-container');
    recipeGrids.forEach(grid => {
        grid.classList.add('tablet-recipe-grid');
    });
}

// Tablet utility functions
function addTabletUtilities() {
    // Add tablet-specific toolbar
    const tabletToolbar = document.createElement('div');
    tabletToolbar.className = 'tablet-toolbar';
    tabletToolbar.innerHTML = `
        <button onclick="toggleSplitView()" class="toolbar-btn">Split View</button>
        <button onclick="generateShoppingList()" class="toolbar-btn">Shopping List</button>
        <button onclick="printRecipe()" class="toolbar-btn">Print All</button>
    `;
    
    // Add styles for tablet toolbar
    const style = document.createElement('style');
    style.textContent = `
        .tablet-toolbar {
            position: fixed;
            top: 80px;
            right: 20px;
            background: linear-gradient(135deg, #45B7D1, #96CEB4);
            padding: 15px;
            border-radius: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 999;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .toolbar-btn {
            background: white;
            border: none;
            padding: 12px 15px;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
            color: #34495E;
            transition: all 0.3s ease;
        }
        .toolbar-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .split-view-btn {
            background: linear-gradient(135deg, #45B7D1, #96CEB4);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            margin-bottom: 20px;
            font-weight: 600;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(tabletToolbar);
}