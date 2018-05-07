const path = require('path')
const glob = require('glob')
const merge  = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let PAGES_PATH = path.resolve(__dirname, './src/pages')

exports.entries = function(){
    var entryFiles = glob.sync(PAGES_PATH + '/*/*.js')
    var map = {}
    entryFiles.forEach(filePath => {
        var filename = filePath.substring(filePath.lastIndexOf('\/')+1, filePath.lastIndexOf('.'))
        map[filename] = filePath;
    });
    return map;
}
exports.htmls = function(){
    var entryHtml = glob.sync(PAGES_PATH + '/*/*.html')
    var arr = []
    entryHtml.forEach(filePath => {
        var filename = filePath.substring(filePath.lastIndexOf('\/')+1, filePath.lastIndexOf('.'))
        var conf = {
            template: filePath,
            filename: filename + '.html',
            chunks: ['common', 'vendor', 'runtime', filename]
        }
        /* conf = merge(conf, {

        }) */
        arr.push(new HtmlWebpackPlugin(conf));
        
    });
    return arr;
}