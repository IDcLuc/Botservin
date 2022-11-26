module.exports = {
    name: 'interactionCreate',
    run: async ({client}, interaction) => {

        const slashcmd = client.commands.get(interaction.commandName)
        if (!slashcmd) return interaction.reply('Invalid slash comamnd')
                
        if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
            return interaction.editReply('You don\'t have the required permissions to run this command.')

        try {
            slashcmd.run({client, interaction})
        } catch(err) {
            console.log(err)
        }
    }
}