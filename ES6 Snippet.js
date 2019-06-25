//imr  react
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


//构造函数  con
rconst→	constructor(props) with this.state     
rconc→	constructor(props, context) with this.state
 
ren→	render() { return( ) }										//渲染  
est→	this.state = { }													//定义类属性state = {}
sst→	this.setState({ })
ssf→	this.setState((state, props) => return { })

met→  methodName     //方法名箭头函数
bnd→								 //函数绑定this

//cp, cs 解构
cp→	  this.props.propName
cs→	  this.state.stateName

//r开头生成--类组件
rcc  → export default class									   //组合生成组件
rccp →  export default class
rce  → export class ; export default;
rcep → import react, component, prop-types

//生成--函数组件
rfc  → export default function(){}
rfce → export default c
rfcp →												  prop-types

cwm→	componentWillMount = () => { }					 //生命周期
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


//for
for
fre→	arrayName.forEach(element => { }
fof→	for(let itemName of objectName { }
fin→	for(let itemName in objectName { }

//解构
dob→	const {propName} = objectToDescruct			
dar→	const [propName] = arrayToDescruct

//function
fn→   function methodName (arguments) { }
nfn→	const functionName = (params) => { }		//namedFunction
met→  method = (params)=>{}										//定义箭头函数

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

classList.toggle, remove, add


iife
fn
afn	 匿名fn

si   setInterval
sto   setTimeout
apply
call
pr	 prototype
tc	 textContent
ih	 innerHTML

us	 'use strict'
js   JSON.stringify
jp   JSON.parse