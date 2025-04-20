const { REST, Routes, Collection, GatewayIntentBits, Partials, Client } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();
const slashCommands = [];

const commandFolders = fs.readdirSync("./commands");
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);

    if (command.slashData) {
      slashCommands.push(command.slashData.toJSON());
    }
  }
}

// Slash komutları Discord'a yükle
client.once("ready", async () => {
  console.log(`Bot ${client.user.tag} olarak giriş yaptı.`);

  const rest = new REST({ version: "10" }).setToken(config.token);
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: slashCommands }
    );
    console.log("Slash komutları yüklendi.");
  } catch (error) {
    console.error("Slash yükleme hatası:", error);
  }
});

client.on("messageCreate", async message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (command && command.executePrefix) {
    try {
      await command.executePrefix(message, args, client);
    } catch (err) {
      console.error(err);
      message.reply("Bir hata oluştu.");
    }
  }
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (command && command.executeSlash) {
    try {
      await command.executeSlash(interaction, client);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: "Bir hata oluştu.", ephemeral: true });
    }
  }
});

client.login(config.token);