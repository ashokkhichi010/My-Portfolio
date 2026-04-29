import { io } from 'socket.io-client';
import config from '../../config/config';

class SocketService {
  socket = null;

  connect({ sessionId, deviceInfo, handler }) {
    if (this.socket) {
      return this.socket;
    }

    handler.handleConnecting();

    this.socket = io(config.socketUrl, {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        sessionId: sessionId ?? undefined,
        deviceInfo,
      },
    });

    this.socket.on('connect', () => handler.handleConnect(this.socket));
    this.socket.on('disconnect', handler.handleDisconnect);
    this.socket.on('connect_error', handler.handleConnectError);
    this.socket.on('chat:session.ready', handler.handleSessionReady);
    this.socket.on('chat:message.created', handler.handleMessageCreated);
    this.socket.on('AI_OFFER_HANDOVER', handler.handleHandoverOffer);

    return this.socket;
  }

  sendMessage(content) {
    this.socket?.emit('chat:message.send', { content });
  }

  disconnect() {
    if (!this.socket) {
      return;
    }

    this.socket.removeAllListeners();
    this.socket.disconnect();
    this.socket = null;
  }
}

const socketService = new SocketService();

export default socketService;
