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
    console.log(`Bot aktif: ${client.user.tag}`);
  });

  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith("!dm") || message.author.bot) return;

    const args = message.content.split(" ");
    const userId = args[1];
    const msgToSend = args.slice(2).join(" ");

    if (!userId || !msgToSend) {
      return message.reply("Kullanım: `!dm <kullanıcıID> <mesaj>`");
    }

    try {
      const user = await client.users.fetch(userId);
      await user.send(msgToSend);
      message.reply(`✅ Mesaj gönderildi: ${user.tag}`);
    } catch (err) {
      console.error("Hata:", err.message);
      message.reply("❌ Mesaj gönderilemedi. Kullanıcı ID'si geçersiz olabilir veya DM kapalı.");
    }
  });

  client.login(token.trim());
});
