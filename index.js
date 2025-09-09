require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

async function sendMessage(userToken, guildId, kanalId, mesaj) {
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

    try {
        await client.login(userToken);
        console.log(`${userToken.substring(0, 8)}... kullanıcısı ile giriş yapıldı.`);

        const guild = await client.guilds.fetch(guildId);
        if (!guild) {
            console.error(`Belirtilen sunucu bulunamadı: ${guildId}`);
            return;
        }

        const kanal = await client.channels.fetch(kanalId);
        if (kanal && kanal.isTextBased() && kanal.guildId === guildId) {
            await kanal.send(mesaj);
            console.log(`"${mesaj}" mesajı ${guild.name} sunucusunda ${kanal.name} kanalına (kullanıcı tarafından) gönderildi.`);
        } else {
            console.error(`Belirtilen kanal bulunamadı, bir metin kanalı değil veya sunucuyla eşleşmiyor: ${kanalId} (Sunucu: ${guildId})`);
        }
    } catch (error) {
        console.error(`${userToken.substring(0, 8)}... kullanıcısı ile işlem sırasında bir hata oluştu:`, error);
    } finally {
        client.destroy(); // İşlem tamamlandıktan sonra istemciyi kapat
    }
}

async function main() {
    const guildId = process.env.GUILD_ID;
    const kanalId = process.env.KANAL_ID;
    const mesaj = process.env.MESAJ || "Bu bir test mesajıdır."; // Eğer .env'de mesaj yoksa varsayılan bir mesaj kullan

    // Token'ları bir diziye alarak daha kolay yönetilebilir hale getirelim
    const userTokens = [
        process.env.USER_TOKEN_1,
        process.env.USER_TOKEN_2,
        // İhtiyacınız kadar token ekleyebilirsiniz
    ];

    for (const token of userTokens) {
        if (token) {
            await sendMessage(token, guildId, kanalId, mesaj);
        }
    }

    console.log("Tüm token'lar ile mesaj gönderme denemesi tamamlandı.");
}

main();
