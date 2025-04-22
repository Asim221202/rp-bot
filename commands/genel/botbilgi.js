const { SlashCommandBuilder } = require('discord.js');
const os = require('os');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botbilgi')
    .setDescription('Bot hakkında bilgi verir.'),
  name: 'botbilgi',
  description: 'Bot hakkında bilgi verir.',
  async execute(messageOrInteraction, args, passedClient, isSlash) {
    const client = isSlash ? messageOrInteraction.client : passedClient;
    
    const uptime = moment.duration(client.uptime).format('D [gün], H [saat], m [dakika], s [saniye]');
    
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
