const { username, password, prefix, channels, owners } = require('./config')
const tmi = require('tmi.js');
require('dotenv').config();

const client = new tmi.Client({
    options: {
        debug: false
    },
    connection: {
        secure: true,
        reconnect: true
    },
    identity: {
        username: username,
        password: password
    },
    channels
})

const bot = {
    client,
    prefix,
    owners
}

client.events = new Map();
client.commands = new Map();
client.checks = new Map();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);

client.connect().catch(console.error);

module.exports = bot