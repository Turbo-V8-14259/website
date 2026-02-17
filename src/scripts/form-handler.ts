import type {ValidationFunction} from "./validation";
import {MessageHandler} from "./messages";

export interface FormHandlerOptions {
    formId: string;
    errorDivId: string;
    submitUrl: string;
    fieldValidations: Record<string, ValidationFunction[]>;
}

interface FormspreeResponse {
    message: string;
}

interface Grecaptcha {
    reset(): void;

    getResponse(): string;
}

declare const grecaptcha: Grecaptcha;

export class FormHandler {
    private readonly form: HTMLFormElement | null;
    private messages: MessageHandler;
    private options: FormHandlerOptions;

    constructor(options: FormHandlerOptions) {
        this.options = options;
        this.form = document.getElementById(options.formId) as HTMLFormElement | null;

        this.messages = new MessageHandler(options.errorDivId);
    }

    public run(): void {
        if (!this.form) return;

        this.form.addEventListener("submit", (event: SubmitEvent): void => {
            void this.handleSubmit(event);
        });
    }

    private getInputValue(selector: string): string {
        if (!this.form) return "";

        // Only select input, textarea, or select elements
        const elements: NodeListOf<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> = this.form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
            `${selector}:is(input, textarea, select)`
        );

        if (!elements || elements.length === 0) return "";

        const first: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement = elements[0];

        // Handle checkbox or radio group
        if (first instanceof HTMLInputElement && (first.type === "checkbox" || first.type === "radio")) {
            return Array.from(elements)
                .filter((el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => el instanceof HTMLInputElement && el.checked)
                .map((el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => (el as HTMLInputElement).value)
                .join(", ");
        }

        // Handle single value fields (input, textarea, select)
        return first.value.trim();
    }

    private validate(): boolean {
        const entries: [string, ValidationFunction[]][] = Object.entries(this.options.fieldValidations);

        for (let i: number = 0; i < entries.length; i++) {
            const [fieldName, rules] = entries[i];
            const value: string = this.getInputValue(`[name="${fieldName}"]`);

            for (let j: number = 0; j < rules.length; j++) {
                const errorMsg: string | null = rules[j](value);
                if (errorMsg) {
                    this.messages.showError(errorMsg);
                    return false;
                }
            }
        }
        return true;
    }

    private async handleSubmit(event: Event): Promise<void> {

        event.preventDefault();
        if (!this.form) return;

        this.messages.hide();

        if (!this.validate()) return;

        this.messages.showSuccess("Sending...");

        const formDataObj: Record<string, FormDataEntryValue> = {};
        const formData = new FormData(this.form);
        const processedFields = new Set<string>();

        // First pass: identify all checkbox fields
        const checkboxFields = new Set<string>();
        for (const [key] of formData.entries()) {
            // Query specifically for input elements to avoid matching fieldsets or other elements
            const element = this.form.querySelector(`input[name="${key}"]`);
            if (element instanceof HTMLInputElement && element.type === "checkbox") {
                checkboxFields.add(key);
            }
        }

        // Second pass: process all fields
        for (const [key, value] of formData.entries()) {
            if (processedFields.has(key)) continue;

            // Check if this is a checkbox field
            if (checkboxFields.has(key)) {
                // Use getInputValue to get comma-separated list of all checked values
                formDataObj[key] = this.getInputValue(`[name="${key}"]`);
                processedFields.add(key);
            } else {
                formDataObj[key] = value;
            }
        }

        await this.sendFormData(formDataObj);
    }

    private async sendFormData(formDataObj: Record<string, FormDataEntryValue>): Promise<void> {
        try {
            const response: Response = await fetch(this.options.submitUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json", Accept: "application/json"},
                body: JSON.stringify(formDataObj),
            });

            const result: FormspreeResponse = (await response.json()) as FormspreeResponse;

            if (response.ok) {
                this.messages.showSuccess("Success! Your message has been sent.");
            } else {
                console.error("Error response:", result);
                this.messages.showError("There was a problem submitting the form.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Fetch error:", error.message);
            } else {
                console.error("Fetch error:", error);
            }
            this.messages.showError("A network error occurred.");
        } finally {
            this.form!.reset();
            if (typeof grecaptcha !== "undefined") {
                grecaptcha.reset();
            }
            this.hideMessagesLater();
        }
    }

    private hideMessagesLater(time: number = 5000): void {
        setTimeout((): void => {
            this.messages.hide();
        }, time);
    }
}
