const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: 'ping',
    category: 'info',
	data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Get bot latency'),
	run: async ({ client, interaction }) => {
		await interaction.reply('Pinging..');
        const apiPing = client.ws.ping
        const botPing = Math.abs(interaction.createdTimestamp - Date.now())
        interaction.editReply(`Pong!\nAPI latency: \`\`${apiPing}\`\`\nReply latency: \`\`${botPing}\`\``)
	},
}