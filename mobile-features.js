// ==================== MOBILE-SPECIFIC FEATURES ====================

function initMobileFeatures() {
    console.log('Initializing mobile features...');
    
    initTouchNavigation();
    initSwipeGestures();
    initMobileOptimizations();
    addMobileUtilityButtons();
}

// Touch-optimized navigation
function initTouchNavigation() {
    // Increase touch targets
    const touchElements = document.querySelectorAll('a, button, .accordion-header');
    touchElements.forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
        element.style.padding = '12px';
    });
    
    // Add touch feedback
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.7';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        });
    });
}

// Swipe gestures for mobile
function initSwipeGestures() {
    let startX, startY;
    const recipeSections = document.querySelectorAll('.recipe-accordion');
    
    recipeSections.forEach(section => {
        section.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        section.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Horizontal swipe (more prominent than vertical)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - close accordion
                    this.classList.remove('open');
                    const header = this.querySelector('.recipe-accordion-header span');
                    if (header) header.textContent = '+';
                } else {
                    // Swipe right - open accordion
                    this.classList.add('open');
                    const header = this.querySelector('.recipe-accordion-header span');
                    if (header) header.textContent = '-';
                }
            }
            
            startX = null;
            startY = null;
        });
    });
}

// Mobile-specific optimizations
function initMobileOptimizations() {
    // Add mobile-specific classes for styling
    document.body.classList.add('mobile-optimized');
    
    // Optimize images for mobile
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Add pull-to-refresh prevention (optional)
    let touchStartY = 0;
    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });
}

// Add mobile utility buttons
function addMobileUtilityButtons() {
    // Create quick action buttons
    const quickActions = document.createElement('div');
    quickActions.className = 'mobile-quick-actions';
    quickActions.innerHTML = `
        <button class="quick-btn scroll-top" onclick="scrollToTop()">↑ Top</button>
        <button class="quick-btn shopping-list" onclick="generateShoppingList()">🛒 List</button>
        <button class="quick-btn print-btn" onclick="printRecipe()">🖨️ Print</button>
    `;
    
    // Add styles for quick actions
    const style = document.createElement('style');
    style.textContent = `
        .mobile-quick-actions {
            position: fixed;
            bottom: 80px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 1000;
        }
        .quick-btn {
            background: linear-gradient(135deg, #FF6B6B, #4ECDC4);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        }
        .quick-btn:active {
            transform: scale(0.9);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(quickActions);
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile-specific shopping list
function generateMobileShoppingList() {
    const ingredients = document.querySelectorAll('.recipe-accordion-body ul li');
    let listText = "🛒 Shopping List:\\n\\n";
    
    ingredients.forEach((ingredient, index) => {
        listText += `${index + 1}. ${ingredient.textContent.trim()}\\n`;
    });
    
    // On mobile, show in alert (could be enhanced with a modal)
    alert(listText);
}