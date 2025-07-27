// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const mobileDropdownLabel = document.querySelector('.mobile-dropdown-label');

    // Function to close mobile menu
    function closeMobileMenu() {
        if (mobileNav) {
            mobileNav.classList.remove('active');

            // Reset hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Function to open mobile menu
    function openMobileMenu() {
        if (mobileNav) {
            mobileNav.classList.add('active');

            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(45deg) translate(4px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(4px, -6px)';
        }
    }

    // Mobile menu toggle
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function () {
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Mobile dropdown toggle
    if (mobileDropdown && mobileDropdownLabel) {
        mobileDropdownLabel.addEventListener('click', function () {
            mobileDropdown.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (mobileNav && mobileToggle) {
            if (!mobileNav.contains(event.target) && !mobileToggle.contains(event.target)) {
                closeMobileMenu();
            }
        }
    });
});