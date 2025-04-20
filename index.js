const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.commands = new Collection();
const prefix = config.prefix;

// === KOMUTLARI YÜKLE ===
const commandsPath = path.join(__dirname, 'commands');
if (!fs.existsSync(commandsPath)) {
  console.error("❌ 'commands' klasörü bulunamadı.");
  process.exit(1);
}

const folders = fs.readdirSync(commandsPath);
for (const folder of folders) {
  const folderPath = path.join(commandsPath, folder);
  if (!fs.lstatSync(folderPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    if (command.name) {
      client.commands.set(command.name, command);
      console.log(`✅ Yüklendi: ${command.name}`);
    } else {
      console.warn(`⚠️ Komut dosyası 'name' içermiyor: ${file}`);
    }
  }
}

// === MESAJ İLE KOMUT ALGILAMA (PREFIX) ===
client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('❌ Komutu çalıştırırken bir hata oluştu.');
  }
});
// interactionCreate event'i:
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction, [], true); // isSlash = true
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ Komutu çalıştırırken hata oluştu.', ephemeral: true });
  }
});

// === BOT AÇILDI ===
client.once('ready', () => {
  console.log(`🟢 Bot giriş yaptı: ${client.user.tag}`);
});

client.login(config.token);
