 // backend/models/questionnaireResult.js

/**
 * Stores Likert-scale questionnaire responses
 */

class QuestionnaireResult {
    constructor(data) {
        this.participantId = data.participantId;

        // Trust (T1–T6)
        this.t1 = Number(data.t1);
        this.t2 = Number(data.t2);
        this.t3 = Number(data.t3);
        this.t4 = Number(data.t4);
        this.t5 = Number(data.t5);
        this.t6 = Number(data.t6);

        // Satisfaction (S1–S4)
        this.s1 = Number(data.s1);
        this.s2 = Number(data.s2);
        this.s3 = Number(data.s3);
        this.s4 = Number(data.s4);

        this.createdAt = new Date().toISOString();
    }

    getTrustScore() {
        return (this.t1 + this.t2 + this.t3 + this.t4 + this.t5 + this.t6) / 6;
    }

    getSatisfactionScore() {
        return (this.s1 + this.s2 + this.s3 + this.s4) / 4;
    }
}

module.exports = QuestionnaireResult;