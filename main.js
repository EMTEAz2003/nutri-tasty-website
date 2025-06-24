//< !--main.js -->
//    // Main JavaScript functionality for the website

//    // Wait for DOM to be fully loaded
//    document.addEventListener('DOMContentLoaded', function () {
//        // Initialize mobile menu toggle
//        initMobileMenu();

//        // Initialize smooth scrolling for anchor links
//        initSmoothScroll();

//        // Initialize any tooltips
//        initTooltips();

//        // Check if we need to initialize specific page functionality
//        if (document.querySelector('.nutrition-calculator')) {
//            // Initialize nutrition calculator if it exists on the page
//            initNutritionCalculator();
//        }

//        if (document.querySelector('.menu-filter')) {
//            // Initialize menu filter if it exists on the page
//            initMenuFilter();
//        }

//        // Track page views (analytics placeholder)
//        trackPageView();
//    });

//// Mobile menu functionality
//function initMobileMenu() {
//    const menuToggle = document.querySelector('.menu-toggle');
//    const mobileMenu = document.querySelector('.mobile-menu');

//    if (menuToggle && mobileMenu) {
//        menuToggle.addEventListener('click', function () {
//            mobileMenu.classList.toggle('hidden');
//            document.body.classList.toggle('menu-open');
//        });
//    }
//}

//// Smooth scrolling for anchor links
//function initSmoothScroll() {
//    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//        anchor.addEventListener('click', function (e) {
//            e.preventDefault();

//            const targetId = this.getAttribute('href');
//            if (targetId === '#') return;

//            const targetElement = document.querySelector(targetId);
//            if (targetElement) {
//                targetElement.scrollIntoView({
//                    behavior: 'smooth',
//                    block: 'start'
//                });

//                // Update URL but without scrolling
//                history.pushState(null, null, targetId);
//            }
//        });
//    });
//}

//// Initialize tooltips
//function initTooltips() {
//    const tooltips = document.querySelectorAll('[data-tooltip]');

//    tooltips.forEach(tooltip => {
//        tooltip.addEventListener('mouseenter', function () {
//            const tooltipText = this.getAttribute('data-tooltip');

//            const tooltipElement = document.createElement('div');
//            tooltipElement.className = 'tooltip';
//            tooltipElement.textContent = tooltipText;

//            document.body.appendChild(tooltipElement);

//            const rect = this.getBoundingClientRect();
//            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
//            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
//            tooltipElement.style.opacity = '1';
//        });

//        tooltip.addEventListener('mouseleave', function () {
//            const tooltipElement = document.querySelector('.tooltip');
//            if (tooltipElement) {
//                tooltipElement.remove();
//            }
//        });
//    });
//}

//// Analytics placeholder
//function trackPageView() {
//    const pageTitle = document.title;
//    const pageUrl = window.location.href;

//    // This would normally send data to an analytics service
//    console.log(`Page view tracked: ${pageTitle} (${pageUrl})`);
//}

//// Form validation helper
//function validateForm(formElement) {
//    let isValid = true;
//    const requiredFields = formElement.querySelectorAll('[required]');

//    requiredFields.forEach(field => {
//        if (!field.value.trim()) {
//            isValid = false;
//            field.classList.add('error');

//            // Add error message if it doesn't exist
//            let errorMessage = field.parentNode.querySelector('.error-message');
//            if (!errorMessage) {
//                errorMessage = document.createElement('div');
//                errorMessage.className = 'error-message';
//                errorMessage.textContent = 'שדה חובה';
//                field.parentNode.appendChild(errorMessage);
//            }
//        } else {
//            field.classList.remove('error');
//            const errorMessage = field.parentNode.querySelector('.error-message');
//            if (errorMessage) {
//                errorMessage.remove();
//            }
//        }
//    });

//    return isValid;
//}
< !--main.js -->
    // Main JavaScript functionality for the website

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function () {
        // Initialize mobile menu toggle
        initMobileMenu();

        // Initialize smooth scrolling for anchor links
        initSmoothScroll();

        // Initialize any tooltips
        initTooltips();

        // Check if we need to initialize specific page functionality
        if (document.querySelector('.nutrition-calculator')) {
            // Initialize nutrition calculator if it exists on the page
            initNutritionCalculator();
        }

        if (document.querySelector('.menu-filter')) {
            // Initialize menu filter if it exists on the page
            initMenuFilter();
        }

        // Track page views (analytics placeholder)
        trackPageView();
    });

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
            document.body.classList.toggle('menu-open');
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL but without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function () {
            const tooltipText = this.getAttribute('data-tooltip');

            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'tooltip';
            tooltipElement.textContent = tooltipText;

            document.body.appendChild(tooltipElement);

            const rect = this.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - tooltipElement.offsetHeight - 10}px`;
            tooltipElement.style.left = `${rect.left + (rect.width / 2) - (tooltipElement.offsetWidth / 2)}px`;
            tooltipElement.style.opacity = '1';
        });

        tooltip.addEventListener('mouseleave', function () {
            const tooltipElement = document.querySelector('.tooltip');
            if (tooltipElement) {
                tooltipElement.remove();
            }
        });
    });
}

// Analytics placeholder
function trackPageView() {
    const pageTitle = document.title;
    const pageUrl = window.location.href;

    // This would normally send data to an analytics service
    console.log(`Page view tracked: ${pageTitle} (${pageUrl})`);
}

// Form validation helper
function validateForm(formElement) {
    let isValid = true;
    const requiredFields = formElement.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');

            // Add error message if it doesn't exist
            let errorMessage = field.parentNode.querySelector('.error-message');
            if (!errorMessage) {
                errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'שדה חובה';
                field.parentNode.appendChild(errorMessage);
            }
        } else {
            field.classList.remove('error');
            const errorMessage = field.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
    });

    return isValid;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = form?.querySelector('input[type="email"]');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (validateForm(form)) {
                const email = emailInput.value.trim();

                // Save to localStorage
                localStorage.setItem('newsletterEmail', email);

                // Output to user
                alert('נרשמת בהצלחה!');

                // Clear input
                emailInput.value = '';
            }
        });
    }
});