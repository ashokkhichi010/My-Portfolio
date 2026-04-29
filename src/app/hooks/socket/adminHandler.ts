export class AdminHandler {
  constructor(setLeads) {
    this.setLeads = setLeads;
  }

  setLeads;

  handleQueueSnapshot = (payload) => {
    this.setLeads(payload);
  };

  handleLeadUpdated = (payload) => {
    this.setLeads((previous) => {
      const existingIndex = previous.findIndex((lead) => lead.sessionId === payload.sessionId);
      if (existingIndex >= 0) {
        const next = [...previous];
        next[existingIndex] = payload;
        return next;
      }

      return [payload, ...previous];
    });
  };
}
