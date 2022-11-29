const { EmbedBuilder, SlashCommandBuilder } = require('discord.js')

module.exports = {
    name: 'reload',
    category: 'dev',
    devOnly: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Reload bot commands or events')
        .addSubcommand(subcommand => 
            subcommand
                .setName('commands')
                .setDescription('Reload commands'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('events')
                .setDescription('Reload events')),
    run: async ({ client, interaction }) => {
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