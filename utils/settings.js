const ServerSettings = require('../models/ServerSettings');

// Sunucuya özel ayarları al
const getServerSettings = async (guildId) => {
  try {
    const settings = await ServerSettings.findOne({ guildId });
    return settings || {}; // Ayar bulunamazsa boş bir nesne döndür
  } catch (error) {
    console.error('❌ Ayarları alırken hata oluştu:', error);
    return {};
  }
};

// Sunucuya özel ayarları güncelle
const setServerSettings = async (guildId, newSettings) => {
  try {
    const settings = await ServerSettings.findOneAndUpdate(
      { guildId },
      newSettings,
      { upsert: true, new: true } // Eğer ayar yoksa yenisini oluştur
    );
    return settings;
  } catch (error) {
    console.error('❌ Ayarları güncellerken hata oluştu:', error);
    return null;
  }
};

module.exports = { getServerSettings, setServerSettings };
