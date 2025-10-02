// ==================== MAIN JS (Shared across all devices) ====================

// Detect device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width <= 768) return 'mobile';
    if (width <= 1024) return 'tablet';
    return 'desktop';
}

// Initialize device-specific features
function initDeviceFeatures() {
    const device = getDeviceType();
    document.body.classList.add(device + '-device');
    
    // Load device-specific features
    switch(device) {
        case 'mobile':
            if (typeof initMobileFeatures === 'function') initMobileFeatures();
            break;
        case 'tablet':
            if (typeof initTabletFeatures === 'function') initTabletFeatures();
            break;
        case 'desktop':
            if (typeof initDesktopFeatures === 'function') initDesktopFeatures();
            break;
    }
}

// YOUR EXISTING CODE - Enhanced
// Animate chef hat on hover
const hat = document.querySelector('.chef-hat');
if (hat) {
    hat.addEventListener('mouseover', () => {
        hat.classList.add('bounce');
    });
    hat.addEventListener('animationend', () => {
        hat.classList.remove('bounce');
    });
}

// Enhanced accordion functionality for menu
const headers = document.querySelectorAll('.accordion-header');
headers.forEach(header => {
    header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        body.classList.toggle('open');
        const icon = header.querySelector('.icon');
        if (icon) {
            icon.textContent = body.classList.contains('open') ? '-' : '+';
        }
    });
});

// Enhanced reveal animation on scroll
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// NEW: Recipe accordion functionality
function initRecipeAccordions() {
    const recipeHeaders = document.querySelectorAll('.recipe-accordion-header');
    recipeHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.parentElement;
            accordion.classList.toggle('open');
            const span = header.querySelector('span');
            if (span) {
                span.textContent = accordion.classList.contains('open') ? '-' : '+';
            }
        });
    });
}

// NEW: Shopping List Generator
function initShoppingList() {
    const shoppingListBtn = document.querySelector('.shopping-list-btn');
    if (shoppingListBtn) {
        shoppingListBtn.addEventListener('click', generateShoppingList);
    }
}

function generateShoppingList() {
    const ingredients = document.querySelectorAll('.recipe-accordion-body ul li');
    const shoppingList = [];
    
    ingredients.forEach(ingredient => {
        shoppingList.push(ingredient.textContent.trim());
    });
    
    // For now, just log to console - we'll enhance this later
    console.log('Shopping List:', shoppingList);
    alert('Shopping list generated! Check console for now.');
}

// NEW: Print Recipe Functionality
function initPrintRecipe() {
    const printBtns = document.querySelectorAll('.print-recipe-btn');
    printBtns.forEach(btn => {
        btn.addEventListener('click', printRecipe);
    });
}

function printRecipe() {
    window.print();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDeviceFeatures();
    initRecipeAccordions();
    initShoppingList();
    initPrintRecipe();
    window.addEventListener('scroll', reveal);
    
    // Initial reveal check
    reveal();
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const currentDevice = getDeviceType();
        document.body.className = document.body.className.replace(/\b(mobile|tablet|desktop)-device\b/g, '');
        document.body.classList.add(currentDevice + '-device');
        reveal(); // Re-check reveal on resize
    }, 250);
});
// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navbar ul');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('show');
    });
  }
  
  // Close menu when clicking outside
  document.addEventListener('click', function() {
    if (navMenu) {
      navMenu.classList.remove('show');
    }
  });
});
