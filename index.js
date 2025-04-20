const { Client, GatewayIntentBits, Collection } = require('discord.js');
const express = require('express');
const fs = require('fs');
const path = require('path');
const { token, prefix } = require('./config.js');

// Express app oluştur
const app = express();
const port = 3000;

// Discord client'ı oluştur
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Komutlar için collection oluştur
client.commands = new Collection();

// Komutları yükle
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

commandFiles.forEach(file => {
  const command = require(path.join(commandsPath, file));
  console.log(`Yüklenen komut: ${command.name}`);
  client.commands.set(command.name, command);
});

// Bot hazır olduğunda
client.once('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı.`);
  // Web sunucusu başlat
  app.listen(port, () => {
    console.log(`Web server listening at http://localhost:${port}`);
  });
});

// HTTP sunucusu route
app.get('/', (req, res) => {
  res.send('Bot çalışıyor!');
});

// Botun komutlarını dinle
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const command = client.commands.get(cmdName);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply('Bir hata oluştu!');
  }
});

// Botu başlat
client.login(token);
