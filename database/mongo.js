const mongoose = require('mongoose');
require('dotenv').config();  // .env dosyasını yükler

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('[MongoDB] Bağlantı başarılı!');
  } catch (err) {
    console.error('[MongoDB] Bağlantı hatası:', err);
  }
};
