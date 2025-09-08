import {Form} from "./form.ts";
import {applyFormUrl, emailRegex} from "../constants.ts";

const form: Form = new Form({
    formId: "contact-form", errorDivId: "form-info", submitUrl: applyFormUrl, fieldValidations: {
        name: [(v) => v ? null : "Please enter your name."],
        email: [(v) => v ? null : "Please enter your email address.", (v) => emailRegex.test(v) ? null : "Please enter a valid email address."],
        "reason for contact": [(v) => v ? null : "Please select a reason for contacting us."],
        message: [(v) => v ? null : "Please enter your message."],
        "g-recaptcha-response": [(v) => v ? null : "Please complete the reCAPTCHA challenge."],
    }
});

function run(): void {
    form.run();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    run();
} else {
    document.addEventListener("DOMContentLoaded", run);
}
