const { REST, Routes } = require('discord.js')

module.exports = async (client, exit) => {
    client.loadCommands(client, true)

    console.log(`Refreshing ${client.commands.size} slash commands`);

    const commands = []
    client.commands.forEach(command => {
        commands.push(command.data)
    });

    const rest = new REST({ version: 10 }).setToken(process.env.token)

    await rest.put(
        Routes.applicationCommands('1002272295143878758'),
        { body: commands }
    ).then(data => {
        console.log(`Successfully loaded ${data.length || 0} slash commands.`)
        if (exit) process.exit(0)
    }).catch(err => {
        console.log(err)
        process.exit(1)
    })
}