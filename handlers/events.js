const getFiles = require('../util/getFiles')

module.exports = (bot, reload) => {
    const { client } = bot
    let events = getFiles("./events/", ".js")

    if (events.length === 0){
        return console.log("No events to load")
    }

    events.forEach((file, i) => {
        if (reload)
            delete require.cache[require.resolve('../events/file')]
        const event = require(`../events/${file}`)        
        void client.events.set(event.name, event)
        if (!reload)
            console.log(`${i + 1}. ${file} loaded`)
    })
    if (!reload)
        initEvents(bot)

}

function triggerEventHandler(bot, event, ...args) {
    const {client} = bot

    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, ...args)
        else
            throw new Error(`Event "${event}" doesn't exist!`)
    } catch(err) {
        console.log(err)
    }
}

function initEvents(bot) {
    const {client} = bot 

    client.on("ready", () => {
        triggerEventHandler(bot, "ready")
    })

    client.on("interactionCreate", interaction => {
        triggerEventHandler(bot, "interactionCreate", interaction)
    })
}