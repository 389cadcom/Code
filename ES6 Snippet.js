//imrc imrcp  imrd  imrr
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


//cp, cs �⹹
cp��	  this.props.propName
cs��	  this.state.stateName

//r��ͷ����--�����   rcc, rfc, rafc | rce, rfce,
rcc  �� export default class									   //����������
rccp ��  export default class    prop-types
rce  �� export class ; export default;					 //������ǰ��Ĭ��
rcep �� import react, component, prop-types  --> static propTypes

//����--�������
rfc  �� export default function(){}						//ֱ�ӵ���
rfce �� fn export default test									//�����ٵ���
rafc �� const name = ()=>({})									//�ȶ��峣�����ٵ���
rfcp �� export default,  prop-types


//���캯��  con
rconst��	constructor(props) with this.state			//1.���캯��
rconc��	constructor(props, context) with this.state

met��  methodName     //��������ͷ����						//2.��ͷ���Է�ʽ
bnd��								 //������this																

ren��	render() { return( ) }										//3.��Ⱦ  
est��	this.state = { }													//0.����������state = {}
sst��	this.setState({ })												//4.����״̬
ssf��	this.setState((state, props) => return { })


cwm��	componentWillMount = () => { }					 //5.��������
cdm��	componentDidMount = () => { }
cwr��	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu��	shouldComponentUpdate = (nextProps, nextState) => { }
cwup��	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup��	componentDidUpdate = (prevProps, prevState) => { }
cwun��	componentWillUnmount = () => { }

gdsfp��	static getDerivedStateFromProps(nextProps, prevState) { }
gsbu��	getSnapshotBeforeUpdate = (prevProps, prevState) => { }


//ES6 base  im  ex
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

//��������
enf��	export const functionName = (params) => { }		//export name function
edf��	export default (params) => { }                //export default function

//������
ecl��  export default class													//exports default class
ece��  export default class name extends base				//exports default class extends


//��ͷ����
met  ��  method = (params)=>{}										//�����ͷ��������
anfn ��																					//��ͷ��������
afn	 ��	function(params) { }										//��������

nfn  ��																					//���峣����ͷ����
fn   ��  function methodName (params) { }				//��ͨ����
iife


//for
for
fre��	arrayName.forEach(element => { }
fof��	for(let itemName of objectName { }
fin��	for(let itemName in objectName { }

//�⹹
dob��	const {propName} = objectToDescruct			
dar��	const [propName] = arrayToDescruct


//class
con��   constructor(){ }
pge��   get propertyName() {return value;}
pse��   set propertyName(value) {}

//promise
prom��	  return new Promise((resolve, reject) => {});
thenc��  .then((res) => {).catch((err) 

//��ʱ��
sti��	setInterval(() => { }, intervalTime
sto��	setTimeout(() => { },  delayTime


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