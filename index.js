import { Client, GatewayIntentBits, ActivityType } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const statusList = [
  "Bot feito por: DELARDEV 🚀",
  "Desenvolvendo projetos 💻",
  "Online 24/7 ⚡",
  "Powered by ZyroDev 🤖",
  "Criando sistemas 🔧"
];

let i = 0;

client.once("ready", () => {
  console.log(`🤖 Bot ligado como ${client.user.tag}`);

  setInterval(() => {
    client.user.setPresence({
      activities: [
        {
          name: statusList[i],
          type: ActivityType.Playing
        }
      ],
      status: "online"
    });

    i = (i + 1) % statusList.length;
  }, 10000); // troca a cada 10 segundos
});

client.login(process.env.TOKEN);
