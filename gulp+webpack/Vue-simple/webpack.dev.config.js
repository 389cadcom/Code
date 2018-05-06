var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    // ����ģ�����õľ���·��ǰ׺
    //context: path.resolve(__dirname, '../'),
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'static/js/build.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                /* use: ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        }) */
            },
            {
                test: /\.scss|\.sass$/,
                use: ['vue-style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
                        sass: [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                    //extractCSS: true
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/img/[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    //ģ�鷽ʽ����,jqueryδ��ʶ��
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        /* new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }), */
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        })
    ]
}
