export function renderSubscriptionStep(state, updateState) {

    const container = document.getElementById("app");

    const isDark = localStorage.getItem("group") === "DARK";

    container.innerHTML = `
        <h2>Subscription</h2>

        <p>Choose your plan</p>

        <label>
            <input type="checkbox" id="premium"
                ${isDark ? "checked" : ""}>
            Premium Subscription
        </label>

        <br/><br/>

        <label>
            <input type="checkbox" id="marketing"
                ${isDark ? "checked" : ""}>
            Receive marketing emails
        </label>

        <br/><br/>

        <button id="nextBtn">Continue</button>

        <p style="font-size:12px; margin-top:10px;">
            ${
                isDark
                    ? "No thanks, I will stay with basic features"
                    : "You can change these options anytime"
            }
        </p>
    `;

    document.getElementById("nextBtn")
        .addEventListener("click", () => {

            updateState({
                ...state,

                premiumAccepted:
                    document.getElementById("premium").checked,

                marketingAccepted:
                    document.getElementById("marketing").checked
            });

            state.nextStep();
        });
}