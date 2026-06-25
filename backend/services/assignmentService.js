// backend/services/assignmentService.js

const {
    getControlCount,
    getDarkCount
} = require("./sheets");

const MAX = 25;

async function assignGroup() {
    const controlCount = await getControlCount();
    const darkCount = await getDarkCount();

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

module.exports = {
    assignGroup
};