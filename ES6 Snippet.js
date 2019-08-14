//imrc imrcp  imrd  imrr
imr→	import React from 'react'
imrd→	import ReactDOM from 'react-dom'
imrc→	import React, { Component } from 'react'
imrcp→	import React, { Component } from 'react' & import PropTypes from 'prop-types'
imrpc→	import React, { PureComponent } from 'react'
imrpcp→	import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'
imrm→	import React, { memo } from 'react'
imrmp→	import React, { memo } from 'react' & import PropTypes from 'prop-types'

impt→	import PropTypes from 'prop-types'
imrr→	import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


//cp, cs 解构
cp→	  this.props.propName
cs→	  this.state.stateName

//r开头生成--类组件   rcc, rfc, rafc | rce, rfce,
rcc  → export default class									   //组合生成组件
rccp →  export default class    prop-types
rce  → export class ; export default;					 //导出当前及默认
rcep → import react, component, prop-types  --> static propTypes

//生成--函数组件
rfc  → export default function(){}						//直接导出
rfce → fn export default test									//定义再导出
rafc → const name = ()=>({})									//先定义常量，再导出
rfcp → export default,  prop-types


//构造函数  con
rconst→	constructor(props) with this.state			//1.构造函数
rconc→	constructor(props, context) with this.state

met→  methodName     //方法名箭头函数						//2.箭头属性方式
bnd→								 //函数绑定this																

ren→	render() { return( ) }										//3.渲染  
est→	this.state = { }													//0.定义类属性state = {}
sst→	this.setState({ })												//4.设置状态
ssf→	this.setState((state, props) => return { })


cwm→	componentWillMount = () => { }					 //5.生命周期
cdm→	componentDidMount = () => { }
cwr→	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu→	shouldComponentUpdate = (nextProps, nextState) => { }
cwup→	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup→	componentDidUpdate = (prevProps, prevState) => { }
cwun→	componentWillUnmount = () => { }

gdsfp→	static getDerivedStateFromProps(nextProps, prevState) { }
gsbu→	getSnapshotBeforeUpdate = (prevProps, prevState) => { }


//ES6 base  im  ex
//import 默认、模块、别名
imp→	import moduleName from 'module'
imd→	import { destructuredModule } from 'module'
ima→	import { originalName as aliasName} from 'module'
ime→	import * as alias from 'module'
imn→	import 'module'

//export 默认、模块、别名
exp→	export default moduleName
exd→	export { destructuredModule } from 'module'
exa→	export { originalName as aliasName} from 'module'

//导出函数
enf→	export const functionName = (params) => { }		//export name function
edf→	export default (params) => { }                //export default function

//导出类
ecl→  export default class													//exports default class
ece→  export default class name extends base				//exports default class extends


//箭头函数
met  →  method = (params)=>{}										//定义箭头函数属性
anfn →																					//箭头匿名函数
afn	 →	function(params) { }										//匿名函数

nfn  →																					//定义常量箭头函数
fn   →  function methodName (params) { }				//普通函数
iife


//for
for
fre→	arrayName.forEach(element => { }
fof→	for(let itemName of objectName { }
fin→	for(let itemName in objectName { }

//解构
dob→	const {propName} = objectToDescruct			
dar→	const [propName] = arrayToDescruct


//class
con→   constructor(){ }
pge→   get propertyName() {return value;}
pse→   set propertyName(value) {}

//promise
prom→	  return new Promise((resolve, reject) => {});
thenc→  .then((res) => {).catch((err) 

//定时器
sti→	setInterval(() => { }, intervalTime
sto→	setTimeout(() => { },  delayTime


//ES
gi -> document.getElementById()
qs -> document.querySelector()
cel-> document.createElement()


gc   document.getElementByClassName
gt   document.getElementsByTagName
qsa  document.querySelectorAll

ga	 document.getAttribute
sa	 document.setAttribute
ra	 document.removeAttribute

ae	 addEventListener    --re
ac	 appendChild
rc	 removeChild

[ca] classList.add
classList.toggle, remove, add


si   setInterval
sto   setTimeout
apply
call
pr	 prototype
tc	 textContent
ih	 innerHTML

//JSON
us	 'use strict'
js   JSON.stringify
jp   JSON.parse