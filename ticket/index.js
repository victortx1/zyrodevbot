const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once("ready", () => {
  console.log(`✅ Bot online como ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!regras") {

    const embed = new EmbedBuilder()
      .setColor("#5865F2") // cor lateral estilo Discord
      .setTitle("📜 Regras")
      .setDescription(
`**1.** O descumprimento dos Termos de Serviço do Discord resultará em punição ou banimento.  
**2.** É proibido utilizar contas secundárias ou falsas para burlar punições.  
**3.** Não é tolerado qualquer tipo de preconceito, discriminação ou apologia a ideologias racistas, homofóbicas ou similares.  
**4.** É proibido enviar conteúdo NSFW (+18).  
**5.** É proibido SPAM (envio repetitivo de mensagens idênticas).  
**6.** O envio de links maliciosos é proibido. O conteúdo será removido e o usuário punido.  
**7.** É proibido incentivar ou promover pirataria.  
**8.** Não é permitido movimentar ou discutir assuntos sensíveis, como política e religião.  
**9.** Não é permitido solicitar ajuda para desenvolvimento de malware ou atividades similares.  
**10.** O envio de scams, IP loggers ou links/arquivos maliciosos resultará em **banimento imediato**.  
**11.** Não mencione a equipe (staff) sem necessidade.  
**12.** É proibido solicitar cargos. Eles são concedidos por mérito.  
**13.** Não é permitido divulgar, discutir ou promover apostas, jogos de azar, cassinos, loterias ou atividades financeiras semelhantes.  
**14.** É proibido divulgar convites de outros servidores do Discord.

⚠️ **O descumprimento de qualquer uma das regras resultará em punição, conforme avaliação da moderação.**`
      )
      .setFooter({ text: "ZyroDev • Comunidade de Programação" })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
