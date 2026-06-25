# Dark Pattern Study – HCI Experiment

## Overview

This project is a web-based controlled experiment designed to study the influence of dark patterns on user decision-making, trust, and satisfaction in digital interfaces.

Participants are randomly assigned to one of two groups:
- Control Group: Transparent interface
- Experimental Group: Interface containing dark patterns

All participant responses are stored in Google Sheets for later statistical analysis.

---

## Research Objective

To investigate how dark patterns influence:
- User decision-making behavior
- Perceived trust in digital systems
- User satisfaction with digital interfaces

---

## Experimental Design

### Groups
- Control Group (Transparent UI)
- Experimental Group (Dark Pattern UI)

### Sample Size
- Total participants: 50
- Control: 25 participants
- Experimental: 25 participants

### Dark Patterns Implemented
- Preselection
- Confirm-shaming
- Hidden costs
- Forced continuity
- Obstruction
- Misdirection

---

## Project Structure

dark-pattern-study/

frontend/
- consent.html
- experiment.html
- questionnaire.html
- debrief.html
- thankyou.html
- js/
  - consent.js
  - experiment.js
  - questionnaire.js

backend/
- server.js
- routes/
  - assign.js
  - submitTask.js
  - submitQuestionnaire.js
- services/
  - assignmentService.js
  - sheets.js
- credentials.json
- .env

---

## Setup Instructions

### 1. Install Dependencies

npm install express cors uuid googleapis dotenv

---

### 2. Google Sheets Setup

- Create a project in Google Cloud Console
- Enable Google Sheets API
- Create a Service Account
- Download credentials.json
- Share Google Sheet with service account email

---

### 3. Environment Variables

Create a .env file:

SPREADSHEET_ID=your_google_sheet_id
PORT=3000

---

### 4. Run Backend Server

node server.js

Server runs at:
http://localhost:3000

---

## Frontend Flow

The user flow is:

Consent → Experiment → Questionnaire → Thank You → Debrief

---

## API Endpoints

### Assign Participant Group

GET /assign

Response:
{
  "participantId": "uuid",
  "group": "CONTROL or DARK"
}

---

### Submit Experiment Data

POST /submit/task

Stores:
- participantId
- group
- premiumAccepted
- marketingAccepted
- analyticsAccepted
- privacySettingsOpened
- completionTime

---

### Submit Questionnaire

POST /submit/questionnaire

Stores Likert scale responses:
- T1 to T6 (Trust questions)
- S1 to S4 (Satisfaction questions)

---

## Google Sheets Structure

### Assignments Sheet
participantId | group | timestamp

### ExperimentData Sheet
participantId | group | premiumAccepted | marketingAccepted | analyticsAccepted | privacyOpened | completionTime

### Questionnaire Sheet
participantId | T1 | T2 | T3 | T4 | T5 | T6 | S1 | S2 | S3 | S4

---

## Data Analysis

### Trust Score
Average of T1 to T6

### Satisfaction Score
Average of S1 to S4

### Unwanted Choices Score
Sum of:
- Premium acceptance
- Marketing acceptance
- Analytics acceptance

---

## Statistical Tests

- Independent samples t-test
- Significance level: p < 0.05

Compare:
- Control vs Experimental groups

---

## Ethics Statement

This study uses a simulated interface.
No real payments or subscriptions occur.
Participants are debriefed after completing the study.

---

## Notes

- Participant assignment is randomized but constrained to 25 per group
- Google Sheets is used instead of a database
- The system is designed for small-scale academic HCI experiments