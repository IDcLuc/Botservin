const getFiles = require('../util/getFiles')
const fs = require('fs')

module.exports = (bot, reload) => {
    const { client } = bot
    fs.readdirSync("./commands/").forEach(access => {
        const commands = getFiles(`./commands/${access}/`, ".js")

        commands.forEach((f) => {
            if (reload)
                delete require.cache[require.resolve(`../command/${f}`)]

            const command = require(`../commands/${access}/${f}`)
            client.commands.set(command.name, command)
        })
    })
    console.log("v " + client.commands.size + ' commands loaded.')
    client.commands.forEach(c => {
        console.log('| ' + c.name + '.js')
    })
    console.log('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯')
}