document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear().toString();
    }
});
