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

rconst��	constructor(props) with this.state
rconc��	constructor(props, context) with this.state

cwm��	componentWillMount = () => { } DEPRECATED!!!
cdm��	componentDidMount = () => { }
cwr��	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu��	shouldComponentUpdate = (nextProps, nextState) => { }
cwup��	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup��	componentDidUpdate = (prevProps, prevState) => { }
cwun��	componentWillUnmount = () => { }

gdsfp��	static getDerivedStateFromProps(nextProps, prevState) { }
gsbu��	getSnapshotBeforeUpdate = (prevProps, prevState) => { }

ren��	render() { return( ) }
est��	this.state = { }
sst��	this.setState({ })
ssf��	this.setState((state, props) => return { })
props��	this.props.propName
state��	this.state.stateName


//ES6 base
//import
imp��	import moduleName from 'module'
imn��	import 'module'
imd��	import { destructuredModule } from 'module'
ime��	import * as alias from 'module'
ima��	import { originalName as aliasName} from 'module'

//export
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

//function
nfn��	const functionName = (params) => { }
fn��   function methodName (arguments) { }


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