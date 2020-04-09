const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
const types = ['top'];
exports.run = async (client, message, args) => {
  const word = args.splice(0, args.length).join(' ');
  
  const noWord = new Discord.RichEmbed()
    .setTitle("Umm, You Missed Something!")
    .setDescription("You didnt Provide any ``Search Terms`` for me to look up!")
    .addField("Search Example", "``>urban Discord``")
  
  const nsfwFilter = new Discord.RichEmbed()
    .setTitle("Woah, Lets Try That Again!")
    .setDescription("I can't search for NSFW related Terms")
  
  const noTerms = new Discord.RichEmbed()
    .setTitle("I Couldn't Find That")
    .setDescription("Could not find any results for the Terms Provided")
  try {
    const { body } = await snekfetch
      .get('http://api.urbandictionary.com/v0/define')
      .query({ term: word });
    if (!word) return message.channel.send(noWord)
    if (!body.list.length) return message.channel.send(noTerms);
    const data = body.list[types === 'top' ? 0 : Math.floor(Math.random() * body.list.length)];
    const embed = new Discord.RichEmbed()
      .setAuthor('Urban Dictionary', 'https://i.imgur.com/Fo0nRTe.png', 'https://www.urbandictionary.com/')
      .setURL(data.permalink)
      .setTitle(data.word)
      .setDescription((data.definition))
      .addField('Example', data.example);
    const filtercheck = ["xxx", "porn", "sex", "18+","nsfw", "hentai", "dick", "vagina", "pussy", "man goo", "man-goo", "cum"]
    if (filtercheck.some(word2 => data.definition.toLowerCase().includes(word2))) return message.channel.send(nsfwFilter);
    if (filtercheck.some(word3 => data.word.toLowerCase().includes(word3))) return message.channel.send(nsfwFilter);
    message.channel.send(embed);
  } catch (err) {
    
    const urbanError = new Discord.RichEmbed()
      .setTitle("Something Went Wrong")
      .setDescription("Whoops, it likes like that triggered an Error, If this issue continues please report it to my Developer")
      .addField("Error", `${err.message}`)
      .addField("Report A Error", "``>issue {issue/erroHere}``")
      .setTimestamp()
      .setFooter("Console Error")
    
    return message.channel.send(urbanError);
  }
}
   
