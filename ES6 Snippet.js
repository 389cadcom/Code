//react
imr¡ú	import React from 'react'
imrd¡ú	import ReactDOM from 'react-dom'
imrc¡ú	import React, { Component } from 'react'
imrcp¡ú	import React, { Component } from 'react' & import PropTypes from 'prop-types'
imrpc¡ú	import React, { PureComponent } from 'react'
imrpcp¡ú	import React, { PureComponent } from 'react' & import PropTypes from 'prop-types'
imrm¡ú	import React, { memo } from 'react'
imrmp¡ú	import React, { memo } from 'react' & import PropTypes from 'prop-types'
impt¡ú	import PropTypes from 'prop-types'
imrr¡ú	import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

rconst¡ú	constructor(props) with this.state
rconc¡ú	constructor(props, context) with this.state

cwm¡ú	componentWillMount = () => { } DEPRECATED!!!
cdm¡ú	componentDidMount = () => { }
cwr¡ú	componentWillReceiveProps = (nextProps) => { } DEPRECATED!!!
scu¡ú	shouldComponentUpdate = (nextProps, nextState) => { }
cwup¡ú	componentWillUpdate = (nextProps, nextState) => { } DEPRECATED!!!
cdup¡ú	componentDidUpdate = (prevProps, prevState) => { }
cwun¡ú	componentWillUnmount = () => { }

gdsfp¡ú	static getDerivedStateFromProps(nextProps, prevState) { }
gsbu¡ú	getSnapshotBeforeUpdate = (prevProps, prevState) => { }

ren¡ú	render() { return( ) }
est¡ú	this.state = { }
sst¡ú	this.setState({ })
ssf¡ú	this.setState((state, props) => return { })
props¡ú	this.props.propName
state¡ú	this.state.stateName


//ES6 base
//import
imp¡ú	import moduleName from 'module'
imn¡ú	import 'module'
imd¡ú	import { destructuredModule } from 'module'
ime¡ú	import * as alias from 'module'
ima¡ú	import { originalName as aliasName} from 'module'

//export
exp¡ú	export default moduleName
exd¡ú	export { destructuredModule } from 'module'
exa¡ú	export { originalName as aliasName} from 'module'

enf¡ú	export const functionName = (params) => { }
edf¡ú	export default (params) => { }

//for
for
fre¡ú	arrayName.forEach(element => { }
fof¡ú	for(let itemName of objectName { }
fin¡ú	for(let itemName in objectName { }

//function
nfn¡ú	const functionName = (params) => { }
fn¡ú   function methodName (arguments) { }


//class
con¡ú   constructor(){ }
met¡ú	methodName = (params) => { }
pge¡ú   get propertyName() {return value;}
pse¡ú   set propertyName(value) {}

//promise
prom¡ú	  return new Promise((resolve, reject) => {});
thenc¡ú  .then((res) => {).catch((err) 

sti¡ú	setInterval(() => { }, intervalTime
sto¡ú	setTimeout(() => { }, delayTime