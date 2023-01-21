const { EmbedBuilder } = require('discord.js')
const { Client, MessageReaction, User } = require('discord.js')

module.exports = {
    name: 'messageReactionAdd',
    /**
     * @param {Client} client
     * @param {MessageReaction} reaction
     * @param {User} user
     */
    run: async (client, reaction, user) => {
        if (reaction.partial) {
            try {
                await reaction.fetch()
            } catch (e) {
                return console.error(e)
            }
        }
    
        const message = reaction.message
        const guild = message.guild
        if (message.channelId === '1063093263013253212' && message.author.id === client.user.id && !reaction.me) {
            reaction.remove()
            if (guild.channels.cache.find(c => c.name.endsWith(user.id))) return

            const channel = await guild.channels.create({
                name: `ticket-${user.id}`,
                permissionOverwrites: [{
                    id: guild.roles.everyone.id,
                    deny: 'ViewChannel'
                }, {
                    id: '976551876260663356',
                    allow: 'ViewChannel'
                }, {
                    id: message.author.id,
                    allow: 'ViewChannel'
                }]
            }).catch(err => console.log(err))
            
            const embed = new EmbedBuilder()
                .setTitle('Ticket')
                .setDescription('Welcome! A staff member will assist you shortly, please do not ping any staff or you may get punished. To close this ticket, you may ask whoever claimed the ticket to do so.')

            channel.send({ content: '<@&976551876260663356>', embeds: [embed] })
        }
    }
}