const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form) {
    form.addEventListener('submit', function (e: Event) {
        const errorDiv = document.getElementById('form-error') as HTMLDivElement | null;
        if (!errorDiv) return;

        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        // Use type assertions and optional chaining
        const name = (form.querySelector('input[name="name"]') as HTMLInputElement | null)?.value.trim() || '';
        const email = (form.querySelector('input[name="email"]') as HTMLInputElement | null)?.value.trim() || '';
        const subject = (form.querySelector('select[name="subject"]') as HTMLSelectElement | null)?.value.trim() || '';
        const message = (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null)?.value.trim() || '';
        const hCaptcha = (form.querySelector('textarea[name="h-captcha-response"]') as HTMLTextAreaElement | null)?.value;

        // Email regex for basic validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const showError = (msg: string) => {
            e.preventDefault();
            errorDiv.textContent = msg;
            errorDiv.style.display = 'block';
        };

        if (!name) return showError("Please enter your name.");
        if (!email) return showError("Please enter your email address.");
        if (!emailRegex.test(email)) return showError("Please enter a valid email address.");
        if (!subject) return showError("Please select a subject.");
        if (!message) return showError("Please enter your message.");
        if (!hCaptcha) return showError("Please fill out the captcha field.");
    });
}
