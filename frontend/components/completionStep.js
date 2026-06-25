// frontend/components/completionStep.js

export function renderCompletionStep(state, updateState) {
    const container = document.getElementById("app");

    container.innerHTML = `
        <h2>Complete Registration</h2>

        <p>Review your subscription details before continuing.</p>

        <div id="summaryBox">
            <p><b>Selected Plan:</b> Premium Subscription</p>
            <p><b>Trial:</b> 30 Days Free</p>
            <p><b>Note:</b> Will continue automatically after trial unless cancelled</p>
        </div>

        <br/>

        <button id="continueBtn">Continue</button>

        <p id="smallOptOut" style="font-size:12px; margin-top:10px;">
            No thanks, I prefer limited features
        </p>
    `;

    document.getElementById("continueBtn").addEventListener("click", async () => {

        const completionTime = Date.now() - state.startTime;

        updateState({
            ...state,
            completionTime
        });

        await fetch("/submit/task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                participantId: state.participantId,
                group: state.group,
                premiumAccepted: state.premiumAccepted,
                marketingAccepted: state.marketingAccepted,
                analyticsAccepted: state.analyticsAccepted,
                privacySettingsOpened: state.privacySettingsOpened,
                completionTime
            })
        });

        window.location.href = "questionnaire.html";
    });
}