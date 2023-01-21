const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")
const slashInfo = require('../../slashEmbeds')

const commands = []
for (cmd in slashInfo) {
    commands.push(cmd)
}

module.exports = {
    name: 'help',
    category: 'info',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get info about a command or get command list')
        .addStringOption(option => 
            option
                .setName('command')
                .setDescription('Command to get info about')
                .setAutocomplete(true)
                .setRequired(false)),
    autocomplete: async ({ interaction }) => {
        const focused = interaction.options.getFocused()

        const filtered = commands.filter(command => command.startsWith(focused))

        await interaction.respond(
            filtered.map(command => ({ name: command, value: command }))
        )
    },
	run: async ({ client, interaction }) => {
        const command = slashInfo[interaction.options.getString('command')?.toLowerCase()]

        if (command) {
            const embed = new EmbedBuilder()
                .setTitle(command.name)
                .setDescription(command.description || "No description found Please report this with /report")
            
            if (command.fields) embed.addFields(command.fields).setFooter({ text: "<required argument> | [optional argument]" })

            interaction.reply({ embeds: [embed] })
        } else {
            const fields = []
            for (let cat of client.categories) {
                fields.push({
                    name: cat[0].toUpperCase() + cat.slice(1),
                    value: client.commands
                        .filter(cmd => cmd.category === cat)
                        .map(cmd => cmd.data.name)
                        .join(', ')
                })
            }
            const embed = new EmbedBuilder()
                .setTitle('Help')
                .setDescription('Use /help <command> to get help for a specific command')
                .addFields(fields)
                
            interaction.reply({ embeds: [embed] })
        }
	},
}
