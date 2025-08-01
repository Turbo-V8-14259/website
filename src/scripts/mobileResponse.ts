"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector<HTMLElement>('.mobile-menu-toggle');
    const mobileNav = document.querySelector<HTMLElement>('.mobile-nav');
    const mobileDropdown = document.querySelector<HTMLElement>('.mobile-dropdown');
    const mobileDropdownLabel = document.querySelector<HTMLElement>('.mobile-dropdown-label');

    // Function to close mobile menu
    function closeMobileMenu(): void {
        if (mobileNav && mobileToggle) {
            mobileNav.classList.remove('active');

            // Reset hamburger menu
            const spans = mobileToggle.querySelectorAll<HTMLSpanElement>('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }

    // Function to open mobile menu
    function openMobileMenu(): void {
        if (mobileNav && mobileToggle) {
            mobileNav.classList.add('active');

            // Animate hamburger menu
            const spans = mobileToggle.querySelectorAll<HTMLSpanElement>('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -6px)';
            }
        }
    }

    // Mobile menu toggle
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Mobile dropdown toggle
    if (mobileDropdown && mobileDropdownLabel) {
        mobileDropdownLabel.addEventListener('click', () => {
            mobileDropdown.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav a');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (event) => {
        const target = event.target as Node | null;
        if (mobileNav && mobileToggle && target) {
            if (!mobileNav.contains(target) && !mobileToggle.contains(target)) {
                closeMobileMenu();
            }
        }
    });
});
