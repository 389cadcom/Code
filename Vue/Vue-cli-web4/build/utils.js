'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
      //return ['vue-style-loader', MiniCssExtractPlugin.loader, ...loaders]
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    /* scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: { resources: path.resolve(__dirname, '../src/assets/sass/_variable.scss') }        //string, arr
    }), */
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

//多入口
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const roots = path.resolve(__dirname, '../src/pages/')

console.log(glob.sync(roots + '/*.js'))             //如何获取当前目录及子目录
console.log(glob.sync(roots + '/*/**/*.js'))        //如何获取当前目录及子目录

exports.getEntries = function(){
  var homes = glob.sync(roots + '/*.js');
  var childs = glob.sync(roots + '/*/*.js');
  var maps = {}, files = [...homes, ...childs]

  files.forEach( file => {
    var name = file.substring(file.lastIndexOf('\/') + 1, file.lastIndexOf('.'));
    maps[name] = file
  })
  return maps
}

exports.getHtmls = function(){
  var homes = glob.sync(roots + '/*.html');
  var childs = glob.sync(roots + '/*/*.html');
  var arr = [], files = [...homes, ...childs];

  files.forEach( (file, i) => {
    var name = file.substring(file.lastIndexOf('\/') + 1, file.lastIndexOf('.'));
    var options = {
      template: file,
      filename: name + '.html',
      inject: true,
      chunks: ['vendor', name]
    }
    arr[i] = new HtmlWebpackPlugin(options)
  })
  return arr;
}
