const welcomeCard = require("../util/welcomeCard")

module.exports = {
    name: 'guildMemberAdd',
    run: async (_, member) => {
        const img = await welcomeCard(member, member.guild)
        member.guild.channels.cache.find(c => c.name.includes('welcome')).send({ files: [img] })
    }
}