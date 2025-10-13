// ==================== MOBILE-SPECIFIC FEATURES ====================

function initMobileFeatures() {
    console.log("✅ Mobile features initialized");

    initTouchNavigation();
    initSwipeGestures();
    initMobileOptimizations();
    addMobileUtilityButtons();
}

// ==================== TOUCH NAVIGATION ====================

function initTouchNavigation() {
    const touchElements = document.querySelectorAll("a, button, .accordion-header");

    touchElements.forEach(el => {
        el.style.minHeight = "44px";
        el.style.minWidth = "44px";
        el.style.padding = "12px";

        el.addEventListener("touchstart", () => (el.style.opacity = "0.7"));
        el.addEventListener("touchend", () => (el.style.opacity = "1"));
    });
}

// ==================== SWIPE GESTURES ====================

function initSwipeGestures() {
    let startX, startY;
    const recipeSections = document.querySelectorAll(".recipe-accordion");

    recipeSections.forEach(section => {
        section.addEventListener("touchstart", e => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        section.addEventListener("touchend", e => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;

            const diffX = startX - endX;
            const diffY = startY - endY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left = close accordion
                    section.classList.remove("open");
                    const header = section.querySelector(".recipe-accordion-header span");
                    if (header) header.textContent = "+";
                } else {
                    // Swipe right = open accordion
                    section.classList.add("open");
                    const header = section.querySelector(".recipe-accordion-header span");
                    if (header) header.textContent = "-";
                }
            }

            startX = null;
            startY = null;
        });
    });
}

// ==================== MOBILE OPTIMIZATIONS ====================

function initMobileOptimizations() {
    document.body.classList.add("mobile-optimized");

    const images = document.querySelectorAll("img");
    images.forEach(img => (img.loading = "lazy"));

    let touchStartY = 0;
    document.addEventListener(
        "touchstart",
        e => {
            touchStartY = e.touches[0].clientY;
        },
        { passive: true }
    );
}

// ==================== QUICK ACTION BUTTONS ====================

function addMobileUtilityButtons() {
    console.log("Adding mobile quick buttons...");

    // Remove old buttons if any
    const old = document.querySelector(".mobile-quick-actions");
    if (old) old.remove();

    // Create container
    const quickActions = document.createElement("div");
    quickActions.className = "mobile-quick-actions";
    quickActions.innerHTML = `
        <button class="quick-btn scroll-top" title="Scroll to Top">↑</button>
        <button class="quick-btn shopping-list" title="Shopping List">🛒</button>
        <button class="quick-btn help-btn" title="WhatsApp Help">💬</button>
    `;

    document.body.appendChild(quickActions);

    // Styling
    const style = document.createElement("style");
    style.textContent = `
        .mobile-quick-actions {
            position: fixed;
            bottom: 90px;
            right: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            z-index: 99999;
        }
        .quick-btn {
            background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
            color: white;
            border: none;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            transition: transform 0.2s ease;
        }
        .quick-btn:active {
            transform: scale(0.9);
        }
    `;
    document.head.appendChild(style);

    // Enable dragging (mobile-safe)
    makeButtonsDraggable();
    setupQuickButtonActions();
}

// ==================== DRAGGING FUNCTION ====================

function makeButtonsDraggable() {
    const buttons = document.querySelectorAll(".quick-btn");

    buttons.forEach(btn => {
        let offsetX, offsetY, isDragging = false;

        btn.addEventListener("touchstart", e => {
            isDragging = true;
            const touch = e.touches[0];
            offsetX = touch.clientX - btn.getBoundingClientRect().left;
            offsetY = touch.clientY - btn.getBoundingClientRect().top;
            btn.style.transition = "none";
        });

        btn.addEventListener("touchmove", e => {
            if (!isDragging) return;
            const touch = e.touches[0];
            const x = touch.clientX - offsetX;
            const y = touch.clientY - offsetY;
            btn.style.position = "fixed";
            btn.style.left = `${x}px`;
            btn.style.top = `${y}px`;
        });

        btn.addEventListener("touchend", () => {
            isDragging = false;
            btn.style.transition = "";
        });
    });
}

// ==================== BUTTON ACTIONS ====================

function setupQuickButtonActions() {
    const topBtn = document.querySelector(".scroll-top");
    const listBtn = document.querySelector(".shopping-list");
    const helpBtn = document.querySelector(".help-btn");

    if (topBtn) topBtn.addEventListener("click", scrollToTop);
if (listBtn) listBtn.addEventListener("click", () => {
    window.location.href = "dashboard.html";
});
    if (helpBtn) helpBtn.addEventListener("click", openWhatsAppChat);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function generateMobileShoppingList() {
    const ingredients = document.querySelectorAll(".recipe-accordion-body ul li");
    if (ingredients.length === 0) {
        alert("No items available to generate list.");
        return;
    }

    let listText = "🛒 Shopping List:\n\n";
    ingredients.forEach((ing, i) => {
        listText += `${i + 1}. ${ing.textContent.trim()}\n`;
    });

    alert(listText);
}

function openWhatsAppChat() {
    const phoneNumber = "2349132963161"; // 🔁 Replace with your real WhatsApp number
    const message = encodeURIComponent("Hello Labwats Place! I need some help.");
    const link = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(link, "_blank");
}

// ==================== AUTO INITIALIZE ====================

document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth <= 768) {
        initMobileFeatures();
    }
});
