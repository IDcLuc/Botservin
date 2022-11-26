const fs = require('fs')
const getFiles = require('../util/getFiles')
module.exports = ({ client }, reload) => {
    fs.readdirSync('./commands/').forEach(category => {
        getFiles(`./commands/${category}`, ".js").forEach(f => {
            if (reload) delete require.cache[require.resolve(`../commands/${category}/${f}`)]
            const slashcmd = require(`../commands/${category}/${f}`)
            if ('data' in slashcmd && 'run' in slashcmd) client.commands.set(slashcmd.data.name, slashcmd)
            else throw new Error(`File ${f} in ${category} missing data or run`)
        })
    })
    if (client.commands.size == 0) console.log('No slash command loaded')
    else console.log(`${client.commands.size} commands loaded.`)

}