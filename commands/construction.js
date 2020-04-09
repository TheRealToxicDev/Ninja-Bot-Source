/*const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const talkedRecently = new Set();
exports.run = (client, message, args) => {
    if (talkedRecently.has(message.author.id)) return message.channel.send("You already worked in the last 10 mins please wait.")
            sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
                if (!row) return;
                var dice = Math.floor(Math.random() * 1000 + 500);
                    sql.run(`UPDATE profiles SET cash = ${row.cash += dice} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
                    message.channel.send("You worked for the day as a construction worker and earned: $" + dice +", new balance: $" + row.cash + ", you can work again in 10 minutes.")
                    talkedRecently.add(message.author.id);
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 10 * 60000);
          })
}*/
 
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
const talkedRecently = new Set();
exports.run = (client, message, args) => {
  if (talkedRecently.has(message.author.id))
    return message.channel.send(
      "You already worked construction in the last 15 mins please wait."
    );
  sql
    .get(
      `SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`
    )
    .then(row => {
      if (!row) return;
      var dice = Math.floor(Math.random() * 1000 + 500);
      var dice2 = Math.floor(Math.random() * 3);
      var dice3 = Math.floor(Math.random() * 400 + 200);
      var possiblethingstohack = ["Apartment Building", "Business Complex", "Baseball Arena", "Game Studio", "Office", ];
      if (dice2 >= 2) {
        message.channel.send(
          "You were fired from your job as a Construction Worker building a " +
            possiblethingstohack[
              Math.floor(Math.random() * possiblethingstohack.length)
            ] +
            " and paid a fine of: $" +
            dice3
        );
        sql.run(
          `UPDATE profiles SET cash = ${(row.cash -= dice3)} WHERE guildId ="${
            message.guild.id
          }" AND userId = ${message.author.id}`
        );
      } else {
        sql.run(
          `UPDATE profiles SET cash = ${(row.cash += dice)} WHERE guildId ="${
            message.guild.id
          }" AND userId = ${message.author.id}`
        );
        message.channel.send(
          "You completed your day as a Construction Worker you succesfully built a " +
            possiblethingstohack[
              Math.floor(Math.random() * possiblethingstohack.length)
            ] +
            " and earned $" +
            dice +
            " from it, you can work again in 15 mins"
        );
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 15 * 60000);
      }
    });
};
 