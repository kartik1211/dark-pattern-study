// backend/services/participantService.js

class ParticipantService {
    constructor() {
        this.activeParticipants = new Map();
    }

    createParticipant(participantId, group) {
        const participant = {
            participantId,
            group,
            assignedAt: new Date().toISOString(),
            completed: false
        };

        this.activeParticipants.set(participantId, participant);

        return participant;
    }

    markCompleted(participantId) {
        const participant = this.activeParticipants.get(participantId);

        if (participant) {
            participant.completed = true;
            participant.completedAt = new Date().toISOString();
        }
    }

    getParticipant(participantId) {
        return this.activeParticipants.get(participantId);
    }
}

module.exports = new ParticipantService();