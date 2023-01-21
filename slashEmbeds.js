module.exports = {
    reload: {
        name: 'Reload',
        description: 'Reload bot commands or events',
        fields: [
            { name: 'Usage', value: '/reload <commands/events>'}
        ]
    },
    help: {
        name: 'Help',
        description: 'Get info about a command or get command list',
        fields: [
            { name: 'Usage', value: '/help [command]'},
            { name: 'Example', value: '/help ping'},
        ],
    },
    ping: {
        name: 'Ping',
        description: 'Get bot latency',
        fields: [
            { name: 'Usage', value: '/ping' }
        ],
    }
}