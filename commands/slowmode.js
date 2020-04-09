const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
exports.run = (client, message, args) => {
  //const channel = args[1];
   //if (!channel) channel = message.channel;
     if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("You're missing MANAGE_GUILD permission");
     if (!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.reply('Sorry, i dont have the perms to do this cmd i need MANAGE_MESSAGES. :x:')
     sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
         if (row.slowmode === "enabled") {
             sql.run(`UPDATE scores SET slowmode = "disabled", casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
             message.channel.send("Slow mode has been disabled")
             //message.guild.channels.forEach(channel => channel.setRateLimitPerUser(0))
             message.channel.setRateLimitPerUser(0)
               //channel.setRateLimitPerUser(0)
                  let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle("Case #" + row.casenumber + " | Action:  Slow Mode Disabled")
                    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                    .setFooter("Time used: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});
                } else {
                    const timetoset = parseInt(args[0])
                    //const channel = args[1];
                    const prefixtouse = row.prefix
                    const usage = new Discord.RichEmbed()
                        .setColor(0x00A2E8)
                        .setThumbnail(client.user.avatarURL)
                        .setTitle("Command: " + prefixtouse + "serverslowmode")
                        .addField("Usage", prefixtouse + "slowmode <seconds>")
                        .addField("Example", prefixtouse + "slowmode 5")
                        .addField("Limit", "21600 Seconds (6 Hours)")
                        .addField("Duration Help", "HOURS: [Seconds To Hours Converter](https://www.inchcalculator.com/convert/second-to-hour/)\nMINUTES: 60 Seconds = 1 Minute")
                        .setDescription("Description: " + "Enables slowmode in the current channel and users can only send messages every x seconds\n\n• Make sure you set the duration in seconds.\n\n• If the command returns ``disabled`` when you attempted to enable it just run the command again it does this because the Guild ID is already in the database but the Channel ID is not.");
                  
                   const error = new Discord.RichEmbed() 
                        .setTitle("Discord API Error")
                        .setDescription("Value should be less than or equal to 21600.")
                        .addField("Duration Help", "HOURS: [Seconds to Hours Converter](https://www.inchcalculator.com/convert/second-to-hour/)\nMINUTES: 60 Seconds = 1 Minute")
                        .setTimestamp()

                    if (isNaN(timetoset)) return message.channel.send(usage)
                    if (timetoset.length < 1) return message.channel.send(usage)
                    if (timetoset > 21600) return message.channel.send(error)
                    sql.run(`UPDATE scores SET slowmode = "enabled", slowmodetime = ${timetoset}, casenumber = ${row.casenumber + 1} WHERE guildId = ${message.guild.id}`);
                     message.channel.send("Slow mode has been enabled with the time of " + timetoset + " seconds")
                     message.channel.setRateLimitPerUser(timetoset)
                     //message.guild.channels.forEach(channel => channel.setRateLimitPerUser(timetoset))
                     //channel.setRateLimitPerUser(timetoset)
                      let modlog = message.guild.channels.find('name', row.logschannel);
                    const embed = new Discord.RichEmbed()
                    .setColor(0x00A2E8)
                    .setTitle("Case #" + row.casenumber + " | Action:  Slow Mode Enabled")
                    .addField("Moderator", message.author.tag + " (ID: " + message.author.id + ")")
                    .addField("Time", timetoset + " Seconds", true)
                    .setFooter("Time used: " + message.createdAt.toDateString())
                    if (!modlog) return;
                    if (row.logsenabled === "disabled") return;
                    return client.channels.get(modlog.id).send({embed});

         }
    })
}