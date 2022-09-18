module.exports = {
    name: "lurk",
    access: "owners",
    cooldown: 5,
    onCooldown: false,
    run: async (bot, {channel, tags}) => {
        const { client } = bot
        client.say(channel, `Thanks for lurking, ${tags.username}! If you need to mute the stream, please mute the tab and not the stream so you count as a viewer.`)
    }
}