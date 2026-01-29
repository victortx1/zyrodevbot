require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  PermissionsBitField,
  ChannelType,
  REST,
  Routes,
  SlashCommandBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once("ready", () => {
  console.log(`✅ Logado como ${client.user.tag}`);
});

/* ================== PAINEL ================== */
client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName === "ticket") {

    const embed = new EmbedBuilder()
      .setColor("#00bfff")
      .setTitle("📩 DUMANTEM | ATENDIMENTO VIA TICKET!")
      .setDescription(
        "**BEM-VINDO AO TROPA DU MANTEM!**\n" +
        "COMO PODEMOS TE AJUDAR HOJE?\n" +
        "CLIQUE NO MENU ABAIXO E SELECIONE A CATEGORIA."
      )
      .setImage("https://i.imgur.com/yourBannerHere.png")
      .setThumbnail("https://i.imgur.com/yourLogoHere.png");

    const menu = new StringSelectMenuBuilder()
      .setCustomId("ticket_menu")
      .setPlaceholder("Selecione uma opção")
      .addOptions([
        { label: "Suporte", value: "suporte", emoji: "🛠️" },
        { label: "Dúvidas", value: "duvidas", emoji: "❓" },
        { label: "Parcerias", value: "parcerias", emoji: "🤝" },
        { label: "Financeiro", value: "financeiro", emoji: "💰" }
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await interaction.reply({ embeds: [embed], components: [row] });
  }

  /* ================== CRIAR TICKET ================== */
  if (interaction.isStringSelectMenu() && interaction.customId === "ticket_menu") {
    const categoria = interaction.values[0];

    const canal = await interaction.guild.channels.create({
      name: `🎫-${categoria}-${interaction.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        }
      ]
    });

    const ticketEmbed = new EmbedBuilder()
      .setColor("#00bfff")
      .setTitle("🎟️ TICKET ABERTO")
      .setDescription(`Olá ${interaction.user}, nossa equipe irá te atender.\n**Categoria:** ${categoria.toUpperCase()}`);

    canal.send({ content: `${interaction.user}`, embeds: [ticketEmbed] });

    await interaction.reply({ content: "✅ Seu ticket foi criado!", ephemeral: true });
  }
});

/* ================== REGISTRAR COMANDO ================== */
const commands = [
  new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Envia o painel de atendimento via ticket")
].map(command => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log("✅ Comando /ticket registrado");
  } catch (error) {
    console.error(error);
  }
})();

client.login(process.env.TOKEN);
