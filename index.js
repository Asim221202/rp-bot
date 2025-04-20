const fs = require('fs');
const path = require('path');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token, prefix } = require('./config.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();
client.prefixCommands = new Collection();

// Komutlar Klasörü Kontrolü
const commandsPath = path.join(__dirname, 'commands');

if (!fs.existsSync(commandsPath)) {
  console.error("❌ HATA: 'commands' klasörü bulunamadı. Lütfen oluşturduğundan emin ol.");
  process.exit(1);
}

const folders = fs.readdirSync(commandsPath);

for (const folder of folders) {
  const folderPath = path.join(commandsPath, folder);

  if (!fs.statSync(folderPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(path.join(folderPath, file));

    // Slash komut
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
    }

    // Prefix komut
    if (command.name && command.run) {
      client.prefixCommands.set(command.name, command);
    }
  }
}

// Slash Komutlar
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: 'Bir hata oluştu!', ephemeral: true });
  }
});

// Prefix Komutlar
client.on('messageCreate', async message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmdName = args.shift().toLowerCase();
  const command = client.prefixCommands.get(cmdName);

  if (!command) return;

  try {
    await command.run(client, message, args);
  } catch (err) {
    console.error(err);
    message.reply('Bir hata oluştu!');
  }
});
const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Bot çalışıyor!');
});

app.listen(port, () => {
  console.log(`Bot, http://localhost:${port} üzerinde dinliyor.`);
});

client.once('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı.`);
});

client.login(token);
