const Discord = require('discord.js');
const {Routes, REST} = require('discord.js');
const getFiles = require('./util/getFiles');
require('dotenv').config()

const client = new Discord.Client({
    intents: [
        "Guilds",
        "GuildMembers",
        "GuildMessages",
    ],
})

const bot = {
    client,
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

client.loadSlash = async () => {
    console.log(`Refreshing ${client.commands.size} slash commands`);

    const commands = []
    
    client.commands.forEach(command => {
        commands.push(command.data)
    });

    const rest = new REST({ version: 10 }).setToken(process.env.token)

    await rest.put(
        Routes.applicationCommands('1002272295143878758'),
        { body: commands }
    ).then(data => console.log(`Successfully loaded ${data.length || 0} slash commands.`))
}

if (process.argv[2]) client.loadSlash()

module.exports = client

void client.login(process.env.token)