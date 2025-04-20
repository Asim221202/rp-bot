module.exports = {
  name: "ping",
  description: "Botun gecikmesini gösterir",
  type: "both", // hem prefix hem slash
  async execute(messageOrInteraction, args, client) {
    const isSlash = !!messageOrInteraction.isCommand;

    const pingMessage = `🏓 Gecikme: **${client.ws.ping}ms**`;

    if (isSlash && messageOrInteraction.isCommand()) {
      await messageOrInteraction.reply(pingMessage);
    } else {
      await messageOrInteraction.channel.send(pingMessage);
    }
  }
};
