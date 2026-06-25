export function renderPremiumOfferStep(state, updateState) {

    const container = document.getElementById("app");

    const isDark = state.group === "DARK";

    if (isDark) {

        container.innerHTML = `
            <div style="text-align:right;">
                <span
                    id="skipBtn"
                    style="
                        cursor:pointer;
                        font-size:11px;
                        color:#777;
                    "
                >
                    Skip
                </span>
            </div>

            <h2 style="text-align:center;">
                Unlock Premium Features
            </h2>

            <div
                style="
                    text-align:center;
                    margin-top:30px;
                "
            >
                <p>✓ Enhanced experience</p>
                <p>✓ Faster access</p>
                <p>✓ Recommended by most users</p>

                <br/>

                <button
                    id="upgradeBtn"
                    style="
                        font-size:20px;
                        padding:15px 40px;
                    "
                >
                    UPGRADE NOW
                </button>
            </div>
        `;

    } else {

        container.innerHTML = `
            <h2>Upgrade to Premium?</h2>

            <p>
                Premium provides additional features.
            </p>

            <div
                style="
                    display:flex;
                    gap:20px;
                    margin-top:25px;
                "
            >
                <button id="upgradeBtn">
                    Upgrade to Premium
                </button>

                <button id="skipBtn">
                    Continue with Free Version
                </button>
            </div>
        `;
    }

    document
        .getElementById("upgradeBtn")
        .addEventListener("click", () => {

            updateState({
                ...state,
                premiumOfferAccepted: true
            });

            state.nextStep();
        });

    document
        .getElementById("skipBtn")
        .addEventListener("click", () => {

            updateState({
                ...state,
                premiumOfferAccepted: false
            });

            state.nextStep();
        });
}