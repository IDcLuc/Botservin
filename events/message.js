const cooldowns = new Map();

module.exports = {
    name: 'message',
    run: ({ client, prefix, owners }, { channel, tags, message, self }) => {
        // If the message is sent by the bot, ignore message
        if (self) return;

        client.checks.forEach(c => {
            c.run(client, channel, tags, message)
        })

        // If the message doesn't start with the prefix, ignore message
        if (!message.startsWith(prefix)) return;

        const args = message.slice(prefix.length).trim().split(/ +/g)
        const cmdstr = args.shift().toLowerCase()
        // Look for command
        let command = client.commands.get(cmdstr)
        // If none found, ignore message
        if (!command) return;

        // Check if user is under cooldown
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Map());
        }

        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = command.cooldown * 1000;
        const now = Date.now()

        if (timestamps.has(tags.username && !owners.includes(tags.username))) {
            const expirationTime = timestamps.get(tags.username) + cooldownAmount;

            if (now < expirationTime) {
                return client.say(channel, `Please wait ${((expirationTime - now) / 1000).toFixed(1)} more seconds to use this command again.`);
            }
        }

        timestamps.set(tags.username, now);

        if (require('../util/canAccess')(owners, tags, command.access)) {
            try {
                command.run({client, prefix, owners}, {channel, tags, message, args})
            } catch (e) {
                console.error(e)
            }
        }
        else client.say(channel, "You don't have access to this command.")
    }
}