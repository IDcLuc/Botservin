module.exports = {
    name: 'interactionCreate',
    run: async (client, interaction) => {

        const slashcmd = client.commands.get(interaction.commandName)
        if (!slashcmd) return interaction.reply('Invalid slash comamnd')
                
        if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm) && interaction.user.id != '495514555615543329' )
            return interaction.editReply('You don\'t have the required permissions to run this command.')

        if (slashcmd.devOnly && interaction.user.id != '495514555615543329') return interaction.reply({ content: 'Only the bot\'s developers can use this command!', ephemeral: true })

        try {
            slashcmd.run({client, interaction})
        } catch(err) {
            console.log(err)
        }
    }
}