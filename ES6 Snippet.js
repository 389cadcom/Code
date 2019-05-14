//react
imr��	import React from 'react'
imrd��	import ReactDOM from 'react-dom'
imrc��	import React, { Component } from 'react'
imrcp��	import React, { Component } from 'react' & import PropTypes from 'prop-types'
imrpc��	import React, { PureComponent } from 'react'
imrpcp��	import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'
imrm��	import React, { memo } from 'react'
imrmp��	import React, { memo } from 'react' & import PropTypes from 'prop-types'
impt��	import PropTypes from 'prop-types'
imrr��	import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


rconst��	constructor(props) with this.state     //���캯��
rconc��	constructor(props, context) with this.state
 
ren��	render() { return( ) }										//��Ⱦ  
est��	this.state = { }
sst��	this.setState({ })
ssf��	this.setState((state, props) => return { })

//cp, cs �⹹
props��	this.props.propName
state��	this.state.stateName

//r��ͷ--�������
rcc  �� export default class									   //����������
rce  �� export class ; export default;
rcep �� import react, component, prop-types
rccp ��  export default class

rfc  �� export default function(){}
rfce �� export default c
rfcp ��

cwm��	componentWillMount = () => { }					 //��������
cdm��	componentDidMount = () => { }
cwr��	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu��	shouldComponentUpdate = (nextProps, nextState) => { }
cwup��	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup��	componentDidUpdate = (prevProps, prevState) => { }
cwun��	componentWillUnmount = () => { }

gdsfp��	static getDerivedStateFromProps(nextProps, prevState) { }
gsbu��	getSnapshotBeforeUpdate = (prevProps, prevState) => { }


//ES6 base
//import Ĭ�ϡ�ģ�顢����
imp��	import moduleName from 'module'
imd��	import { destructuredModule } from 'module'
ima��	import { originalName as aliasName} from 'module'
ime��	import * as alias from 'module'
imn��	import 'module'

//export Ĭ�ϡ�ģ�顢����
exp��	export default moduleName
exd��	export { destructuredModule } from 'module'
exa��	export { originalName as aliasName} from 'module'

enf��	export const functionName = (params) => { }
edf��	export default (params) => { }

//for
for
fre��	arrayName.forEach(element => { }
fof��	for(let itemName of objectName { }
fin��	for(let itemName in objectName { }

dob��	const {propName} = objectToDescruct			//�⹹
dar��	const [propName] = arrayToDescruct

//function
fn��   function methodName (arguments) { }
nfn��	const functionName = (params) => { }


//class
con��   constructor(){ }
met��	methodName = (params) => { }
pge��   get propertyName() {return value;}
pse��   set propertyName(value) {}

//promise
prom��	  return new Promise((resolve, reject) => {});
thenc��  .then((res) => {).catch((err) 

sti��	setInterval(() => { }, intervalTime
sto��	setTimeout(() => { }, delayTime


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
afn	 ����fn

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