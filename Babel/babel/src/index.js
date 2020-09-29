import utils from "./libs/add.js"
import random from "lodash-es/random"

// import Vue from 'vue'
// import {Button} from 'vant'

//手动按需导入es模块
//  import 'antd/es/button/style/index'
// import Button from 'antd/lib/button'

// ReactDOM.render(
//   <Button type="primary">Click Me</Button>,
//   document.getElementById('app')
// )
console.log(random())
console.log(utils.total(3, 4, 5))

//动态加载
import(/*webpackChunkName:'import'*/ "./libs/promise.js").then(res => {
  console.log(res)
})
