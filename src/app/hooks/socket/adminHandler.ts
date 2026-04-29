export class AdminHandler {
  constructor({ setLeads, setActiveChat, appendLiveMessage }) {
    this.setLeads = setLeads;
    this.setActiveChat = setActiveChat;
    this.appendLiveMessage = appendLiveMessage;
  }

  setLeads;
  setActiveChat;
  appendLiveMessage;

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

  handleHandoverAccepted = (payload) => {
    this.setActiveChat({
      sessionId: payload.sessionId,
      status: payload.status,
      visitorName: payload.visitorName,
      visitorEmail: payload.visitorEmail,
      messages: payload.messages,
    });
  };

  handleMessageCreated = (payload) => {
    this.appendLiveMessage(payload);
  };
}
