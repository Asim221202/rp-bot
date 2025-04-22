const { SlashCommandBuilder } = require('discord.js');
const { getServerSettings, setServerSettings } = require('../../utils/settings');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('girislog')
    .setDescription('Sunucuya giriş logu kanalı ve embed ayarlarını yapın.')
    .addChannelOption(option => 
      option.setName('kanal')
        .setDescription('Giriş logu kanalını seçin.')
        .setRequired(true))
    .addStringOption(option => 
      option.setName('baslik')
        .setDescription('Embed başlığını belirleyin.')
        .setRequired(false))
    .addStringOption(option => 
      option.setName('description')
        .setDescription('Embed açıklamasını belirleyin.')
        .setRequired(false))
    .addStringOption(option => 
      option.setName('footer')
        .setDescription('Embed footer mesajını belirleyin.')
        .setRequired(false))
    .addStringOption(option => 
      option.setName('image')
        .setDescription('Embed görsel linkini belirleyin.')
        .setRequired(false)),

  async execute(interaction) {
    const guildId = interaction.guild.id;
    const kanal = interaction.options.getChannel('kanal');
    const baslik = interaction.options.getString('baslik') || 'Hoş geldiniz!';
    const description = interaction.options.getString('description') || 'Sunucuya hoş geldiniz!';
    const footer = interaction.options.getString('footer') || 'Sunucu Yönetimi';
    const image = interaction.options.getString('image') || null; // Görsel boş ise null olarak ayarlayalım

    try {
      // Sunucunun mevcut ayarlarını al
      let settings = await getServerSettings(guildId);

      // Eğer ayarlar bulunmazsa, yeni bir ayar nesnesi oluştur
      if (!settings) {
        settings = {
          guildId: guildId,
          girisLog: {
            kanalId: kanal.id,
            embed: {
              baslik: baslik,
              description: description,
              footer: footer,
              image: image,
            }
          }
        };
      } else {
        // Giriş logu ayarlarını güncelle
        settings.girisLog.kanalId = kanal.id;
        settings.girisLog.embed.baslik = baslik;
        settings.girisLog.embed.description = description;
        settings.girisLog.embed.footer = footer;
        settings.girisLog.embed.image = image;
      }

      // Ayarları veritabanına kaydet
      await setServerSettings(guildId, settings);

      await interaction.reply(`Giriş logu ve embed ayarları başarıyla ${kanal} olarak ayarlandı.`);
    } catch (error) {
      console.error('Ayarlarda bir hata oluştu:', error);
      await interaction.reply('Giriş logu ayarlarını yaparken bir hata oluştu.');
    }
  }
};
