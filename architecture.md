# Architecture – Dark Pattern Study (HCI Experiment)

## Overview

This system is a web-based experimental platform designed to run a controlled A/B study on dark patterns in user interfaces.

It consists of:
- Frontend (static web pages)
- Backend (Node.js + Express API)
- Data Storage (Google Sheets)

---

## High-Level Architecture

Participant
    ↓
Frontend (HTML/CSS/JS)
    ↓
REST API (Node.js + Express)
    ↓
Google Sheets API
    ↓
Google Sheets (Data Storage)

---

## System Components

### 1. Frontend Layer

The frontend is a multi-page static web application.

Pages:
- consent.html → consent collection
- experiment.html → main interaction (control vs dark UI)
- questionnaire.html → trust and satisfaction survey
- debrief.html → explains experiment after completion
- thankyou.html → final exit page

Technologies:
- HTML
- CSS
- Vanilla JavaScript

Responsibilities:
- Render UI based on assigned group
- Capture user interactions
- Send data to backend APIs
- Store participantId in memory (localStorage)

---

### 2. Backend Layer

Built using Node.js and Express.

Main responsibilities:
- Assign participants to groups
- Store experiment data
- Store questionnaire responses
- Communicate with Google Sheets API

Modules:

#### server.js
- Entry point
- Registers routes
- Starts Express server

#### routes/assign.js
- Assigns participant ID
- Assigns CONTROL or DARK group
- Enforces 25-25 quota logic

#### routes/submitTask.js
- Receives experiment interaction data
- Stores behavioral metrics

#### routes/submitQuestionnaire.js
- Stores Likert-scale responses

---

### 3. Services Layer

#### assignmentService.js
- Implements group assignment logic
- Ensures balanced distribution:
  - 25 Control
  - 25 Dark Pattern

#### sheets.js
- Handles all Google Sheets API operations
- Functions:
  - saveAssignment()
  - saveExperimentData()
  - saveQuestionnaire()
  - getControlCount()
  - getDarkCount()

---

### 4. Data Storage Layer

Google Sheets is used instead of a database.

Reason:
- Lightweight setup
- Easy export to CSV
- Suitable for small sample size (n=50)

Sheets Structure:

#### Assignments Sheet
participantId | group | timestamp

#### ExperimentData Sheet
participantId | group | premiumAccepted | marketingAccepted | analyticsAccepted | privacyOpened | completionTime

#### Questionnaire Sheet
participantId | T1 | T2 | T3 | T4 | T5 | T6 | S1 | S2 | S3 | S4

---

## Data Flow

### Step 1: Participant Entry
- User opens consent page
- Accepts consent

### Step 2: Group Assignment
- Frontend calls:
  GET /assign
- Backend returns:
  participantId + group

### Step 3: Experiment Interaction
- User interacts with UI (control or dark version)
- Data captured:
  - selections
  - clicks
  - time spent

### Step 4: Data Submission
- POST /submit/task
- Data stored in Google Sheets

### Step 5: Questionnaire
- User submits Likert responses
- POST /submit/questionnaire

### Step 6: Debrief
- User informed about experiment purpose

---

## Dark Pattern Implementation Mapping

| Pattern | Implementation |
|----------|----------------|
| Preselection | Default checked checkboxes |
| Confirm-shaming | Guilt-based opt-out text |
| Hidden costs | Price shown late in flow |
| Forced continuity | Auto-renewal message in summary |
| Obstruction | Settings hidden behind extra click |
| Misdirection | Visual emphasis on "Continue" |

---

## API Design

### GET /assign
Returns participant assignment.

Response:
{
  participantId,
  group
}

---

### POST /submit/task
Stores behavioral experiment data.

---

### POST /submit/questionnaire
Stores survey responses.

---

## Security Considerations

- No authentication required (academic study)
- No real payments processed
- No sensitive personal data collected
- Credentials stored securely in backend only

---

## Scalability

Designed for:
- Considering first 50 participants

Not intended for:
- Production-scale traffic
- Real commercial deployment

---

## Deployment Architecture

Frontend:
- Can be hosted on Vercel / Netlify

Backend:
- Can be hosted on Render / Railway

Database:
- Google Sheets (via API)

---

## Limitations

- No persistent database transactions
- No real-time analytics dashboard
- No user authentication system
- Dependent on Google Sheets API limits

---

## Summary

This architecture provides a lightweight, scalable, and ethical experimental platform for studying the behavioral impact of dark patterns in user interfaces using a controlled A/B testing methodology.