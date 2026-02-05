const WebSocket = require('ws');
const mongoose = require('mongoose');

// Create Chat Message Schema
const ChatMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true },
  emergencyId: { type: mongoose.Schema.Types.ObjectId, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  senderType: { type: String, enum: ['patient', 'doctor'], required: true }
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

// Initialize WebSocket server for chat
const initChatWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  console.log('Chat WebSocket server initialized');

  // Mapping to track active connections
  const clients = new Map();

  wss.on('connection', (ws, req) => {
    console.log('New WebSocket connection attempt');
    
    // Extract emergency ID and user ID from connection URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const emergencyId = url.searchParams.get('emergencyId');
    const userId = url.searchParams.get('userId');

    console.log('Connection params:', { emergencyId, userId });

    if (!emergencyId || !userId) {
      console.error('Missing emergencyId or userId, closing connection');
      ws.close(1008, 'Missing emergencyId or userId');
      return;
    }

    // Store the WebSocket connection
    if (!clients.has(emergencyId)) {
      clients.set(emergencyId, new Map());
    }
    clients.get(emergencyId).set(userId, ws);
    console.log(`Client connected: ${userId} for emergency ${emergencyId}`);

    ws.on('message', async (messageData) => {
      try {
        const { senderId, senderType, message, receiverId } = JSON.parse(messageData);

        // Validate that we have a receiverId
        if (!receiverId) {
          console.error('No receiverId provided in message');
          ws.send(JSON.stringify({ error: 'receiverId is required' }));
          return;
        }

        // Save message to database
        const chatMessage = new ChatMessage({
          senderId,
          receiverId,
          emergencyId,
          message,
          senderType
        });
        await chatMessage.save();

        // Broadcast message to all participants in this emergency
        const emergencyClients = clients.get(emergencyId);
        if (emergencyClients) {
          emergencyClients.forEach((client, clientId) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                senderId,
                senderType,
                message,
                timestamp: chatMessage.timestamp
              }));
            }
          });
        }
      } catch (error) {
        console.error('Error processing chat message:', error);
        ws.send(JSON.stringify({ error: 'Failed to process message' }));
      }
    });

    ws.on('close', () => {
      console.log(`Client disconnected: ${userId} for emergency ${emergencyId}`);
      const emergencyClients = clients.get(emergencyId);
      if (emergencyClients) {
        emergencyClients.delete(userId);
        if (emergencyClients.size === 0) {
          clients.delete(emergencyId);
        }
      }
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error for user ${userId}:`, error);
    });
  });

  wss.on('error', (error) => {
    console.error('WebSocket Server Error:', error);
  });

  return wss;
};

module.exports = {
  initChatWebSocket,
  ChatMessage
};