 // backend/models/participant.js

/**
 * Participant model (logical structure, not DB ORM)
 */

class Participant {
    constructor(participantId, group) {
        this.participantId = participantId;
        this.group = group; // CONTROL or DARK
        this.assignedAt = new Date().toISOString();
        this.completed = false;
    }

    markCompleted() {
        this.completed = true;
        this.completedAt = new Date().toISOString();
    }
}

module.exports = Participant;