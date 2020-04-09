const Discord = require("discord.js");
const bot = new Discord.Client();
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");
var maincommands = [
    "help - Bot will dm you a link with all of the commands.\n",
    "ping - Bot will respond with pong and time it took.\n",
    "embed [text] - Will send a embed with [text].\n",
    "botinfo - Will get all the bots information.\n ",
    "reminder [minutes] [text] - Will send you a reminder for [text] in [time].\n ",
    "invite - Will send you a invite for the bot.\n",
    "serverinfo - Will get the current servers info.\n",
    "serveremojis - Will get the servers emojis.\n",
    "serverroles - Will get the servers roles.\n",
    "credits - Will tell you who created the bot and the contributers.\n",
    "dm - Bot will dm the user with your message.\n",
    "getchannels - Bot will fetch the text/voice channel count.\n",
    "membercount - Bot will fetch the member/bot count.\n",
    "prefix - Will change the bots prefix for the guild.\n",
    "suggestion - Can send a suggestion in the server and vote for it.\n", 
    "issue [details] - Report a issue with the bot.\n", 
    "support - Sends you the support link for the discord server. \n",
    "uptime - Gets the bots uptime.\n",
    "whois @Someone - Gets the users info.\n",
    "mdn [text] - Bot will search mdn (mozilla-developer-network) for a answer\n"
]
var moderationcommands = [
    "ban @Someone [reason] - Will ban that user from the server.\n",
    "unban @Someone [reason] - Will unban that user from the server.\n",
    "softban [ID] [reason] - Will ban then unban that user from the server.\n",
    "hackban [ID] [reason] - Will ban that ID/user from the server.\n",
    "mute @Someone [minutes] [reason] - Will mute that user from the server for the time. \n",
    "unmute @Someone [reason] - Will unmute that user from the server.\n",
    "purge [amount]/@Someone [reason/amount] - Will purge messages from the server/user. \n",
    "clean [amount] - Will delete the bots messages.\n",
    "antiraid [minutes] [reason] - Will disable the default role to send messages.\n",
    "giverole @Someone [rolename] - Will give a user the role you specified.\n",
    "takerole @Someone [rolename] - Will take the role you specified away from the user.\n",
    "roleall [rolename] - Will give all users the role you specified.\n",
    "rroleall [rolename] - Will take the role from all users that you specified.\n",
    "slowmode [seconds] - Will allow users to send a message every x seconds.\n",
    "automod [enable/disable] [automodtool] - Will Turn on the bots automoderation.\n",
    "autorole [rolename] - Will give the role specified when a user joins.\n",
    "logs [1/2/3] - Will give options to edit logs settings.\n",
    "modonly - Will make commands work for mods only (mods/mods+ need at least kick perms to work).\n",
    "createrole [rolename] [rolecolor] - Will create a role with the color and name you want. \n",
    "welcomeleave - Will give you all the options to control the wl system\n",
    "poll [text] - Will start a poll for your members too vote in.\n",
    "nick [text] - Will change the users nickname.\n",
    "warn - @Someone [reason] - Will warn the user wth [reason].\n",
    "warings @Someone - Will show the warnings the current user has.\n",
    "clearwarns @Someone - Will remove all the current warnings a user has.\n"
] 
var funcommands = [
    "slap @Someone - Will send a image of you slapping that user.\n",
    "shit @Someone - Will send a image of you stepping on that user.\n",
    "buttslap @Someone - Will send a image buttslapping that user. [NSFW]\n",
    "rip @Someone - Will send a image paying respects to that user.\n",
    "trigger @Someone - Will send a image of that user being triggered.\n",
    "brazzers @Someone - Will send a image with the brazzers logo on that user.\n",
    "ohno @Someone - Will send a image of ohno with the text you specified.\n",
    "beautiful @Someone - Will send a image of that user in a picture frame.\n",
    "crush @Someone - Will send a image having a crush on that user\n",
    "delete @Someone - Will send a image deleting that user.\n",
    "jail @Someone - Will put the user behind bars.\n",
    "thuglife @Someone - Will put thuglife over a users avatar.\n",
    "rainbow @Someone - Will put a rainbow over a users avatar.\n",
    "approved @Someone - Will put approved over a users avatar.\n",
    "rejected @Someone - Will put rejected over a users avatar.\n",
    "wasted @Someone - Will put wasted over a users avatar.\n",
    "power @Someone - Will put the users avatar over the power character.\n",
    "tattoo @Someone - Will put the users avatar as a tattoo.\n",
    "8ball [question] - Bot will respond with a random 8ball response.\n",
    "coinflip - Bot will respond with heads or tails.\n",
    "yoda [text] - Bot will respond with text in yoda style.\n",
    "cat - Bot will send a random cat photo.\n",
    "roll [maxnumber] - Bot will roll the dice between 1 and max number\n",
    "achievement [text] - Will send you a mincraft achievement.\n",
    "avatar @Someone - Will get the users avatar.\n",
    "booksearch [query] - Will perform a booksearch with the [query] you want.\n",
    "currency [currency1] [currency2] [amount] - Will convert an amount of money to another currency.\n",
    "giphy [query] - Will send a gif based off of the text you provided.\n",
    "google [query] - Will do a google search and send the top 3 results.\n"
]
var funcommands2 = [
    "reverse [text] - Will reverse the text you provided.\n",
    "roblox [query] - Will search for a user on roblox.\n",
    "rr - Will play russian roulette.\n",
    "say [text] - Make the bot say [text].\n",
    "sexyrate - Bot will rate your sexyness from 1 to 100.\n",
    "ship [text] [text] - Will ship you/item with another user/item.\n",
    "slots - Play a game of slots.\n",
    "temp [celsius/fahrenheit] [celsius/fahrenheit] [number] - Will convert a number from celsius fahrenheit.\n",
    "textflip [text] - Flips text upside down.\n",
    "today - Will say something that happened today in history.\n",
    "urban [word] - Will get the definition for a word.\n",
    "weather [location] - Will get the weather for a location.\n",
    "weeb - Will send a random anime image.\n",
    "wikipedia [query] - Will search on wikipedia for [query].\n",
    "wur - Play a game of would you rather.\n",
    "youtube [query] - Will do a youtube video search for [query].\n",
    "fish - Go fishing.",
    "shortenurl - Will reply with a shortned url of the one provided.\n",
    "choose [choice1] [choice2] - Bot chooses between 2 options you provide.\n",
    "nytimes [query] - Will get the most recent news article about [query].\n",
    "meme - Bot will send you a random trending meme from r/dankmemes.\n",
    "showerthoughts - Bot will send you a random post from r/showerthoughts.\n",
    "notes - Bot will allow you to write notes and view notes.\n",
    "advice - Bot will send some random advice.\n",
    "compliment - Bot will compliment the user you tag.\n",
    "percentage [number1] [number2] - Bot will figure out the percent between 2 numbers.\n"
]
var roleplaycommands = [
    "hug @Someone - Will send a image hugging that user.\n",
    "kiss @Someone - Will send a image kissing that user.\n",
    "marry @Someone - Will send a image marrying that user.\n",
    "high-five @Someone - Will send a image high-fiving that user.\n",
    "cuddle @Someone - Will send a image cuddling that user.\n",
    "fist-bump @Someone - Will send a image fist-bumping that user.\n",
    "poke @Someone - Will send a image poking that user.\n",
    "pat @Someone - Will send a image patting that user.\n",
    "punch @Someone - Will send a image punching that user.\n",
    "hold-hands @Someone - Will send a image holding that users hand.\n",
    "tackle @Someone - Will send a image tackle that user.\n",
    "drop-kick @Someone - Will send a image drop kicking that user.\n",
    "snipe @Someone - Will send a image with a Sniper Scope on that Users PFP.\n"
]
var nsfwcommands = [
    "rule34 [query] - Will send a nsfw image based on the [query].\n", 
    "ass - Will send a random nsfw image with ass.\n",
    "tits - Will send a random nsfw image with tits.\n",
    "hentai - Sends a random hentai picture.\n",
    "funnyNSFW - Sends a random nsfw photo that may be funny.\n"
]
var levelcommands = [
    "profile @Someone - Get someones profile.\n",
    "deposit [amount] - Will deposit [amount] into your bank.\n",
    "withdraw [amount] - Will withdraw [amount] from your bank. [5% fee]\n",
    "redeem [code] - Can redeem a code and get something in return for it.\n",
    "transfer @Someone [amount] - Allows you to transfer money to another user.\n",
    "leaderboard [cash/level] - Displays the top 10 in the guild.\n",
    "25 [betamount] - Bet on the dice if it rolls above 25 win x1.25 of your bet.\n",
    "50 [betamount] - Bet on the dice if it rolls above 50 win x1.50 of your bet.\n",
    "75 [betamount] - Bet on the dice if it rolls above 75 win x1.75 of your bet.\n",
    "99 [betamount] - Bet on the dice if it rolls above 99 win x2.00 of your bet.\n",
    "roulette [odd/even] [betamount] - Bet on roulette if you win get x1.25 your bet.\n",
    "rob @Someone - Can try to rob this user for up too 5,000 but dont get caught.\n",
    "work - Work for the day and earn some money. [cooldown: 10 mins]\n",
    "flipcoin [bet] [heads/tails] - Just like coinflip but get to bet money on it.\n",
    "\n\n",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "**These commands require ``MANAGE_GUILD`` Permissions**\n\n",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "givemoney @Someone [amount] - Allows you to give money to a user.\n",
    "takemoney @Someone [amount] - Allows you to take money from that user.\n",
    "givexp @Someone [amount] - Allows you to give money to a user.\n",
    "takexp @Someone [amount] - Allows you to give money to a user.\n",
    "profilesystem - Allows you to enable/disable leveling/cash in your server.\n",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "More Work Commands - ``>help 8``\n",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
]
var musiccommands = [
    "add [query] - Adds music to the queue.",
    "play - Will play the music in the queue.",
    "skip - Will skip the current song.",
    "queue - Will say the current queue.",
    "clearqueue - Will remove all the current songs in the queue",
    "pause - Will pause the current music.",
    "resume - Will resume the current music."
]
var workcommands = [
    "hack - Like work but you can make more money but can get a fine [cooldown 15 mins].\n",
    "construction - Work a day as a Construction worker [cooldown 15 minutes].\n",
    "developer - Work a day as a Developer for a Random Company [cooldown 15 minutes].\n",
    "prostitute - Work a day as a Prostitute [High Fine Risk] [cooldown 15 minutes].\n"
 
]
exports.run = (client, message, args) => { 
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
     const prefixtouse = row.prefix
     const embed10 = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setThumbnail(client.user.avatarURL)
        .setTitle("Command: " + prefixtouse + "help")
	    .addField("Usage", prefixtouse + "help [number]")
        .addField("Options", "[1] - Main commands. \n[2] - Moderation commands.\n[3] - Fun commands. \n[4] - Fun commands page 2. \n[5] - Roleplay comannds. \n[6] - Nsfw commands. \n[7] - Level/Gamble commands.\n[8] - Work commands.\n[9] - Music Commands.")
        .addField("Example", prefixtouse + "help 3")
        .setDescription("Description: " + "Used to get a list of commands.");
 
        const numberpicked = parseInt(args[0])
        if (isNaN(numberpicked)) return message.channel.send(embed10)
        if (numberpicked === 1) {
            const embed = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Main commands")
            .setDescription(maincommands)
            message.author.send(embed).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 2) {
            const embed2 = new Discord.RichEmbed()
            .setColor(0x00A2E8)
            .setTitle("Moderation commands")
            .setDescription(moderationcommands)
            message.author.send(embed2).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 3) {
                const embed3 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Fun commands")
                .setDescription(funcommands)
                message.author.send(embed3).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 4) {
                const embed4 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Fun commands page 2")
                .setDescription(funcommands2)
                message.author.send(embed4).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 5) {
                const embed5 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Roleplay commands")
                .setDescription(roleplaycommands)
                message.author.send(embed5).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 6) {
                const embed6 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("NSFW commands")
                .setDescription(nsfwcommands)
                message.author.send(embed6).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 7) {
                const embed7 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Level/Gamble commands")
                .setDescription(levelcommands)
                message.author.send(embed7).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else if (numberpicked === 8) {
                const embed8 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Work Commands")
                .setDescription(workcommands)
                message.author.send(embed8).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
          } else if (numberpicked === 9) {
                const embed8 = new Discord.RichEmbed()
                .setColor(0x00A2E8)
                .setTitle("Work Commands")
                .setDescription(musiccommands)
                message.author.send(embed8).then(() => message.channel.send("Commands have been sent to you in dms.")).catch(() => message.channel.send("There was a error dming you the command list, make sure you have allow dms from server members on."))
        } else {
            message.channel.send("Did not select valid options")
        }
    })
}
   
