// backend/routes/submitQuestionnaire.js

const express = require("express");
const router = express.Router();

const {
    saveQuestionnaire
} = require("../services/sheets");

router.post("/", async (req, res) => {
    try {
        const {
            participantId,
            t1, t2, t3, t4, t5, t6,
            s1, s2, s3, s4
        } = req.body;

        const trustScore =
            (Number(t1) + Number(t2) + Number(t3) +
             Number(t4) + Number(t5) + Number(t6)) / 6;

        const satisfactionScore =
            (Number(s1) + Number(s2) + Number(s3) + Number(s4)) / 4;

        await saveQuestionnaire({
            participantId,
            t1, t2, t3, t4, t5, t6,
            s1, s2, s3, s4,
            trustScore,
            satisfactionScore
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Questionnaire submission failed" });
    }
});

module.exports = router;