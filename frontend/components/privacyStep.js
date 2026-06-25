export function renderPrivacyStep(state, updateState) {

    const container = document.getElementById("app");

    const isDark = state.group === "DARK";

    container.innerHTML = `
        <h2>Privacy Settings</h2>

        <p>Manage how your data is used.</p>

        <div id="privacyBox">

            <label>
                <input
                    type="checkbox"
                    id="dataSharing"
                    ${isDark ? "checked" : ""}
                />
                Share usage data for product improvement
            </label>

            <br/><br/>

            <label>
                <input
                    type="checkbox"
                    id="personalization"
                    ${isDark ? "checked" : ""}
                />
                Enable personalized recommendations
            </label>

            <br/><br/>

            <div
                id="advancedToggle"
                style="cursor:pointer; color:blue;"
            >
                Advanced settings ▶
            </div>

            <div
                id="advancedPanel"
                style="display:none; margin-top:10px;"
            >

                <label>
                    <input
                        type="checkbox"
                        id="tracking"
                        ${isDark ? "checked" : ""}
                    />
                    Allow behavioral tracking
                </label>

                <br/><br/>

                <label>
                    <input
                        type="checkbox"
                        id="ads"
                        ${isDark ? "checked" : ""}
                    />
                    Personalized ads
                </label>

            </div>

        </div>

        <br/>

        <button id="nextBtn">
            Continue
        </button>

        <p
            id="optOutText"
            style="
                font-size:12px;
                margin-top:10px;
                ${isDark ? "color:#888;" : ""}
            "
        >
            ${
                isDark
                    ? "No thanks, I prefer to keep my experience basic"
                    : "You may disable any options you do not want."
            }
        </p>
    `;

    document
        .getElementById("advancedToggle")
        .addEventListener("click", () => {

            const panel =
                document.getElementById("advancedPanel");

            panel.style.display =
                panel.style.display === "none"
                    ? "block"
                    : "none";

            updateState({
                ...state,
                privacySettingsOpened: true
            });
        });

    document
        .getElementById("nextBtn")
        .addEventListener("click", () => {

            const dataSharing =
                document.getElementById("dataSharing").checked;

            const personalization =
                document.getElementById("personalization").checked;

            const tracking =
                document.getElementById("tracking").checked;

            const ads =
                document.getElementById("ads").checked;

            updateState({
                ...state,

                analyticsAccepted: dataSharing,

                dataSharingAccepted: dataSharing,

                personalizationAccepted: personalization,

                trackingAccepted: tracking,

                adsAccepted: ads
            });

            state.nextStep();
        });
}