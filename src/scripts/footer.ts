export {};
if (document.readyState === "complete") {
    run();
} else {
    document.addEventListener("readystatechange", (): void => {
        if (document.readyState === "complete") {
            run();
        }
    });
}

function run(): void {
    const yearSpan: HTMLElement | null = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear().toString();
    }

    const sponsorContainer: HTMLElement | null = document.querySelector<HTMLElement>(".partner-container");
    const sponsorLogos: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(".partner-logos");

    if (sponsorContainer && sponsorLogos.length > 0) {
        let isUserInteracting: boolean = false;
        let interactionTimeout: number | undefined;
        let animationId: number | undefined;
        let startTime: number | null = null;
        const animationDuration = 15e3;
        let isPaused: boolean = false;
        let pausedProgress: number = 0;

        sponsorLogos.forEach((logo: HTMLElement): void => {
            logo.style.animation = "none";
            logo.style.transform = "translateX(0)";
        });


        sponsorContainer.addEventListener("touchstart", (): void => {
            isUserInteracting = true;
            pauseAnimation();
            if (interactionTimeout !== undefined) {
                clearTimeout(interactionTimeout);
            }
        }, {passive: true});

        sponsorContainer.addEventListener("touchend", (): void => {
            isUserInteracting = false;
            interactionTimeout = window.setTimeout(() => {
                if (!isUserInteracting) {
                    resumeAnimation();
                }
            }, 1000);
        }, {passive: true});

        sponsorContainer.addEventListener("mouseenter", (): void => {
            if (!isUserInteracting) {
                pauseAnimation();
            }
        });

        sponsorContainer.addEventListener("mouseleave", (): void => {
            if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        document.addEventListener("visibilitychange", (): void => {
            if (document.hidden) {
                pauseAnimation();
            } else if (!isUserInteracting) {
                resumeAnimation();
            }
        });

        window.addEventListener("beforeunload", (): void => {
            if (animationId !== undefined) {
                cancelAnimationFrame(animationId);
            }
        });

        function animate(currentTime: number): void {
            if (!startTime) startTime = currentTime;

            if (!isPaused) {
                const elapsed: number = currentTime - startTime + pausedProgress;
                const progress: number = (elapsed % animationDuration) / animationDuration;
                const translateX: number = -progress * 100;

                sponsorLogos.forEach((logo: HTMLElement): void => {
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
