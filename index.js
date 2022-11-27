const Discord = require('discord.js');
const {Routes, REST} = require('discord.js');
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
    ],
})


client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (client, reload) => require('./handlers/events')(client, reload)
client.loadCommands = (client, reload) => require('./handlers/commands')(client, reload)
client.loadSlash = (client) => require('./handlers/slashcommands')(client)

if (process.argv[2]) return client.loadSlash(client, true)

client.loadEvents(client, false)
client.loadCommands(client, false)

client.login(process.env.token)