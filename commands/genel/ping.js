const { EmbedBuilder } = require("discord.js");
const os = require("os");

module.exports = {
  name: "ping",
  description: "Botun pingini gösterir.",
  category: "genel",
  type: 1,
  aliases: ["gecikme"],

  run: async (client, message) => {
    const uptime = moment.duration(process.uptime(), 'seconds');
const uptimeString = `${uptime.hours()} saat, ${uptime.minutes()} dakika, ${uptime.seconds()} saniye`;
    const apiLatency = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("🏓・Pong!")
      .setDescription(`Gecikme değerleri burada:`)
      .addFields(
        { name: "🤖 ┆ Bot Gecikmesi", value: `${Date.now() - message.createdTimestamp}ms`, inline: true },
        { name: "💻 ┆ API Gecikmesi", value: `${apiLatency}ms`, inline: true },
        { name: "⏱️ ┆ Uptime", value: `${uptimeString}`, inline: true }
      )
      .setFooter({ text: `OmniRP` })
     .setTimestamp();

    message.reply({ embeds: [embed] });
  },

  execute: async (interaction) => {
    const client = interaction.client;
    const uptime = process.uptime();
    const apiLatency = client.ws.ping;

    const embed = new EmbedBuilder()
      .setTitle("🏓・Pong!")
      .setDescription(`Gecikme değerleri burada:`)
      .addFields(
        { name: "🤖 ┆ Bot Gecikmesi", value: `${Date.now() - interaction.createdTimestamp}ms`, inline: true },
        { name: "💻 ┆ API Gecikmesi", value: `${apiLatency}ms`, inline: true },
        { name: "⏱️ ┆ Uptime", value: `<t:${Math.floor((Date.now() - uptime * 1000) / 1000)}:R>`, inline: true }
      )
      .setFooter({ text: `OmniRP - ${new Date().toLocaleString("tr-TR")}` });

    await interaction.reply({ embeds: [embed] });
  },
};
