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
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
	},
	target: 'web',
	devServer: {
		proxy: {
			'**': 'http://localhost:' + process.env.API_PORT,
		},
		port: process.env.WEB_PORT,
		writeToDisk: true,
	},
};