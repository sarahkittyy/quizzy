const path = require('path');
require('dotenv').config();

module.exports = {
	mode: 'development',
	entry: './frontend/Main.tsx',
	output: {
		path: path.resolve(__dirname, 'build/frontend'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: 'tsconfig.frontend.json',
					}
				}
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	target: 'web',
	devServer: {
		proxy: {
			'**': `http://${process.env.APP_URL}:${process.env.API_PORT}`,
		},
		host: process.env.APP_URL,
		port: process.env.WEB_PORT,
		writeToDisk: true,
	},
};