// backend/utils/validators.js

const { LIKERT_SCALE } = require("./constants");

/**
 * Validate participant ID
 */
function isValidParticipantId(id) {
    return typeof id === "string" && id.length > 0;
}

/**
 * Validate group value
 */
function isValidGroup(group) {
    return ["CONTROL", "DARK"].includes(group);
}

/**
 * Validate Likert scale input (1–5)
 */
function isValidLikert(value) {
    const num = Number(value);
    return (
        !isNaN(num) &&
        num >= LIKERT_SCALE.MIN &&
        num <= LIKERT_SCALE.MAX
    );
}

/**
 * Validate questionnaire payload
 */
function validateQuestionnaire(data) {
    const requiredFields = [
        "participantId",
        "t1", "t2", "t3", "t4", "t5", "t6",
        "s1", "s2", "s3", "s4"
    ];

    for (const field of requiredFields) {
        if (data[field] === undefined || data[field] === null) {
            return false;
        }
    }

    // validate Likert values
    const likertFields = [
        "t1", "t2", "t3", "t4", "t5", "t6",
        "s1", "s2", "s3", "s4"
    ];

    for (const field of likertFields) {
        if (!isValidLikert(data[field])) {
            return false;
        }
    }

    return true;
}

module.exports = {
    isValidParticipantId,
    isValidGroup,
    isValidLikert,
    validateQuestionnaire
};