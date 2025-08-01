export {};
declare global {
    interface Window {
        hcaptcha?: {
            reset: () => void;
        };
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const errorDiv = document.getElementById('form-info') as HTMLDivElement | null;

    if (!form || !errorDiv) return;

    const getInputValue = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(selector: string): string => {
        return (form.querySelector(selector) as T | null)?.value.trim() || '';
    };

    const showMessage = (msg: string, type: 'good' | 'bad') => {
        errorDiv.textContent = msg;
        errorDiv.className = type;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({behavior: 'smooth', block: 'nearest', inline: 'nearest'});
    };

    const showError = (msg: string) => showMessage(msg, 'bad');
    const showSuccess = (msg: string) => showMessage(msg, 'good');

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        const name = getInputValue<HTMLInputElement>('input[name="name"]');
        const email = getInputValue<HTMLInputElement>('input[name="email"]');
        const subject = getInputValue<HTMLSelectElement>('select[name="subject"]');
        const message = getInputValue<HTMLTextAreaElement>('textarea[name="message"]');
        const hCaptcha = getInputValue<HTMLTextAreaElement>('textarea[name="h-captcha-response"]');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) return showError('Please enter your name.');
        if (!email) return showError('Please enter your email address.');
        if (!emailRegex.test(email)) return showError('Please enter a valid email address.');
        if (!subject) return showError('Please select a subject.');
        if (!message) return showError('Please enter your message.');
        if (!hCaptcha) return showError('Please fill out the captcha field.');

        showSuccess('Sending...');

        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData.entries());
        const jsonBody = JSON.stringify(dataObject);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST', headers: {
                'Content-Type': 'application/json', 'Accept': 'application/json',
            }, body: jsonBody,
        })
            .then(async (response) => {
                const result = await response.json();
                if (response.ok) {
                    console.log('Success:', result.message);
                    showSuccess('Success! Your message has been sent.');
                } else {
                    console.error('Error response:', result);
                    showError('There was a problem submitting the form.');
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                showError('A network error occurred. Please try again later.');
            })
            .finally(() => {
                form.reset();
                if (window.hcaptcha) {
                    window.hcaptcha.reset();
                }
                setTimeout(() => {
                    errorDiv.style.display = 'none';
                }, 5000);
            });
    });
});
