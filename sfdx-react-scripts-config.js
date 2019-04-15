module.exports = {
    //entries go here ex. app: './src/app.js, ...
    entry: {
        app: './src/app.js'
    },
    //entry for dev server will host
    devServerEntry: 'app',
    //for non webpack-dev-server scripts watch for entry changes
    watch: false,
    //scratch or sandbox 
    orgType: 'scratch'
}