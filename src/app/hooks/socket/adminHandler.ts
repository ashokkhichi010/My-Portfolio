export class AdminHandler {
  constructor({ setLeads, setActiveChat, appendLiveMessage, onIncomingLead }) {
    this.setLeads = setLeads;
    this.setActiveChat = setActiveChat;
    this.appendLiveMessage = appendLiveMessage;
    this.onIncomingLead = onIncomingLead;
  }

  setLeads;
  setActiveChat;
  appendLiveMessage;
  onIncomingLead;

  handleQueueSnapshot = (payload) => {
    this.setLeads(payload);
  };

  handleLeadUpdated = (payload) => {
    if (payload.status === 'HANDOVER_REQUESTED') {
      this.onIncomingLead?.(payload);
    }

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

  handleSocketError = () => undefined;
}
