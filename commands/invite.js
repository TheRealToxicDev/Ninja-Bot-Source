const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
//message.channel.send("Here's a invite link to invite the bot to your server, see you there!")
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    //.setDescription(`https://discordapp.com/oauth2/authorize?client_id=390151520722878465&scope=bot&permissions=470281471`);
    .setDescription("Heres a link to invite me to your server, See you there!!")
    .addField("Invite Link", "[Click Here To Invite](https://discordapp.com/api/oauth2/authorize?client_id=668542916414668832&permissions=2147483127&scope=bot)")
    
    message.channel.send({embed})
}