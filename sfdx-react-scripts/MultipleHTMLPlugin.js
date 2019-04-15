const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(entry, options = {}){
    return Object.keys(entry).map(function(entryName){
        return new HtmlWebpackPlugin({
            filename: `${entryName}/index.html`,
            chunks: [entryName],
            title: entryName + ' Page',
            template: 'sfdx-react-scripts/index.html',
            appMountId: options.appMountId || 'root'
        })
    })
}
