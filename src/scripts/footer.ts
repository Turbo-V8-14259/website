document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear().toString();
    }

    // Enhanced mobile interaction for sponsor carousel
    const sponsorContainer = document.querySelector<HTMLElement>('.sponsor-container');
    const sponsorLogos = document.querySelectorAll<HTMLElement>('.sponsor-logos');

    if (sponsorContainer && sponsorLogos.length > 0) {
        let isUserInteracting = false;
        let interactionTimeout: number | undefined;
        let animationId: number | undefined;
        let startTime: number | null = null;
        const animationDuration = 15000; // 15 seconds in milliseconds
        let isPaused = false;
        let pausedProgress = 0;

        // Remove all CSS animations and handle with JavaScript
        sponsorLogos.forEach((logo) => {
            logo.style.animation = 'none';
            logo.style.transform = 'translateX(0)';
        });

        // JavaScript-based animation function
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;

            if (!isPaused) {
                const elapsed = currentTime - startTime + pausedProgress;
                const progress = (elapsed % animationDuration) / animationDuration;
                const translateX = -progress * 100;

                sponsorLogos.forEach((logo) => {
                    logo.style.transform = `translateX(${translateX}%)`;
                });
            }

            animationId = requestAnimationFrame(animate);
        };

        // Start the animation
        animationId = requestAnimationFrame(animate);

        // Function to pause animation
        const pauseAnimation = () => {
            isPaused = true;
            if (startTime !== null) {
                pausedProgress += performance.now() - startTime;
                startTime = null;
            }
        };

        // Function to resume animation
        const resumeAnimation = () => {
            isPaused = false;
            startTime = null;
        };

        // Touch events for mobile
        sponsorContainer.addEventListener(
            'touchstart',
            (e: TouchEvent) => {
                isUserInteracting = true;
                pauseAnimation();
                if (interactionTimeout !== undefined) {
                    clearTimeout(interactionTimeout);
                }
            },
            {passive: true}
        );

        sponsorContainer.addEventListener(
            'touchend',
            () => {
                isUserInteracting = false;
                // Resume animation after a short delay
                interactionTimeout = window.setTimeout(() => {
                    if (!isUserInteracting) {
                        resumeAnimation();
                    }
                }, 1000);
            },
            {passive: true}
        );

        // Mouse events for desktop (existing hover behavior)
        sponsorContainer.addEventListener('mouseenter', () => {
            if (!isUserInteracting) {
                pauseAnimation();
            }
        });

        sponsorContainer.addEventListener('mouseleave', () => {
            if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        // Handle visibility change (pause when tab is not visible)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pauseAnimation();
            } else if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }
        });
    }
});
