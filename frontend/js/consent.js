document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("agreeBtn");
    const BASE_URL = "";

    btn.addEventListener("click", async () => {

        try {
            const res = await fetch(`${BASE_URL}/assign`);
            const data = await res.json();

            if (!data.group || !data.participantId) {
                throw new Error("Invalid response");
            }

            // store assignment
            localStorage.setItem("group", data.group);
            localStorage.setItem("participantId", data.participantId);
            localStorage.setItem("startTime", Date.now());

            console.log("Assigned:", data.group);

            window.location.href = "experiment.html";

        } catch (err) {
            console.error(err);
            alert("Failed to start experiment");
        }
    });
});