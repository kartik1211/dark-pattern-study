// frontend/js/api.js

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "";
export async function assignParticipant() {
    const res = await fetch(`${BASE_URL}/assign`);
    if (!res.ok) throw new Error("Failed to assign participant");
    return await res.json();
}

export async function submitTask(payload) {
    const res = await fetch(`${BASE_URL}/submit/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to submit task");
    return await res.json();
}

export async function submitQuestionnaire(payload) {
    const res = await fetch(`${BASE_URL}/submit/questionnaire`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Failed to submit questionnaire");
    return await res.json();
}