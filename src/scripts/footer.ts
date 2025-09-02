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
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear().toString();
    }

    const sponsorContainer: HTMLElement | null = document.querySelector<HTMLElement>(".partner-container");
    const sponsorLogos: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(".partner-logos");

    if (sponsorContainer && sponsorLogos.length > 0) {
        let isUserInteracting = false;
        let interactionTimeout: number | undefined;
        let animationId: number | undefined;
        let startTime: number | null = null;
        const animationDuration = 15e3;
        let isPaused = false;
        let pausedProgress = 0;

        sponsorLogos.forEach((logo) => {
            logo.style.animation = "none";
            logo.style.transform = "translateX(0)";
        });


        sponsorContainer.addEventListener("touchstart", () => {
            isUserInteracting = true;
            pauseAnimation();
            if (interactionTimeout !== undefined) {
                clearTimeout(interactionTimeout);
            }
        }, {passive: true});

        sponsorContainer.addEventListener("touchend", () => {
            isUserInteracting = false;
            interactionTimeout = window.setTimeout(() => {
                if (!isUserInteracting) {
                    resumeAnimation();
                }
            }, 1000);
        }, {passive: true});

        sponsorContainer.addEventListener("mouseenter", () => {
            if (!isUserInteracting) {
                pauseAnimation();
            }
        });

        sponsorContainer.addEventListener("mouseleave", () => {
            if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                pauseAnimation();
            } else if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        window.addEventListener("beforeunload", () => {
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }
        });

        function animate(currentTime: number): void {
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
        }

        animationId = requestAnimationFrame(animate);

        function pauseAnimation(): void {
            isPaused = true;
            if (startTime !== null) {
                pausedProgress += performance.now() - startTime;
                startTime = null;
            }
        }

        function resumeAnimation(): void {
            isPaused = false;
            startTime = null;
        }
    }
}
