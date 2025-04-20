const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
  name: 'ping',
  description: 'Botun gecikmesini ve uptime süresini gösterir.',
  slashData: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini ve uptime süresini gösterir.'),

  async execute(messageOrInteraction, args, isSlash = false) {
    const now = Date.now();
    const latency = now - (isSlash ? messageOrInteraction.createdTimestamp : messageOrInteraction.createdTimestamp);
    const uptime = process.uptime(); // saniye cinsinden
    const uptimeString = formatDuration(uptime);

    const embed = new EmbedBuilder()
      .setTitle('🏓 Ping Bilgisi')
      .addFields(
        { name: '🔁 Gecikme', value: `${latency}ms`, inline: true },
        { name: '⏱️ Uptime', value: uptimeString, inline: true }
      )
      .setColor('#00bfff')
      .setTimestamp();

    if (isSlash) {
      await messageOrInteraction.reply({ embeds: [embed] });
    } else {
      await messageOrInteraction.reply({ embeds: [embed] });
    }
  }
};

// Uptime formatlayıcı
function formatDuration(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${d}g ${h}s ${m}d ${s}s`;
}
