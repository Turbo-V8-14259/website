import {emailRegex} from "../constants.ts";

export type ValidationFunction = (value: string) => string | null;

export function requiredFieldValidator(message: string): ValidationFunction {
    return function (value: string): string | null {
        console.log(value);
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
