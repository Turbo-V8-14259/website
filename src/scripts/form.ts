export {};

declare global {
    interface Window {
        hcaptcha?: {
            reset: () => void;
        };
    }
}

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
    const form = document.getElementById('contact-form') as HTMLFormElement | null;
    const errorDiv = document.getElementById('form-info') as HTMLDivElement | null;

    if (!form || !errorDiv) {
        return;
    }

    const getInputValue = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(selector: string): string => {
        return (form.querySelector(selector) as T | null)?.value.trim() || '';
    };

    const showMessage = (msg: string, type: 'good' | 'bad'): void => {
        errorDiv.textContent = msg;
        errorDiv.className = type;
        errorDiv.style.display = 'block';
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    };

    const showError = (msg: string): void => showMessage(msg, 'bad');
    const showSuccess = (msg: string): void => showMessage(msg, 'good');

    form.addEventListener('submit', (e: Event): void => {
        e.preventDefault();

        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        const name = getInputValue<HTMLInputElement>('input[name="name"]');
        const email = getInputValue<HTMLInputElement>('input[name="email"]');
        const reasonForContact = getInputValue<HTMLSelectElement>('select[name="reason for contact"]');
        const message = getInputValue<HTMLTextAreaElement>('textarea[name="message"]');
        const hCaptcha = getInputValue<HTMLTextAreaElement>('textarea[name="h-captcha-response"]');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) {
            showError('Please enter your name.');
            return;
        }
        if (!email) {
            showError('Please enter your email address.');
            return;
        }
        if (!emailRegex.test(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        if (!reasonForContact) {
            showError('Please select a reason for contacting us.');
            return;
        }
        if (!message) {
            showError('Please enter your message.');
            return;
        }
        if (!hCaptcha) {
            showError('Please fill out the captcha field.');
            return;
        }

        showSuccess('Sending...');

        const formData = new FormData(form);
        const dataObject = Object.fromEntries(formData.entries());

        // Safely cast and concatenate subject and name
        if (typeof dataObject.subject === 'string' && typeof dataObject.name === 'string') {
            dataObject.subject = dataObject.subject + " from " + dataObject.name;
        }

        const jsonBody = JSON.stringify(dataObject);

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: jsonBody,
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
}
