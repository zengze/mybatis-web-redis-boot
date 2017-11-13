const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    context: path.resolve(__dirname, './src'), //从 context 对应的文件夹开始…
    entry: [
        'babel-polyfill', './index.js', // …寻找 entry 里所有的文件名…
    ],
    output: {
        path: path.resolve(__dirname, './dist/assets'),
        filename: '[name].bundle.js',
        publicPath: '/'
    },

    devServer: {
        contentBase: path.resolve(__dirname, './dist/assets'), // New
        historyApiFallback: true, //很重要 router 是 browserHistory
        host:'0.0.0.0',
        inline:true,
        disableHostCheck: true
    },

    plugins: [
      new HtmlWebpackPlugin(
        {
          title: 'xxxManagementSystem',
          template:'./template.html'
        }
      ),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
],

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        "react", "es2015", "stage-2"
                    ],
                    "plugins": [
                      "transform-runtime",
                      ["import",{"libraryName":"antd","style":true}]
                    ]
                },
                exclude: [/node_modules/]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.woff|.woff2|.svg|.eot|.ttf/,
                use: 'url-loader?file-loader"'
            },
            {
                test: /\.(sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }


        ]
    }
};
