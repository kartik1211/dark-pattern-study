// backend/services/sheets.js

const { google } = require("googleapis");
const path = require("path");

const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const spreadsheetId = process.env.SPREADSHEET_ID;

async function getClient() {
    const client = await auth.getClient();
    return google.sheets({ version: "v4", auth: client });
}

/* ---------------- ASSIGNMENT ---------------- */

async function saveAssignment(participantId, group) {
    const sheets = await getClient();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Assignments!A:C",
        valueInputOption: "RAW",
        requestBody: {
            values: [[
                participantId,
                group,
                new Date().toISOString()
            ]]
        }
    });
}

async function getControlCount() {
    const sheets = await getClient();

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Assignments!B:B"
    });

    const rows = res.data.values || [];
    return rows.filter(r => r[0] === "CONTROL").length;
}

async function getDarkCount() {
    const sheets = await getClient();

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: "Assignments!B:B"
    });

    const rows = res.data.values || [];
    return rows.filter(r => r[0] === "DARK").length;
}

/* ---------------- EXPERIMENT DATA ---------------- */

async function saveExperimentData(data) {
    const sheets = await getClient();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "ExperimentData!A:H",
        valueInputOption: "RAW",
        requestBody: {
            values: [[
                data.participantId,
                data.group,
                data.premiumAccepted,
                data.marketingAccepted,
                data.analyticsAccepted,
                data.privacySettingsOpened,
                data.completionTime,
                data.unwantedChoices
            ]]
        }
    });
}

/* ---------------- QUESTIONNAIRE ---------------- */

async function saveQuestionnaire(data) {
    const sheets = await getClient();

    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: "Questionnaire!A:L",
        valueInputOption: "RAW",
        requestBody: {
            values: [[
                data.participantId,

                data.t1, data.t2, data.t3, data.t4, data.t5, data.t6,
                data.s1, data.s2, data.s3, data.s4,

                data.trustScore,
                data.satisfactionScore
            ]]
        }
    });
}

module.exports = {
    saveAssignment,
    getControlCount,
    getDarkCount,
    saveExperimentData,
    saveQuestionnaire
};