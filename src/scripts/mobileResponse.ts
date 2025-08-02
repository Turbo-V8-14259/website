export {};

if (document.readyState === "complete") {
    run();
} else {
    document.addEventListener("readystatechange", () => {
        if (document.readyState === "complete") {
            run();
        }
    });
}

function run(): void {
    const mobileToggle = document.querySelector<HTMLElement>('.mobile-menu-toggle');
    const mobileNav = document.querySelector<HTMLElement>('.mobile-nav');
    const mobileDropdown = document.querySelector<HTMLElement>('.mobile-dropdown');
    const mobileDropdownLabel = document.querySelector<HTMLElement>('.mobile-dropdown-label');

    function closeMobileMenu(): void {
        if (mobileNav && mobileToggle) {
            mobileNav.classList.remove('active');

            const spans = mobileToggle.querySelectorAll<HTMLSpanElement>('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }

    function openMobileMenu(): void {
        if (mobileNav && mobileToggle) {
            mobileNav.classList.add('active');

            const spans = mobileToggle.querySelectorAll<HTMLSpanElement>('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -6px)';
            }
        }
    }

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileDropdown && mobileDropdownLabel) {
        mobileDropdownLabel.addEventListener('click', () => {
            mobileDropdown.classList.toggle('active');
        });
    }

    const mobileLinks = document.querySelectorAll<HTMLAnchorElement>('.mobile-nav a');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    document.addEventListener('click', (event) => {
        const target = event.target as Node | null;
        if (mobileNav && mobileToggle && target) {
            if (!mobileNav.contains(target) && !mobileToggle.contains(target)) {
                closeMobileMenu();
            }
        }
    });
}
