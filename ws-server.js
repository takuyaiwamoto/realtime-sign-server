// ws-server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 10000 });

server.on('connection', socket => {
  console.log('✅ クライアント接続');

  socket.on('message', message => {
    // すべての他のクライアントに中継
    server.clients.forEach(client => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => {
    console.log('❌ クライアント切断');
  });
});

console.log('🚀 WebSocketサーバが起動しました');
