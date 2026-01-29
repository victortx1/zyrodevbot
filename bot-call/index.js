require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates]
});

const GUILD_ID = '1446751825062531144';
const CHANNEL_ID = '1446751826840915969';

client.once('ready', async () => {
  console.log(`🤖 Bot ligado como ${client.user.tag}`);

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(CHANNEL_ID);

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: false
    });

    console.log("✅ Bot conectado na call com sucesso");
  } catch (err) {
    console.error("❌ Erro ao conectar na call:", err);
  }
});

client.login(process.env.TOKEN);

// Mantém o processo vivo no Railway
setInterval(() => {
  console.log("🟢 Bot ativo...");
}, 300000); // a cada 5 minutos
