const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = "SEU_TOKEN_AQUI"; // coloque o token do bot

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!regras") {
    const embed = new EmbedBuilder()
      .setColor("#2b2d31")
      .setTitle("📘┃REGRAS — ZYRODEV")
      .setDescription("O descumprimento das regras pode resultar em aviso, mute, kick ou ban.")
      .addFields(
        {
          name: "⚖️ Regras Gerais",
          value:
`**1.** Respeite os Termos do Discord  
**2.** Proibido usar contas fakes para burlar punições  
**3.** Respeito é obrigatório (sem preconceito ou discriminação)  
**4.** Proibido conteúdo +18 (NSFW)  
**5.** Sem spam ou flood  
**6.** Proibido links maliciosos  
**7.** Scams/IP loggers = ban imediato  
**8.** Não mencione a staff sem necessidade  
**9.** Não peça cargos  
**10.** Proibido divulgar apostas/jogos de azar  
**11.** Não divulgar outros servidores`
        },
        {
          name: "💬 Uso dos Canais",
          value:
`**12.** Use os canais corretamente  
**13.** 💭┃geral é para assuntos diversos  
**14.** Canais de linguagens = só programação  
**15.** Divulgue projetos em 💡┃projetos  
**16.** Redes sociais apenas no canal correto  
**17.** Use comandos de bot nos canais certos`
        },
        {
          name: "🛠️ Suporte",
          value:
`**18.** Denúncias em ⛔┃denúncias (com provas)  
**19.** Dúvidas sobre o servidor fale com a staff no canal apropriado`
        },
        {
          name: "💻 Regras de Programação",
          value:
`**20.** Use blocos de código com 3 crases  
\`\`\`js
console.log("Exemplo ");
\`\`\`  
**21.** Faça perguntas detalhadas para receber ajuda melhor`
        },
        {
          name: "🧾 Sistema de Registro",
          value: "Faça seu registro para liberar todos os canais do servidor."
        }
      )
      .setFooter({ text: "ZyroDev • Comunidade de Programação" });

    message.channel.send({ embeds: [embed] });
  }
});

client.login(TOKEN);
    