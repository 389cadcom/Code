import utils from "./libs/add.js"
// import { random } from 'lodash'
import random from 'lodash/random'                  //手动按需导入
// import random from "lodash-es/random"

// import Vue from 'vue'
// import {Button} from 'vant'

console.log(random())
console.log(utils.total(3, 4, 5))

//动态加载
import(/*webpackChunkName:'import'*/ "./libs/promise.js").then(res => {
  console.log('import:', res)
})


import { Button } from 'antd'

console.log(Button)
//全局转化
/*
var _button = require('antd/lib/button')
require('antd/lib/button/style/css')

import Button from 'antd/lib/button'        
import 'antd/es/button/style/index'         

ReactDOM.render(
  <Button type="primary">xxx</Button>
)
*/
