const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');

const env = process.env.NODE_ENV;
const { cdnPath, serverPath } = require('./config.js');

module.exports = {
    mode: env === 'development' ? 'development' : 'production',

    target: env === 'development' ? 'web' : 'browserslist',

    entry: {
        index: './src/main.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[contenthash].js',
        chunkFilename: 'js/[id].[contenthash].js',
        clean: true,
        publicPath: env !== 'production' ? '' : serverPath,
    },

    devtool: env !== 'production' ? 'eval-source-map' : 'source-map',

    devServer: {
        contentBase: path.join(__dirname, 'src'), // html更改时也能收到监听
        watchContentBase: true,
        host: '0.0.0.0', // 0.0.0.0
        port: 4399,
        useLocalIp: true,
        compress: false,
        hot: true,
        open: true,
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: {"^/api" : ""}
        //     }
        // }
    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(sass|css|scss)$/,
                use: [
                    // 如果在开发过程中回退到 style-loader，否在提取css到独立文件
                    env !== 'production' 
                    ? 'style-loader'
                    : {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: cdnPath, // css里面引用的图片publicPath
                        },
                    },
                    'css-loader', 
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/i,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false, // 不适用ES模块引入，使用CommonJS
                            name: 'images/[name].[ext]',
                            publicPath: env !== 'production' ? '' : cdnPath,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: false, // 是否禁用压缩图片，如果在开发环境下更新太慢可改为禁用
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: path.resolve(__dirname, 'src'),
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'font/[name].[ext]',
                    publicPath: env !== 'production' ? '' : cdnPath,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    name: 'media/[name].[ext]',
                    publicPath: env !== 'production' ? '' : cdnPath,
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new NyanProgressPlugin({
            nyanCatSays: function(progress, messages){
                return progress === 1 && 'OK'
            }
        }),

        // 提取css到单独的文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),

        // 会根据template在输出路径里生成一个html文件，并自动引入打包后的脚本
        // 多页面请添加多个 new HtmlWebpackPlugin()
        new HtmlWebpackPlugin({
            title: 'Hello Title',
            filename: 'index.html',
            template: './src/index.html', 
            // excludeChunks: ['index1.js'] // 当打包多入口时，可以排除掉不需要引入的js文件
        }),
    ],

    // 打包优化项
    optimization: {
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                // 将node_modules中的依赖分离出来
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    resolve: {
        alias: {
            // 修改Vue倍导入时包的路径
            'vue$' : 'vue/dist/vue.esm.js',
        }
    },
}