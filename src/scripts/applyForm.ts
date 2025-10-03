import {applyFormUrl} from "../constants.ts";
import {FormHandler} from "./form-handler.ts";
import {emailFieldValidator, requiredFieldValidator} from "./validation.ts";

const form = new FormHandler({
    formId: "application-form",
    errorDivId: "form-info",
    submitUrl: applyFormUrl,
    fieldValidations: {
        "firstName": [requiredFieldValidator("Please enter your name.")],
        "email": [requiredFieldValidator("Please enter your email address."), emailFieldValidator()],
        "reason for contact": [requiredFieldValidator("Please select a reason for contacting us.")],
        "message": [requiredFieldValidator("Please enter your message.")],
        "g-recaptcha-response": [requiredFieldValidator("Please complete the reCAPTCHA challenge.")],
    },
});


function run(): void {
    form.run();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    run();
} else {
    document.addEventListener("DOMContentLoaded", run);
}
