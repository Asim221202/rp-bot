const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  name: 'ping', // prefix için
  description: 'Botun gecikmesini gösterir.',
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Botun gecikmesini gösterir.'),

  async execute(messageOrInteraction, args, isSlash = false, client) {
    const sentAt = Date.now();
    const uptime = formatDuration(process.uptime() * 1000);
    const latency = Date.now() - sentAt;
    const apiLatency = client.ws.ping;

    const embed = new EmbedBuilder()
      .setColor(0x00AE86)
      .setTitle('🏓・Pong!')
      .setDescription(`Gecikme değerleri burada:`)
      .addFields(
        { name: '🤖 ┆ Bot Gecikmesi', value: `${latency}ms`, inline: true },
        { name: '💻 ┆ API Gecikmesi', value: `${apiLatency}ms`, inline: true },
        { name: '⏳ ┆ Uptime Süresi', value: `${uptime}`, inline: false }
      )
      .setFooter({ text: `© Botunuz - ${new Date().toLocaleDateString('tr-TR')}` });

    if (isSlash) {
      return messageOrInteraction.reply({ embeds: [embed] });
    } else {
      return messageOrInteraction.channel.send({ embeds: [embed] });
    }
  }
};

// Süreyi okunabilir forma çeviren yardımcı fonksiyon
function formatDuration(ms) {
  const sec = Math.floor(ms / 1000) % 60;
  const min = Math.floor(ms / (1000 * 60)) % 60;
  const hrs = Math.floor(ms / (1000 * 60 * 60)) % 24;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  return `${days}g ${hrs}s ${min}d ${sec}sn`;
}
