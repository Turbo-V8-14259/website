import {applyFormUrl} from "../constants.ts";
import {FormHandler} from "./form-handler.ts";
import {atLeastOneSelectedValidator, emailFieldValidator, requiredFieldValidator} from "./validation.ts";



const form = new FormHandler({
    formId: "application-form",
    errorDivId: "form-info",
    submitUrl: applyFormUrl,
    fieldValidations: {
        "firstName": [requiredFieldValidator("Please enter your first name.")],
        "lastName": [requiredFieldValidator("Please enter your last name.")],
        "email": [requiredFieldValidator("Please enter your email address."), emailFieldValidator()],
        "phone": [],
        "parentEmail": [requiredFieldValidator("Please enter your parent/guardian's email address."), emailFieldValidator("Please enter a valid email address for your parent or guardian.")],
        "city": [requiredFieldValidator("Please enter your city.")],
        "grade": [requiredFieldValidator("Please select your current grade.")],
        "school": [],
        "interests": [atLeastOneSelectedValidator("interests", "Please select at least one area of interest.")],
        "availability": [requiredFieldValidator("Please answer your availability.")],
        "experience": [requiredFieldValidator("Please describe your experience with robotics.")],
        "motivation": [requiredFieldValidator("Please tell us about your interests outside robotics.")],
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