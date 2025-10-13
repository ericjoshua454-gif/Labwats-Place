// ==================== DESKTOP-SPECIFIC FEATURES ====================

function initDesktopFeatures() {
    console.log('Initializing desktop features...');
    
    initHoverEffects();
    initKeyboardShortcuts();
    initAdvancedLayouts();
    initDesktopEnhancements();
    addDesktopUtilities();
}

// Enhanced hover effects for desktop
function initHoverEffects() {
    // Recipe card hover effects
    const recipeCards = document.querySelectorAll('.recipe-accordion');
    
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        });
    });
    
    // Image hover preview
    const recipeImages = document.querySelectorAll('.recipe-accordion-body img');
    recipeImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            const preview = document.createElement('div');
            preview.className = 'image-preview';
            preview.innerHTML = `<img src="${this.src}" alt="Preview">`;
            document.body.appendChild(preview);
            
            // Position near cursor
            document.addEventListener('mousemove', movePreview);
            
            function movePreview(e) {
                preview.style.left = (e.pageX + 20) + 'px';
                preview.style.top = (e.pageY + 20) + 'px';
            }
            
            this.addEventListener('mouseleave', function() {
                preview.remove();
                document.removeEventListener('mousemove', movePreview);
            });
        });
    });
}

// Keyboard shortcuts for power users
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + S for shopping list
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            generateShoppingList();
        }
        
        // Ctrl + P for print
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            printRecipe();
        }
        
        // Escape to close all accordions
        if (e.key === 'Escape') {
            const openAccordions = document.querySelectorAll('.accordion-body.open, .recipe-accordion.open');
            openAccordions.forEach(accordion => {
                accordion.classList.remove('open');
                const header = accordion.previousElementSibling;
                const icon = header.querySelector('.icon, span');
                if (icon) icon.textContent = '+';
            });
        }
        
        // Number keys 1-9 for quick navigation
        if (e.key >= '1' && e.key <= '9') {
            const index = parseInt(e.key) - 1;
            const sections = document.querySelectorAll('section, .recipe-accordion');
            if (sections[index]) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// Advanced desktop layouts
function initAdvancedLayouts() {
    // Multi-column layout for desktop
    const recipeContainers = document.querySelectorAll('.recipes-container');
    recipeContainers.forEach(container => {
        container.classList.add('desktop-advanced-layout');
    });
    
    // Add layout toggle
    const layoutToggle = document.createElement('select');
    layoutToggle.className = 'layout-toggle desktop-only';
    layoutToggle.innerHTML = `
        <option value="grid">Grid View</option>
        <option value="list">List View</option>
        <option value="compact">Compact View</option>
    `;
    layoutToggle.onchange = function() {
        document.body.setAttribute('data-layout', this.value);
    };
    
    const container = document.querySelector('.recipes-container');
    if (container) {
        container.insertBefore(layoutToggle, container.firstChild);
    }
}

// Desktop-specific enhancements
function initDesktopEnhancements() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Lazy loading for images
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}


    
    // Add styles for control panel
    const style = document.createElement('style');
    style.textContent = `
        .desktop-control-panel {
            position: fixed;
            top: 100px;
            left: 20px;
            background: white;
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            z-index: 999;
            min-width: 180px;
        }
        .panel-header {
            font-weight: bold;
            margin-bottom: 15px;
            color: #2C3E50;
            border-bottom: 2px solid #E74C3C;
            padding-bottom: 8px;
        }
        .panel-btn {
            display: block;
            width: 100%;
            padding: 10px;
            margin: 5px 0;
            background: #F0F2F5;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .panel-btn:hover {
            background: #3498DB;
            color: white;
            transform: translateX(5px);
        }
        .layout-toggle {
            margin-bottom: 20px;
            padding: 8px 15px;
            border: 2px solid #2C3E50;
            border-radius: 8px;
            background: white;
            color: #2C3E50;
        }
        .image-preview {
            position: fixed;
            z-index: 10000;
            border: 3px solid #E74C3C;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            pointer-events: none;
        }
        .image-preview img {
            width: 300px;
            height: auto;
            display: block;
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(controlPanel);
}
    


// Load saved preferences
function loadPreferences() {
    const theme = localStorage.getItem('theme');
    const fontSize = localStorage.getItem('fontSize');
    
    if (theme === 'dark') document.body.classList.add('dark-mode');
    if (fontSize) document.body.style.fontSize = fontSize;
}

// Initialize preferences when desktop features load

document.addEventListener('DOMContentLoaded', loadPreferences);

