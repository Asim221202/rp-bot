module.exports = {
  name: 'ping',
  description: 'Botun pingini gösterir.',
  async execute(message, args) {
    const ping = Date.now() - message.createdTimestamp;
    const apiPing = Math.round(message.client.ws.ping);
    
    // Botun pingini göster
    message.channel.send(`Pong! Latency: **${ping}ms** | API Latency: **${apiPing}ms**`);
  },
};
