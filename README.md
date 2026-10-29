# HealthGuard — Early Health Risk Identification

A lightweight front-end prototype for the BUILDATHON 2.0 Healthcare & Well-being problem statement.

## Run the project
1. Download and extract `HealthGuard_Early_Health_Risk_Identification.zip`.
2. Open the extracted folder in Visual Studio Code.
3. Open `index.html`.
4. Recommended: install the **Live Server** extension in VS Code, right-click `index.html`, and choose **Open with Live Server**. You can also open `index.html` directly in a browser.
5. The app works without a backend and is usable offline after the files are available locally. Google Fonts are optional; the page uses fallback fonts if the internet is unavailable.

## Features
- Eight-question health habits, environment, age-group, and symptom check-in.
- Rules-based summary and practical, plain-language preventive guidance.
- Symptom-related prompts recommend professional assessment rather than diagnosis.
- Emergency guidance for serious warning signs (India: 112).
- No sign-in, external API, database, cookies, or network submission of answers.
- Responsive design, keyboard-accessible answer controls, skip-to-content link, live summary announcements, and print/save summary.
- Clear/reset form.

## Important limitations
- This is an educational prototype, not a medical device or clinically validated risk model.
- The visual indicator counts selected rules-based flags. It is **not** a probability of disease and must not be presented as one.
- It cannot diagnose or rule out a condition. It does not account for full medical history, family history, medicines, pregnancy, examination findings, or laboratory results.
- For real deployment, involve qualified healthcare professionals, conduct usability/accessibility and clinical validation, and complete appropriate privacy/security reviews.

## Technology
HTML5, CSS3, and vanilla JavaScript. No installation of Node.js or other packages is required.
