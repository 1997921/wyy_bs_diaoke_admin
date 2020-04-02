

//nodejs里引用模块
//该HtmlWebpackPlugin简化创建HTML文件的提供给您的WebPack束
const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

//判断是否是线上环境还是开发环境  process.env  在执行webpack的时候传入一个环境变量
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
// presets env 根据环境来打包
module.exports = {
  	entry: './src/app.jsx',
  	output: {
    	path: path.resolve(__dirname, 'dist'),
    	publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.xafa.top/admin-fe/dist/',  //在webpack-dev-server 启动后会用8080端口，会找不到字体文件位置
    	filename: 'js/app.js'
  	},
  	resolve:{
  		alias :{
  			page 		: path.resolve(__dirname, 'src/page'),
  			component 	: path.resolve(__dirname, 'src/component'),
  			util 		: path.resolve(__dirname, 'src/util'),
  			service 	: path.resolve(__dirname, 'src/service')
  		}
  	},
  	module: {
	  	rules: [
	  		//react(jsx)语法的处理
	  		{
			    test: /\.jsx$/,
			    exclude: /(node_modules)/,
			    use: {
			        loader: 'babel-loader',
			        options: {
			          presets: ['env','react']
			        }
			    }
		    },
		    //css文件处理
		    {
		    	test:/\.css$/,
		    	use: ExtractTextPlugin.extract({
		          	fallback: "style-loader",
		          	use: "css-loader"
		        })
		    },
		    //scss文件处理
		    {
		        test: /\.scss$/,
		        use: ExtractTextPlugin.extract({
		          fallback: 'style-loader',
		          use: ['css-loader', 'sass-loader']
		        })
		    },
		    //图片的配置
		    {
		        test: /\.(png|jpg|gif)$/i,
		        use: [
			        {
			            loader: 'url-loader',
			            options: {
			              limit: 8192,
			              name:'resource/[name].[ext]'
			            },
			        },
	        	]
	    	},
	    	//字体图标的配置
		    {
		        test: /\.(eot|svg|ttf|woff|woff2|otf)$/i,
		        use: [
			        {
			            loader: 'url-loader',
			            options: {
			              limit: 8192,
			              name:'resource/[name].[ext]'
			            },
			        },
	        	]
	    	}
		  ]
	},
  	plugins:[
  		//处理html文件
	  	new HtmlWebpackPlugin({
	  		template:'./src/index.html',
	  		favicon : './favicon.ico'
	  	}),
	  	//独立css文件
	  	new ExtractTextPlugin("css/[name].css"),
	  	//提出公共模块
	  	new webpack.optimize.CommonsChunkPlugin({
	  		name:'common',
	  		filename:'js/base.js'
	  	})
  	],
    devServer: {
    	port:8086,
    	historyApiFallback:{
			//如浏览器找不到页面的时候会指定跳到一个页面
			index : '/dist/index.html'
    	},
    	//劫持，解决跨域问题
    	proxy : {
    		'/manage': {
    			target : 'http://localhost:3000/',
    			changeOrigin : true
    			//changeOrigin 劫持并伪装成 target 他发送的请求
    		},
    		'/user': {
    			target : 'http://localhost:3000/',
    			changeOrigin : true
    			//changeOrigin 劫持并伪装成 target 他发送的请求
    		}
    	}
    	//contentBase: './dist',
  	},
};
