const CracoLessPlugin = require("craco-less");

module.exports = {
	// module: {
	// 	rules: [
	// 		{
	// 			// 命中字体包
	// 			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
	// 			// 只命中指定 目录下的文件，加快Webpack 搜索速度
	// 			include: [paths.toolSrc],
	// 			// 排除 node_modules 目录下的文件
	// 			exclude: /(node_modules)/,
	// 			loader: "file-loader",
	// 			// 新增options配置参数：关于file-loader的配置项
	// 			options: {
	// 				limit: 10000,
	// 				// 定义打包完成后最终导出的文件路径
	// 				outputPath: "assets/fonts/",
	// 				// 文件的最终名称
	// 				name: "[name].[hash:7].[ext]",
	// 			},
	// 		},
	// 	],
	// },
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						// modifyVars: { "@primary-color": "#597ef7" },
						modifyVars: {
							// "primary-color": "#688df2",
							"@primary-color": "#27335c",
							"box-shadow-base":
								"0 4px 10px 0 rgba(20, 19, 34, 0.03), 0 0 10px 0 rgba(20, 19, 34, 0.02)",
							"border-color-base": "#e4e9f0",
							"text-color": "#141322",
							"text-color-secondary": "#595c97",
							theme: "light",
							"font-family": "Arial",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
