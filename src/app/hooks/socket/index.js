import { io } from 'socket.io-client';
import config from '../../config/config';

class SocketService {
  socket = null;

  connect({ sessionId, deviceInfo, handler, fcmToken }) {
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
        fcmToken,
      },
    });

    this.socket.on('connect', () => handler.handleConnect(this.socket));
    this.socket.on('disconnect', handler.handleDisconnect);
    this.socket.on('connect_error', handler.handleConnectError);
    this.socket.on('chat:session.ready', handler.handleSessionReady);
    this.socket.on('chat:message.created', handler.handleMessageCreated);
    this.socket.on('AI_OFFER_HANDOVER', handler.handleHandoverOffer);
    this.socket.on('handover:requested', handler.handleHandoverRequested);
    this.socket.on('ADMIN_BUSY', handler.handleAdminBusy);
    this.socket.on('handover:accepted', handler.handleHandoverAccepted);
    this.socket.on('HANDOVER_FAILED', handler.handleHandoverFailed);
    this.socket.on('handover:return-to-ai', handler.handleReturnToAi);

    return this.socket;
  }

  sendMessage(content) {
    this.socket?.emit('chat:message.send', { content });
  }

  requestHandover(firebaseToken) {
    this.socket?.emit('request_handover', { firebaseToken });
  }

  connectAdmin({ handler, token, deviceInfo, fcmToken }) {
    if (this.socket) {
      return this.socket;
    }

    this.socket = io(config.socketUrl, {
      transports: ['websocket'],
      autoConnect: true,
      auth: {
        role: 'admin',
        token,
        deviceInfo,
        fcmToken,
      },
    });

    this.socket.on('admin:queue.snapshot', handler.handleQueueSnapshot);
    this.socket.on('admin:lead.updated', handler.handleLeadUpdated);
    this.socket.on('admin:handover.accepted', handler.handleHandoverAccepted);
    this.socket.on('handover:return-to-ai', handler.handleReturnToAi);
    this.socket.on('chat:message.created', handler.handleMessageCreated);
    this.socket.on('chat:error', handler.handleSocketError);

    return this.socket;
  }

  acceptHandover(sessionId) {
    this.socket?.emit('admin:handover.accept', { sessionId });
  }

  sendAdminMessage(sessionId, content) {
    this.socket?.emit('admin:message.send', { sessionId, content });
  }

  returnToAi(sessionId) {
    this.socket?.emit('return_to_ai', { sessionId });
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
