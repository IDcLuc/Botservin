module.exports = {
	data: {
        name: 'ping',
        description: 'Get bot latency'
    },
	run: async ({client, interaction}) => {
		const reply = await interaction.reply('Pinging..');
        const apiPing = client.ws.ping
        const botPing = Math.abs(interaction.createdTimestamp - Date.now())
        interaction.editReply(`Pong!\nAPI latency: \`\`${apiPing}\`\`\nReply latency: \`\`${botPing}\`\``)
	},
}