require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();

// if (process.env.GOOGLE_CREDENTIALS) {

//     const credentialsPath =
//         path.join(__dirname, "credentials.json");

//     fs.writeFileSync(
//         credentialsPath,
//         process.env.GOOGLE_CREDENTIALS
//     );
// }

const assignRoute = require("./routes/assign");
const submitTaskRoute = require("./routes/submitTask");
const submitQuestionnaireRoute = require("./routes/submitQuestionnaire");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use("/assign", assignRoute);
app.use("/submit/task", submitTaskRoute);
app.use("/submit/questionnaire", submitQuestionnaireRoute);

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/consent.html")
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});