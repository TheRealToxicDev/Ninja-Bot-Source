const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
var y = "";
var s = "";
exports.run = async (client, message, args) => {
  
 let redeemCodes = [
    "free10k",
    "iam-Broke"
]
  
  /*const results = Math.floor(Math.random() * redeemCodes.length);*/
  
    try {
    const redeemcode = args.join("")
    if (redeemcode === "free10k") {
        //y += `${message.author.id}, `;
        //if (y.includes(message.author.id)) return message.channel.send("You have already redeemed this code")
        //y += `${message.author.id}, `;
        s += `${redeemcode}, ${message.author.id}`;
        if (s.includes(message.author.id)) return message.channel.send("You have already redeemed this code")
        console.log(s)
        sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
        sql.run(`UPDATE profiles SET cash = ${row.cash += 10000} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
        message.channel.send("Code" + "``" + `${redeemcode}` + "``" + "Has been redeemed and i have added 10k to your cash")
        })
    } else {
   if (redeemcode === "iAm-Broke") {
   if (!redeemcode) return message.channel.send("Please provide a code to redeem") 
     //s += `${redeemcode}, ${message.author.id}`;
     //if (s.includes(message.author.id)) return;
     console.log(y)
     sql.get(`SELECT * FROM profiles WHERE guildId ="${message.guild.id}" AND userId ="${message.author.id}"`).then(row => {
     sql.run(`UPDATE profiles SET cash = ${row.cash += 5000} WHERE guildId ="${message.guild.id}" AND userId = ${message.author.id}`);
     message.channel.send("Code" + " ``" + `${redeemcode}` + "`` Has been redeemed and i have added 5k to your cash")
    })
   }
  }
    } catch (err)  {
        message.channel.send("Error happened please report this to the dev: " + err)
    }
}