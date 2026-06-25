import { submitQuestionnaire } from "./api.js";

const trustQuestions = [
    { id: "t1", text: "The website appears trustworthy." },
    { id: "t2", text: "I feel confident using this website." },
    { id: "t3", text: "The website behaves honestly." },
    { id: "t4", text: "The website is transparent." },
    { id: "t5", text: "The website respected my choices." },
    { id: "t6", text: "I felt in control while using the website." }
];

const satisfactionQuestions = [
    { id: "s1", text: "I am satisfied with the experience." },
    { id: "s2", text: "The interface was easy to use." },
    { id: "s3", text: "I would use this website again." },
    { id: "s4", text: "Overall experience was positive." }
];

const likertOptions = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
];

function createQuestion(question) {

    const wrapper = document.createElement("div");
    wrapper.className = "question";

    wrapper.innerHTML = `
        <label class="question-label">
            ${question.text}
        </label>

        <div class="likert">

            ${likertOptions.map(option => `
                <label class="likert-option">
                    <input
                        type="radio"
                        name="${question.id}"
                        value="${option.value}">
                    <span>${option.label}</span>
                </label>
            `).join("")}

        </div>
    `;

    return wrapper;
}

function renderQuestions() {

    const trustContainer =
        document.getElementById("trustQuestions");

    const satisfactionContainer =
        document.getElementById("satisfactionQuestions");

    trustQuestions.forEach(question => {
        trustContainer.appendChild(
            createQuestion(question)
        );
    });

    satisfactionQuestions.forEach(question => {
        satisfactionContainer.appendChild(
            createQuestion(question)
        );
    });

    attachValidation();
}

function attachValidation() {

    const submitBtn =
        document.getElementById("submitBtn");

    document.addEventListener("change", () => {

        const allQuestions = [
            ...trustQuestions,
            ...satisfactionQuestions
        ];

        const allAnswered =
            allQuestions.every(question =>
                document.querySelector(
                    `input[name="${question.id}"]:checked`
                )
            );

        submitBtn.disabled = !allAnswered;
    });
}

document
    .getElementById("questionnaireForm")
    .addEventListener("submit", async (event) => {

        event.preventDefault();

        const participantId =
            localStorage.getItem("participantId");

        const payload = {
            participantId
        };

        [...trustQuestions, ...satisfactionQuestions]
            .forEach(question => {

                payload[question.id] = Number(
                    document.querySelector(
                        `input[name="${question.id}"]:checked`
                    ).value
                );
            });

        try {

            await submitQuestionnaire(payload);

            window.location.href =
                "thankyou.html";

        } catch (error) {

            console.error(error);

            alert(
                "Unable to submit questionnaire. Please try again."
            );
        }
    });

renderQuestions();