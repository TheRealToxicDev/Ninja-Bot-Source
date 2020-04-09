const NinjaBotAI = require ("discord.js");
const CleverNinja = new NinjaBotAI.Client()

const { Set } = require('discord-set');
const set = new Set()
 
const CleverNinjaLogs = console.log;
 
CleverNinja.on("ready", () => {
    CleverNinjaLogs("[Clever Ninja] ★ Ninja ★ AI Loaded Successfully!!");
});
 
CleverNinja.on("disconnect", () => {
  CleverNinjaLogs("[Clever Ninja] ★ Ninja ★ AI Disconnected Unexpectedly at " + `${new Date()}`);
});
 
CleverNinja.on("reconnecting", () => {
  CleverNinjaLogs("[Clever Ninja] ★ Ninja ★ AI Reconnected Successfully at " + `${new Date()}`);
});
        
CleverNinja.on("message", async message => {
   if (message.author.bot || message.guild) return;
  else {
      set.chat(message.content).then(reply => {
       const NinjaAI = new NinjaBotAI.RichEmbed()
             NinjaAI.setDescription(reply)
             NinjaAI.setTimestamp()
             NinjaAI.setFooter("© ★ Ninja ★", CleverNinja.user.avatarURL)
       return message.channel.send(NinjaAI)
     });
  }
 });
  

CleverNinja.login(process.env.TOKEN);