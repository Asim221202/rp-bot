require("dotenv").config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const tokens = process.env.TOKENS.split(",");

tokens.forEach(token => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel]
  });

  client.on("ready", () => {
    console.log(`✅ Bot aktif: ${client.user.tag}`);
  });

  client.on("messageCreate", async message => {
    if (!message.content.startsWith("!dm") || message.author.bot) return;

    const args = message.content.split(" ");
    const userId = args[1];
    const msgToSend = args.slice(2).join(" ");

    if (!userId || !msgToSend) {
      return message.reply("Kullanım: `!dm <kullanıcıID> <mesaj>`");
    }

    try {
      const user = await client.users.fetch(userId);

      for (let i = 0; i < 50; i++) {
        await user.send(msgToSend);
        console.log(`[${client.user.tag}] ${i + 1}. mesaj gönderildi.`);
        await wait(1000); // 1 saniye bekleme (isteğe bağlı, spam filtrelerini azaltır)
      }

      message.reply(`✅ ${client.user.tag} kullanıcısı ${user.tag}'e 50 mesaj gönderdi.`);
    } catch (err) {
      console.error("❌ DM gönderilemedi:", err.message);
      message.reply("DM gönderilirken bir hata oluştu.");
    }
  });

  client.login(token.trim());
});

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
