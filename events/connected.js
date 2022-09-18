module.exports = {
    name: 'connected',
    run: async ({ client }, {address, port}) => {
        console.log(`Connected to ${address} on port ${port}`)
    }
}