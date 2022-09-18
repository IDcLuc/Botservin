const getFiles = require('../util/getFiles');

module.exports = (bot, reload) => {
    const { client } = bot;

    const events = getFiles('./events/', ".js")

    if (events.length < 1) return console.log("> No event to load")

    events.forEach((f) => {
        if (reload)
            delete require.cache[require.resolve(`../events/${f}`)]

        const event = require(`../events/${f}`)
        client.events.set(event.name, event)
    })

    if (!reload)
        initEvents(bot)

    console.log(`v ${client.events.size} events loaded.`)
    client.events.forEach(e => {
        console.log('| ' + e.name)
    })
    console.log('⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯')
}

function triggerEventHandler(bot, event, args){
    const {client} = bot

    try {
        if (client.events.has(event))
            client.events.get(event).run(bot, args)
        else
            return Promise.reject(Error(`Event ${event} does not exist!`))
    }
    catch(err){
        console.error(err)
    }
}

function initEvents(bot) {
    const {client} = bot
    client.on("message", (channel, tags, message, self) => {
        triggerEventHandler(bot, "message", {channel, tags, message, self})
    })
    client.on('connected', (address, port) => {
        triggerEventHandler(bot, "connected", {address, port})
    })
}