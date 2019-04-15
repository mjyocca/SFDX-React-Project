const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MultipleHTMLPlugin = require('./sfdx-react-scripts/MultipleHTMLPlugin')
const StaticResourcePlugin = require('./sfdx-react-scripts/StaticResourcePlugin')
const SFDXDeployPlugin = require('./sfdx-react-scripts/SFDXDeployPlugin')
const { entry, watch, devServerEntry } = require('./sfdx-react-scripts-config')

module.exports = {
    entry: entry,
    output: {
        filename: '[name]/[name].bundle.js',
        path: path.resolve(__dirname, "force-app/main/default/staticresources/")
    },
    devServer: {
        contentBase: path.join(__dirname, `force-app/main/default/staticresources/${devServerEntry}`),
        port: 3000
    },
    watch: watch,
    watchOptions: {
        aggregateTimeout: 300,
        ignored: /node_modules/
    },
    plugins: [
        new CleanWebpackPlugin(),
        new StaticResourcePlugin(),
        new SFDXDeployPlugin()
    ].concat( MultipleHTMLPlugin(entry, {appMountId: 'root'}) ),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
};