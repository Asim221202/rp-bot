const mongoose = require('mongoose');

// Sunucu ayarları şeması
const serverSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  girisLog: {
    kanalId: { type: String, default: '' }, // Giriş logu kanal ID'si
    embed: {
      baslik: { type: String, default: 'Hoş geldiniz!' },
      description: { type: String, default: 'Sunucuya hoş geldiniz!' },
      footer: { type: String, default: 'Sunucu Yönetimi' },
      image: { type: String, default: '' },
    }
  },
  cikisLog: {
    kanalId: { type: String, default: '' }, // Çıkış logu kanal ID'si
    embed: {
      baslik: { type: String, default: 'Güle güle!' },
      description: { type: String, default: 'Sunucudan ayrıldığınız için üzgünüz.' },
      footer: { type: String, default: 'Sunucu Yönetimi' },
      image: { type: String, default: '' },
    }
  },
  kayit: {
    kayitsizRole: { type: String, default: '' }, // Kayıtsız rol
    kayitliRole: { type: String, default: '' }, // Kayıtlı rol
    kayitMesaji: { type: String, default: '' }, // Kayıt mesajı
  }
});

const ServerSettings = mongoose.model('ServerSettings', serverSettingsSchema);

module.exports = ServerSettings;
