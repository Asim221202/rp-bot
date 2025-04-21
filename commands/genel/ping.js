const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun gecikmesini gösterir."),
  name: "ping",
  description: "Botun gecikmesini gösterir.",
  run: async (client, messageOrInteraction, args = []) => {
    const isSlash = !!messageOrInteraction.isChatInputCommand;

    const send = async (content) => {
      if (isSlash) return await messageOrInteraction.reply(content);
      else return await messageOrInteraction.channel.send(content);
    };

    const start = Date.now();
    const msg = await send("Gecikme hesaplanıyor...");
    const end = Date.now();

    const botPing = end - start;
    const apiPing = Math.round(client.ws.ping);

    const embed = new EmbedBuilder()
      .setTitle("🏓・Pong!")
      .setColor(0x5865F2)
      .addFields(
        { name: '🤖 Bot Gecikmesi', value: `${botPing}ms`, inline: true },
        { name: '💻 API Gecikmesi', value: `${apiPing}ms`, inline: true },
        { name: '⏱️ Uptime', value: `<t:${Math.floor(Date.now() / 1000 - process.uptime())}:R>`, inline: true }
      )
      .setFooter({ text: ` ${client.user.username} • ${new Date().toLocaleDateString("tr-TR")} ${new Date().toLocaleTimeString("tr-TR")}` });

    if (isSlash) {
      await messageOrInteraction.editReply({ content: " ", embeds: [embed] });
    } else {
      await msg.edit({ content: " ", embeds: [embed] });
    }
  }
};
