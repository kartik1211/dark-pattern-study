// frontend/components/summaryStep.js

export function renderSummaryStep(state, updateState) {
    const container = document.getElementById("app");

    const autoRenewText =
        state.group === "DARK"
            ? "Automatically renews at $9.99/month unless cancelled"
            : "Ends after 30-day free trial";

    const continueButtonStyle =
        state.group === "DARK"
            ? "font-size:18px; padding:12px 24px;"
            : "font-size:16px; padding:10px 20px;";

    const optOutText =
        state.group === "DARK"
            ? "No thanks, I prefer to miss out on premium benefits"
            : "No thanks";

    container.innerHTML = `
        <h2>Review Your Selection</h2>

        <div id="summaryBox">
            <p><b>Plan:</b> Premium Subscription</p>
            <p><b>Trial:</b> 30 Days Free</p>
            <p><b>Status:</b> ${autoRenewText}</p>

            <p>
                <b>Premium Offer Accepted:</b>
                ${state.premiumOfferAccepted ? "Yes" : "No"}
            </p>
        </div>

        <br/>

        <button id="continueBtn" style="${continueButtonStyle}">
            Continue
        </button>

        <p id="optOut" style="font-size:12px; margin-top:10px; cursor:pointer;">
            ${optOutText}
        </p>
    `;

    // MISDIRECTION: emphasize continue, de-emphasize opt-out
    document.getElementById("continueBtn").addEventListener("click", () => {

        updateState({
            ...state,
            summaryConfirmed: true
        });

        state.nextStep();
    });

    document.getElementById("optOut").addEventListener("click", () => {

        updateState({
            ...state,
            summaryConfirmed: false
        });

        state.nextStep();
    });
}