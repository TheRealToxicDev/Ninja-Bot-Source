const discord = require('discord.js'); // Require the Discord.JS module.
const client = new discord.Client(); // Instantiate the Discord Client.
const sql = require("sqlite");
sql.open("../assets/guildsettings.sqlite");


/**
 * Make a file called config.json and store your token in there!
 */
//const config = require('./config.json'); // Require your bot token

var userTickets = new Map(); // Create a JS Map Object.
//client.login(process.env.TOKEN);

client.on('ready', () => {
    console.log(client.user.username + " Ninja Text Ticket System Ready.");
});

client.on('message', message => {
  sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
  const prefixtouse = row.prefix
    if(message.author.bot) {
        if(message.embeds.length === 1 && message.embeds[0].description.startsWith('React')) {
            message.react(':ticketreact:625925895013662721')
            .then(msgReaction => console.log('Reacted.'))
            .catch(err => console.log(err));
        }
        if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket Support') {
            message.react(':checkreact:625938016510410772')
            .then(reaction => console.log("Reacted with " + reaction.emoji.name))
            .catch(err => console.log(err));
        }
    };
    /**
     *  Check to see if the command and the message was sent in the correct channel. In the video, I had a channel
     * called "Support" and that will serve as our channel to create tickets in. Make sure you change it to fit your needs or
     * get rid of it.
     */
    if(message.content.toLowerCase() === prefixtouse + 'open' && message.channel.id === '648354276657201182' || '661405687154212864') {
        
        /**
         * Check if the map has the user's id as a key
         * We also need to check if there might be another channel the bot made that it did not delete, (could've been from an old ticket but the bot crashed so the channel was not closed/deleted.)
         */
        if(userTickets.has(message.author.id) || 
        message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + 's-ticket')) {
            message.author.send("You already have a ticket open!");
        } 
        else {
            let guild = message.guild;
            /**
             * Create the channel, pass in params.
             * Make sure you assign appropriate permissions for each role.
             * If you have additional roles: e.g Moderator, Trial Mod, etc. each of them needs permissions for it.
             * You can choose to set up additional permissions.
             */
            guild.createChannel(`${message.author.username}s-ticket`, {
                type: 'text',
                permissionOverwrites: [
                    {
                        allow: 'VIEW_CHANNEL',
                        id: message.author.id
                    },
                    {
                        deny: 'VIEW_CHANNEL',
                        id: guild.id
                    },
                    {
                        allow: 'VIEW_CHANNEL',
                        id: '625907626303160354'
                    }
                ]
            }).then(ch => {
                userTickets.set(message.author.id, ch.id); // Once our channel is created, we set the map with a key-value pair where we map the user's id to their ticket's channel id, indicating that they have a ticket opened.
                message.author.send("Your ticket has been created" + '<#' + ch.id + '>') 
                ch.send(`<@${message.author.id}> Please tell us why you openeed this ticket`)
            }).catch(err => console.log(err));
        }
    }
    else if(message.content.toLowerCase() === prefixtouse + 'close') { // Closing the ticket.
        if(userTickets.has(message.author.id)) { // Check if the user has a ticket by checking if the map has their ID as a key.
            if(message.channel.id === userTickets.get(message.channel.id)) {
                message.channel.delete(message.channel.id) // Delete the ticket.
                .then(channel => {
                    console.log("Deleted " + channel.name);
                    userTickets.delete(message.author.id);
                })
                .catch(err => console.log(err));
            }
        }
        /** 
         * Here we will check the server to see if there were additional tickets created that the bot may have missed due to 
         * either crashing, restarting, etc.. This part will delete ALL of the tickets that follow the format of 
         * "<username>s-ticket" because that was the way we hard-coded. You can modify this obviously.
         */
        if(message.guild.channels.some(channel => channel.name.toLowerCase() === message.author.username + 's-ticket')) {
            message.guild.channels.forEach(channel => {
                if(channel.name.toLowerCase() === message.author.username + 's-ticket') {
                    channel.delete().then(ch => console.log('Deleted Channel ' + ch.id))
                    .catch(err => console.log(err));
                }
            });
        }
    }
});
})
