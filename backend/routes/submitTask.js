// backend/routes/submitTask.js

const express = require("express");
const router = express.Router();

const {
    saveExperimentData
} = require("../services/sheets");

router.post("/", async (req, res) => {
    try {
        const {
            participantId,
            group,
            marketingAccepted,
            analyticsAccepted,
            premiumAccepted,
            privacySettingsOpened,
            completionTime
        } = req.body;

        const unwantedChoices =
            [marketingAccepted, analyticsAccepted, premiumAccepted]
                .filter(Boolean).length;

        await saveExperimentData({
            participantId,
            group,
            marketingAccepted,
            analyticsAccepted,
            premiumAccepted,
            privacySettingsOpened,
            completionTime,
            unwantedChoices
        });

        res.json({ success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Task submission failed" });
    }
});

module.exports = router;