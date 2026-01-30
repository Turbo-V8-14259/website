export {};

declare const grecaptcha: {
    reset: () => void; getResponse: () => string;
};

type ValidationRule = (value: string) => string | null;

export interface FormHandlerOptions {
    formId: string;
    errorDivId: string;
    submitUrl: string;
    fieldValidations: Record<string, ValidationRule[]>;
}

interface FormspreeResponse {
    message: string;
}

export class Form {
    private form: HTMLFormElement | null;
    private errorDiv: HTMLDivElement | null;
    private options: FormHandlerOptions;

    constructor(options: FormHandlerOptions) {
        this.options = options;
        this.form = document.getElementById(options.formId) as HTMLFormElement | null;
        this.errorDiv = document.getElementById(options.errorDivId) as HTMLDivElement | null;


    }

    public run(): void {
        if (!this.form || !this.errorDiv) return;
        this.form.addEventListener("submit", (e: SubmitEvent): Promise<void> => this.handleSubmit(e));
    }

    private getInputValue<T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(selector: string): string {
        return (this.form?.querySelector(selector) as T | null)?.value.trim() || "";
    }

    private showMessage(msg: string, type: "good" | "bad"): void {
        if (!this.errorDiv) return;
        this.errorDiv.textContent = msg;
        this.errorDiv.className = type;
        this.errorDiv.style.display = "block";
        this.errorDiv.scrollIntoView({behavior: "smooth", block: "nearest"});
    }

    private showError(msg: string): void {
        this.showMessage(msg, "bad");
    }

    private showSuccess(msg: string): void {
        this.showMessage(msg, "good");
    }

    private validate(): boolean {
        for (const [fieldName, rules] of Object.entries(this.options.fieldValidations)) {
            const selector: string = `[name="${fieldName}"]`;
            const value: string = this.getInputValue(selector);
            for (const rule of rules) {
                const errorMsg: string | null = rule(value);
                if (errorMsg) {
                    this.showError(errorMsg);
                    return false;
                }
            }
        }
        return true;
    }

    private async handleSubmit(e: Event): Promise<void> {
        e.preventDefault();
        if (!this.errorDiv || !this.form) return;

        this.errorDiv.style.display = "none";
        this.errorDiv.textContent = "";

        if (!this.validate()) return;

        this.showSuccess("Sending...");

        const formData: Record<string, FormDataEntryValue> = Object.fromEntries(new FormData(this.form).entries());

        try {
            const response: Response = await fetch(this.options.submitUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json", "Accept": "application/json"},
                body: JSON.stringify(formData),
            });

            const result: FormspreeResponse = await response.json() as FormspreeResponse;
            if (response.ok) {
                this.showSuccess("Success! Your message has been sent.");
            } else {
                console.error("Error response:", result);
                this.showError("There was a problem submitting the form.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Fetch error:", error.message);
            } else {
                console.error("Fetch error:", error);
            }
        } finally {
            this.form.reset();
            if (typeof grecaptcha !== "undefined") {
                grecaptcha.reset();
            }
            setTimeout(() => {
                if (this.errorDiv) this.errorDiv.style.display = "none";
            }, 5000);
        }
    }
}
