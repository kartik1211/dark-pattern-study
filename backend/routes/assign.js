// backend/routes/assign.js

const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

const {
    getControlCount,
    getDarkCount,
    saveAssignment
} = require("../services/sheets");

async function assignGroup() {
    const controlCount = await getControlCount();
    const darkCount = await getDarkCount();

    const MAX = 25;

    if (controlCount >= MAX && darkCount >= MAX) {
        return "FULL";
    }

    if (controlCount >= MAX) {
        return "DARK";
    }

    if (darkCount >= MAX) {
        return "CONTROL";
    }

    return Math.random() < 0.5 ? "CONTROL" : "DARK";
}

router.get("/", async (req, res) => {
    try {
        const participantId = uuid();
        const group = await assignGroup();

        if (group === "FULL") {
            return res.status(403).json({
                error: "Study has reached the maximum number of participants."
            });
        }

        await saveAssignment(participantId, group);

        res.json({
            participantId,
            group
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Assignment failed" });
    }
});

module.exports = router;