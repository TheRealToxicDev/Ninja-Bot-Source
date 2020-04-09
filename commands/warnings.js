const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = async (client, message, args) => {
if (message.member.hasPermission("KICK_MEMBERS")) {
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Sorry, i dont have the perms to do this cmd i need KICK_MEMBERS. :x:')
    let reason = args.slice(1).join(' ');
    if (message.mentions.users.size < 1) return message.channel.send(`Need to tag a user to see there warnings`)
    let user = message.mentions.users.first();
    sql.get(`SELECT * FROM warnings WHERE guildId = "${message.guild.id}" AND userId = "${user.id}"`).then(row => {
      if (!row) return message.channel.send(user.username + " has " + `0` + " warning(s)")
    if (row.userwarnings === 0) {
      const warnEmbed1 = new Discord.RichEmbed()
            warnEmbed1.setTitle("User Warn Level")
            warnEmbed1.setDescription('Here is the warnings for' + ` ${user}`)
            warnEmbed1.addField("Warnings", `${row.userwarnings - 1}`)
      //message.channel.send(user.username + " has " + `${row.userwarnings - 1}` + " warning(s)")
      message.channel.send(warnEmbed1)
    } else {
      const warnEmbed2 = new Discord.RichEmbed()
            warnEmbed2.setTitle("User Warn Level")
            warnEmbed2.setDescription("Here is the warnings for" + ` ${user}`)
            warnEmbed2.addField("Warnings", `${row.userwarnings - 1}`)
            warnEmbed2.addField("Reasons", "``" + `${row.reasons}` + "``")
      //message.channel.send(user.username + " has " + `${row.userwarnings - 1}` + " warning(s) \n \nReasons: \n```" + row.reasons + "```")
      message.channel.send(warnEmbed2)
    }
  })
}
}
   
 