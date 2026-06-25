export function renderAccountStep(state, updateState) {

    const container = document.getElementById("app");

    const isDark = state.group === "DARK";

    container.innerHTML = `
        <h2>Create Account</h2>

        <div class="form-row">
            <label for="email">Email:</label>
            <input type="email" id="email" />
        </div>

        <div class="form-row">
            <label for="password">Password:</label>
            <input type="password" id="password" />
        </div>

        <br/><br/>

        <label>
            <input
                type="checkbox"
                id="marketing"
                ${isDark ? "checked" : ""}
            />
            Receive marketing emails
        </label>

        <br/>

        <label>
            <input
                type="checkbox"
                id="analytics"
                ${isDark ? "checked" : ""}
            />
            Share usage analytics
        </label>

        <br/><br/>

        <button id="nextBtn">Continue</button>
    `;

    document.getElementById("nextBtn").addEventListener("click", () => {

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const marketing =
            document.getElementById("marketing").checked;

        const analytics =
            document.getElementById("analytics").checked;

        updateState({
            ...state,
            email,
            password,
            marketingAccepted: marketing,
            analyticsAccepted: analytics
        });

        state.nextStep();
    });
}