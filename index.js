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

if (process.argv[2]) {
    client.commands = new Discord.Collection()
    require('./handlers/commands')(client, true)

    console.log(`Refreshing ${client.commands.size} slash commands`);

    const commands = []
    client.commands.forEach(command => {
        commands.push(command.data)
    });

    const rest = new REST({ version: 10 }).setToken(process.env.token)

    return rest.put(
        Routes.applicationCommands('1002272295143878758'),
        { body: commands }
    ).then(data => {
        console.log(`Successfully loaded ${data.length || 0} slash commands.`)
        process.exit(0)
    }).catch(err => {
        console.log(err)
        process.exit(1)
    })
}


client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (client, reload) => require('./handlers/events')(client, reload)
client.loadCommands = (client, reload) => require('./handlers/commands')(client, reload)

client.loadEvents(client, false)
client.loadCommands(client, false)

client.login(process.env.token)