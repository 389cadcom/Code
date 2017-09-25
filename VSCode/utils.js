"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs-extra');
const path = require('path');
const js_prettify_1 = require("js-prettify");
const vscode_1 = require("vscode");
const rootPath = vscode_1.workspace.rootPath;
const packageFile = path.join(rootPath, 'package.json');
const prettyConfig = {
    indent_size: 2,
    indent_char: " ",
    indent_level: 0,
    indent_with_tabs: false,
    preserve_newlines: false,
    max_preserve_newlines: 10,
    jslint_happy: false,
    brace_style: "collapse",
    keep_array_indentation: false,
    keep_function_indentation: false,
    space_before_conditional: true,
    break_chained_methods: false,
    eval_code: false,
    unescape_strings: false,
    wrap_line_length: 0
};
function checkExists(path) {
    return fs.existsSync(path);
}
exports.checkExists = checkExists;
function formatCode(content, config = prettyConfig) {
    try {
        return js_prettify_1.js_beautify(content, prettyConfig);
    }
    catch (error) {
        return console.log(error); // lets stop it here :(
    }
}
exports.formatCode = formatCode;
function copyFile(src, dest) {
    try {
        fs.copySync(path.resolve(src), dest);
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.copyFile = copyFile;
function createFile(filePath, content, __JSON__ = false) {
    try {
        if (__JSON__) {
            fs.outputJSONSync(filePath, content);
            return true;
        }
        fs.outputFileSync(filePath, content);
        return true;
    }
    catch (err) {
        return false;
    }
}
exports.createFile = createFile;
function getAppPath() {
    const appPaths = ['app', 'src'];
    const appPath = appPaths.find(f => checkExists(path.join(rootPath, f)));
    return appPath || 'app';
}
exports.getAppPath = getAppPath;
function getBundlePath() {
    const bundlePaths = ['dist', 'out', 'bundle'];
    const bundlePath = bundlePaths.find(f => checkExists(path.join(rootPath, f)));
    return bundlePath || 'dist';
}
exports.getBundlePath = getBundlePath;
function getWebpackConfig() {
    const appPath = getAppPath();
    const bundlePath = getBundlePath();
    return `
    const path = require('path');
    
    module.exports = {
      entry: path.join(__dirname, '${appPath}', 'index'),
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '${bundlePath}'),
		pubicPath: '/${bundlePath}/'
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, '${appPath}')
            ],
            exclude: [ 'node_modules', 'bower_components' ],
            loader: 'babel-loader',
            query: {
              presets: ["env", { "modules": false }]
            }
          },
		  {
			  test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
					//'scss': 'vue-style-loader!css-loader!sass-loader',
					css: ExtractTextPlugin.extract({
						use: ['css-loader'],
						fallback: 'vue-style-loader' 
					})
				}
              }
		  },
		  {
			  test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]',
              }
		  },
        ]
      },
	  plugins:[
		new ExtractTextPlugin('style.css')		
	  ],
      resolve: {
        extensions: ['.js', '.vue', '.css'],
		'vue$': 'vue/dist/vue.esm.js',
      },
      devtool: 'source-map',
      devServer: {
		contentBase: './dist/',
        noInfo: true
      }
    };
  `;
}
exports.getWebpackConfig = getWebpackConfig;
function updateDevDependencies() {
    // if we dont have a package file, then no need to update.
    if (!checkExists(packageFile)) {
        return;
    }
    const dependencies = {
		"webpack": "^2.6.1",
		"webpack-dev-server": "^2.4.5",
		"extract-text-webpack-plugin": "^2.1.2"
	}
    const devDependencies = {
        "babel-core": "^6.21.0",
        "babel-loader": "^6.2.10",
        "babel-preset-es2015": "^6.18.0",
		"cross-env": "^3.0.0",
		"css-loader": "^0.25.0",
		"file-loader": "^0.9.0",
		"node-sass": "^4.5.0",
		"sass-loader": "^5.0.1",
		"style-loader": "^0.18.2"
    }
    const newPackageInfo = Object.assign({}, require(packageFile), {
        dependencies: dependencies,
        devDependencies: devDependencies
    });
    // write JSON to package.
    try {
        fs.writeJsonSync(packageFile, newPackageInfo);
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.updateDevDependencies = updateDevDependencies;
//# sourceMappingURL=utils.js.map