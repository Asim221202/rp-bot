const { SlashCommandBuilder } = require('discord.js');
const os = require('os');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botbilgi')
    .setDescription('Bot hakkında bilgi verir.'),
  name: 'botbilgi',
  description: 'Bot hakkında bilgi verir.',
  async execute(messageOrInteraction, args, client, isSlash) {
    const uptimeMs = client.uptime;
    const seconds = Math.floor((uptimeMs / 1000) % 60);
    const minutes = Math.floor((uptimeMs / (1000 * 60)) % 60);
    const hours = Math.floor((uptimeMs / (1000 * 60 * 60)) % 24);
    const days = Math.floor(uptimeMs / (1000 * 60 * 60 * 24));

    const uptime = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;

    const embed = {
      title: 'Bot Bilgisi',
      color: 0x3498db,
      fields: [
        { name: 'Bot İsmi', value: client.user.tag, inline: true },
        { name: 'Ping', value: `${client.ws.ping}ms`, inline: true },
        { name: 'Uptime', value: uptime, inline: true },
        { name: 'Sunucu Sayısı', value: `${client.guilds.cache.size}`, inline: true },
        { name: 'Kullanıcı Sayısı', value: `${client.users.cache.size}`, inline: true },
        { name: 'Node.js Sürümü', value: process.version, inline: true },
        { name: 'Platform', value: os.platform(), inline: true },
        { name: 'RAM Kullanımı', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true }
      ],
      footer: { text: `${client.user.username} • ${new Date().toLocaleDateString()}` }
    };

    if (isSlash) {
      await messageOrInteraction.reply({ embeds: [embed] });
    } else {
      await messageOrInteraction.channel.send({ embeds: [embed] });
    }
  }
};
