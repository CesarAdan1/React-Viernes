const Dotenv = require('dotenv-webpack');
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/webpack'),
        filename: 'main.js',
        publicPath: '/',
        pathinfo: false
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'graphql-tag/loader'
                }
                
              },
            {
                test: /\.(jpg|png|gif|pdf|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                        },
                    },
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }, 
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
              },
           
        ]
    },

    devServer: {
        historyApiFallback: true,
      },
    plugins: [
        new HtmlWebPackPlugin({
            title: "Woperti Service Central",
            template: "./src/public/index.html",
            filename: "index.html"

        }),
        new Dotenv({
            path: './.env', // load this now instead of the ones in '.env'
            safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
            systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: true, // hide any errors
            defaults: false
          }),
        new webpack.IgnorePlugin(/\/iconv-loader$/),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
          }),
        new FaviconWebpackPlugin({
            logo: './src/public/woperti.png',
            mode: 'webapp',
            cache: true
        })
    ]
};