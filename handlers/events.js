const getFiles = require('../util/getFiles')

module.exports = (client, reload) => {
    let events = getFiles("./events/", ".js")

    if (events.length === 0){
        return console.log("No events to load")
    }

    events.forEach((file, i) => {
        if (reload)
            delete require.cache[require.resolve(`../events/${file}`)]
        const event = require(`../events/${file}`)        
        void client.events.set(event.name, event)
        if (!reload)
            console.log(`${i + 1}. ${file} loaded`)
    })
    if (!reload)
        initEvents(client)

}

function triggerEventHandler(client, event, ...args) {

    try {
        if (client.events.has(event))
            client.events.get(event).run(client, ...args)
        else
            throw new Error(`Event "${event}" doesn't exist!`)
    } catch(err) {
        throw new Error(err)
    }
}

function initEvents(client) {
    client.on("ready", () => {
        triggerEventHandler(client, "ready")
    })

    client.on("interactionCreate", interaction => {
        triggerEventHandler(client, "interactionCreate", interaction)
    })
}