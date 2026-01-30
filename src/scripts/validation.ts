import {emailRegex} from "../constants.ts";

export type ValidationFunction = (value: string) => string | null;

export function requiredFieldValidator(message: string): ValidationFunction {
    return function (value: string): string | null {
        if (value) {
            return null;
        } else {
            return message;
        }
    };
}

export function emailFieldValidator(message = "Please enter a valid email address."): ValidationFunction {
    return function (value: string): string | null {
        if (emailRegex.test(value)) {
            return null;
        } else {
            return message;
        }
    };
}

export function atLeastOneSelectedValidator(fieldsetName: string, message = "Please select at least one option."): ValidationFunction {
    return function (): string | null {
        // Find all checkbox/radio inputs inside the named fieldset
        const fieldset = document.querySelector(`fieldset[name="${fieldsetName}"]`);
        if (!fieldset) return null; // if not found, don't block form

        const inputs = fieldset.querySelectorAll<HTMLInputElement>("input[type=\"checkbox\"], input[type=\"radio\"]");
        const isChecked = Array.from(inputs).some(input => input.checked);

        return isChecked ? null : message;
    };
}