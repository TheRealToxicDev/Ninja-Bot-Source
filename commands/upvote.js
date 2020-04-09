const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .addField("Can upvote the bot at: ", "COMING SOON!!!")
      message.channel.send(embed)
}
 