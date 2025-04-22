const { EmbedBuilder } = require("discord.js");
const os = require("os");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
  name: "botbilgi",
  description: "Bot hakkında detaylı bilgileri gösterir.",
  category: "genel",
  type: 1,
  aliases: ["bot", "hakkımda"],

  run: async (client, message) => {
    const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dk], s [sn]");
    const embed = createBotInfoEmbed(client, uptime);
    message.reply({ embeds: [embed] });
  },

  execute: async (interaction) => {
    const client = interaction.client;
    const uptime = moment.duration(client.uptime).format("D [gün], H [saat], m [dk], s [sn]");
    const embed = createBotInfoEmbed(client, uptime);
    await interaction.reply({ embeds: [embed] });
  },
};

function createBotInfoEmbed(client, uptime) {
  const embed = new EmbedBuilder()
    .setTitle("🤖・Bot Bilgileri")
    .setThumbnail(client.user.displayAvatarURL())
    .addFields(
      { name: "📛 İsim", value: `${client.user.username}`, inline: true },
      { name: "🆔 ID", value: `${client.user.id}`, inline: true },
      { name: "📶 Ping", value: `${client.ws.ping}ms`, inline: true },
      { name: "🧠 Bellek Kullanımı", value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
      { name: "🕒 Aktif Süre", value: uptime, inline: true },
      { name: "📚 Komut Sayısı", value: `${client.commands.size}`, inline: true },
      { name: "🌐 Sunucu Sayısı", value: `${client.guilds.cache.size}`, inline: true },
      { name: "👥 Kullanıcı Sayısı", value: `${client.users.cache.size}`, inline: true }
    )
    .setColor("Random")
    .setFooter({ text: "OmniRP Bot • 2025" });

  return embed;
}
