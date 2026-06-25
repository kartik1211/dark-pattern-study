import { submitTask } from "./api.js";
import { renderAccountStep } from "../components/accountStep.js";
import { renderSubscriptionStep } from "../components/subscriptionStep.js";
import { renderPrivacyStep } from "../components/privacyStep.js";
import { renderSummaryStep } from "../components/summaryStep.js";
import { renderPremiumOfferStep } from "../components/premiumOfferStep.js";

let state = {
    step: 0,
    participantId: localStorage.getItem("participantId"),
    group: localStorage.getItem("group"),
    startTime: Number(localStorage.getItem("startTime")) || Date.now(),

    marketingAccepted: false,
    analyticsAccepted: false,
    premiumAccepted: false,

    dataSharingAccepted: false,
    personalizationAccepted: false,
    trackingAccepted: false,
    adsAccepted: false,

    privacySettingsOpened: false,
    premiumOfferAccepted: false
};

const steps = [
    renderAccountStep,
    renderSubscriptionStep,
    renderPrivacyStep,
    renderPremiumOfferStep,
    renderSummaryStep
];

function nextStep() {

    state.step++;

    if (state.step < steps.length) {
        renderCurrentStep();
    } else {
        completeExperiment();
    }
}

function updateState(newState) {
    state = newState;
}

function renderCurrentStep() {

    const stepFn = steps[state.step];

    stepFn(
        {
            ...state,
            nextStep
        },
        updateState
    );
}

async function completeExperiment() {

    const completionTime =
        Date.now() - state.startTime;

    try {

        await submitTask({
            participantId: state.participantId,
            group: state.group,

            marketingAccepted: state.marketingAccepted,
            analyticsAccepted: state.analyticsAccepted,
            premiumAccepted: state.premiumAccepted,

            dataSharingAccepted: state.dataSharingAccepted,
            personalizationAccepted: state.personalizationAccepted,
            trackingAccepted: state.trackingAccepted,
            adsAccepted: state.adsAccepted,

            privacySettingsOpened: state.privacySettingsOpened,

            completionTime
        });

        window.location.href = "questionnaire.html";

    } catch (err) {

        console.error(err);
        alert("Submission failed");
    }
}

renderCurrentStep();