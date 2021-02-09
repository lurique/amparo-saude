const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "../api/views"),
		filename: "bundle.min.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react"
						]
					}
				}
			},
			{

				test: /\.s[ac]ss$/i,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								auto: true,
								localIdentName: "amparo-[local]--[hash:base64:5]"
							}
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "public/index.html")
		})
	]
}