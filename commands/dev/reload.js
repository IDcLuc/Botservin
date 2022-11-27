const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')

module.exports = {
    data: {
        name: 'reload',
        description: 'Reload bot commands or events',
        options: [
            {
                name: 'commands',
                description: 'Reload comamnds',
                type: ApplicationCommandOptionType.Subcommand
            },
            {
                name: 'events',
                description: 'Reload events',
                type: ApplicationCommandOptionType.Subcommand
            },
        ]
    },
    devOnly: true,
    run: async ({client, interaction}) => {
        switch (interaction.options.getSubcommand()) {
            case 'commands':
                await interaction.reply('Reloading commands.')
                client.loadCommands(client, true)
                await client.loadSlash(client, false)
                interaction.editReply({ content: '', embeds: [new EmbedBuilder().setTitle('Reload').setDescription(`Successfully reloaded ${client.commands.size} commands.`).setColor('Blue')] })
            break;
            case 'events':
                await interaction.reply('Reloading events.')
                client.loadEvents(client, true)
                interaction.editReply({ content: '', embeds: [new EmbedBuilder().setTitle('Reload').setDescription(`Successfully reloaded ${client.events.size} events.`).setColor('Blue')] })
            break;
        }
    }
}