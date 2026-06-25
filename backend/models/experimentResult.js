 // backend/models/experimentResult.js

/**
 * Stores behavioral data from experiment interaction
 */

class ExperimentResult {
    constructor(data) {
        this.participantId = data.participantId;
        this.group = data.group;

        this.premiumAccepted = data.premiumAccepted || false;
        this.marketingAccepted = data.marketingAccepted || false;
        this.analyticsAccepted = data.analyticsAccepted || false;

        this.privacySettingsOpened = data.privacySettingsOpened || false;

        this.completionTime = data.completionTime || 0;

        this.createdAt = new Date().toISOString();
    }

    getUnwantedChoicesCount() {
        return [
            this.premiumAccepted,
            this.marketingAccepted,
            this.analyticsAccepted
        ].filter(Boolean).length;
    }
}

module.exports = ExperimentResult;