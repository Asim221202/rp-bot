const { EmbedBuilder } = require('discord.js');
const { getServerSettings } = require('../utils/settings');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const guildId = member.guild.id;

    try {
      // Sunucu ayarlarını al
      const settings = await getServerSettings(guildId);

      // Eğer ayarlar yoksa, fonksiyon burada sonlanır
      if (!settings || !settings.girisLog || !settings.girisLog.kanalId) return;

      // Giriş logu kanalını bul
      const channel = member.guild.channels.cache.get(settings.girisLog.kanalId);
      if (!channel) return;

      // Embed oluştur
      const embed = new EmbedBuilder()
        .setColor('#00FF00') // Renk ayarları
        .setTitle(settings.girisLog.embed.baslik || 'Hoş geldiniz!')
        .setDescription(settings.girisLog.embed.description || `${member.user.username} sunucuya katıldı!`)
        .setFooter({ text: settings.girisLog.embed.footer || 'Sunucu Yönetimi' })
        .setImage(settings.girisLog.embed.image || null)
        .setTimestamp();

      // Kanalda embed mesajını gönder
      await channel.send({ embeds: [embed] });
    } catch (error) {
      console.error('Giriş mesajı gönderirken hata oluştu:', error);
    }
  }
};
