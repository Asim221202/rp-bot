opt/render/project/src/commands/genel/ping.js:15
    const apiLatency = client.ws.ping;
                              ^
TypeError: Cannot read properties of undefined (reading 'ws')
    at Object.execute (/opt/render/project/src/commands/genel/ping.js:15:31)
    at Client.<anonymous> (/opt/render/project/src/index.js:51:13)
    at Client.emit (node:events:518:28)
    at MessageCreateAction.handle (/opt/render/project/src/node_modules/discord.js/src/client/actions/MessageCreate.js:32:14)
    at module.exports [as MESSAGE_CREATE] (/opt/render/project/src/node_modules/discord.js/src/client/websocket/handlers/MESSAGE_CREATE.js:4:32)
    at WebSocketManager.handlePacket (/opt/render/project/src/node_modules/discord.js/src/client/websocket/WebSocketManager.js:348:31)
    at WebSocketManager.<anonymous> (/opt/render/project/src/node_modules/discord.js/src/client/websocket/WebSocketManager.js:232:12)
    at WebSocketManager.emit (/opt/render/project/src/node_modules/@vladfrangu/async_event_emitter/dist/index.cjs:287:31)
    at WebSocketShard.<anonymous> (/opt/render/project/src/node_modules/@discordjs/ws/dist/index.js:1190:51)
    at WebSocketShard.emit (/opt/render/project/src/node_modules/@vladfrangu/async_event_emitter/dist/index.cjs:287:31)
Node.js v22.14.0
✅ Yüklendi: ping
Express sunucusu çalışıyor: http://localhost:3000
🟢 Bot giriş yaptı: OmniRP#9189
[MongoDB] Bağlantı başarılı!
