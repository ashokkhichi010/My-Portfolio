export class Handler {
  constructor({ dispatch, actions }) {
    this.dispatch = dispatch;
    this.actions = actions;
  }

  handleConnect = (socket) => {
    this.dispatch(this.actions.setConnectionStatus('connected'));
    this.dispatch(this.actions.setSocketId(socket.id));
  };

  handleDisconnect = () => {
    this.dispatch(this.actions.resetConnection());
  };

  handleConnecting = () => {
    this.dispatch(this.actions.setConnectionStatus('connecting'));
  };

  handleConnectError = () => {
    this.dispatch(this.actions.setConnectionStatus('disconnected'));
  };

  handleSessionReady = (payload) => {
    this.dispatch(this.actions.setSessionReady(payload));
  };

  handleMessageCreated = (payload) => {
    this.dispatch(this.actions.addMessage(payload));
  };

  handleHandoverOffer = (payload) => {
    this.dispatch(this.actions.setHandoverOffer(true));
    this.dispatch(this.actions.setAdminAvailability(payload?.adminAvailable ?? true));
  };

  handleHandoverRequested = (payload) => {
    this.dispatch(this.actions.setHandoverRequested(payload));
  };

  handleAdminBusy = () => {
    this.dispatch(this.actions.setAdminBusy());
  };

  handleHandoverAccepted = () => {
    this.dispatch(this.actions.setHandoverAccepted());
  };

  handleHandoverFailed = (payload) => {
    this.dispatch(this.actions.setHandoverFailed(payload));
  };

  handleReturnToAi = (payload) => {
    this.dispatch(this.actions.setReturnedToAi(payload));
  };
}
