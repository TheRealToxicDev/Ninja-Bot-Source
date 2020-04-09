const Discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');

exports.run = (client, message, args, params) => {
    var milliseconds = parseInt((client.uptime % 1000) / 100),
        seconds = parseInt((client.uptime / 1000) % 60),
        minutes = parseInt((client.uptime / (1000 * 60)) % 60),
        hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
 
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      const embed = new Discord.RichEmbed()
            .setTitle("Bot Uptime")
            .setDescription("I have been online for")
            .addField("Hours", hours)
            .addField("Minutes", minutes)
            .addField("Seconds", seconds)
 
       // message.channel.send(":chart_with_upwards_trend: I've been running for** " + hours + " **hours, **" + minutes + "** minutes and **" + seconds + "." + milliseconds + "** seconds!");
      return message.channel.send(embed)
}