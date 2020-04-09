const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
	try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
            .query({ limit: 800 });
    
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh memes!, Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        
        const embed = new Discord.RichEmbed()
        embed.setColor(0x00A2E8)
        embed.setTitle(allowed[randomnumber].data.title)
        embed.setDescription("Posted by: " + allowed[randomnumber].data.author)
        embed.setImage(allowed[randomnumber].data.url)
        embed.addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " | Comments: " + allowed[randomnumber].data.num_comments)
        embed.setFooter("Memes provided by r/dankmemes")
        
        message.delete().catch()
        message.channel.send(embed)
   
    } catch (err) {
        return console.log(err);
    }
}
   
 