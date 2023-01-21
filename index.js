const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessageReactions"
    ],
    partials: [
        Discord.Partials.Message,
        Discord.Partials.Channel,
        Discord.Partials.Reaction
    ]
})

client.categories = fs.readdirSync('./commands/')
client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (client, reload) => require('./handlers/events')(client, reload)
client.loadCommands = (client, reload) => require('./handlers/commands')(client, reload)
client.loadSlash = (client) => require('./handlers/slashcommands')(client)

if (process.argv[2]) return client.loadSlash(client, true)

client.loadEvents(client, false)
client.loadCommands(client, false)

client.login(process.env.token)