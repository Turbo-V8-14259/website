import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const name = formData.get("name");
    const token = formData.get("g-recaptcha-response");

    if (typeof token !== "string" || !token) {
        return new Response("Missing reCAPTCHA token", { status: 400 });
    }

    // Your Google Cloud project ID
    const projectId = import.meta.env.RECAPTCHA_PROJECT_ID;
    // Your reCAPTCHA Enterprise API key
    const apiKey = import.meta.env.RECAPTCHA_API_KEY;
    // Your site key registered in reCAPTCHA Enterprise
    const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;

    // Build the request body per Enterprise API
    const body = {
        event: {
            token,
            siteKey,
            // optional: if you have an action string from frontend execute() call, include it here
            // expectedAction: "submit_form",
        },
    };

    // Call reCAPTCHA Enterprise assess API
    const verifyResponse = await fetch(
        `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }
    );

    if (!verifyResponse.ok) {
        const errorText = await verifyResponse.text();
        console.error("reCAPTCHA Enterprise API error:", errorText);
        return new Response("Failed to verify reCAPTCHA", { status: 500 });
    }

    const result = await verifyResponse.json();

    // Inspect the result for token validity and risk score
    if (!result.tokenProperties || !result.tokenProperties.valid) {
        console.error("Invalid token:", result.tokenProperties?.invalidReason);
        return new Response("Invalid reCAPTCHA token", { status: 400 });
    }

    // You can check risk score threshold (0.0 = likely bot, 1.0 = likely good)
    const score = result.riskAnalysis?.score ?? 0;
    console.log(`reCAPTCHA score: ${score}`);
    const minimumScore = 0.5; // adjust this threshold based on your needs

    if (score < minimumScore) {
        console.warn(`Low reCAPTCHA score: ${score}`);
        return new Response("Low reCAPTCHA score, suspicious interaction", {
            status: 400,
        });
    }

    // Passed verification, proceed with form submission
    return new Response(`Thanks, ${name}! Your form was submitted successfully.`, {
        status: 200,
    });
};
