// const {appendFile} = require('fs-extra')  type: module无法使用require
import { resolve, join, dirname } from "path"
import { fileURLToPath } from "url"
// import libs from './libs/index.js'      //有package默认commonjs模式, es6需以mjs结尾
import utils from "./libs/add.js"

// import Cookie from './cookie'          //自定义包无法省略主文件名

import lodash from "lodash"
import { random } from "lodash-es" //type='module'

import { name } from "pkg"
import Cookie from "pkg-cookie/lib"

import { five } from "./libs/promise.js"

console.log(five)
