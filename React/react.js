//异步选型 redux-saga, redux-thunk

const {history, location, match} = this.props
history:
	action, push, replace, go, goBack, goForward | location, length, listen
location:
	pathname, search, hash, state 
/*
	<Link to={location} />
	<NaviveLink to={location} />
	<Redirect to={location />
	history.push(location)
	history.replace(location)
*/
match:
	path, url, params, isExact   //嵌套的<Route>, 嵌套的 <Link>


react-update-on
react-transition-group


//6.19 react-router
Router, Route, Link, IndexRoute


//10.20  JSX   Babel在 JSX转换需用到React.createElement(el, attrs, ...elem)

//原生html标签用小写母, React类名以大写字母


//事件处理  绑定this
constructor(props){
	super(props)

	this.handler = this.handler.bind(this)		//1.构造函数绑定this
}
handler = (e) => {}													//2.箭头函数定义, 隐式传递event对象

//绑定this传递参数
onClick = { this.handler.bind(this, arg) }  //3.bind方式传入this: 事件对象e要排在所传递参数的后面 handler(name, e){}  隐式传递event对象
onClick = { (e) => this.handler(e) }				//4.箭头函数绑定: 事件对象e必须显式传递
onClick = { this.handler }									//TODO  未绑定this--当前对象, this非react


//10.24 组件API  容器组件定义state更新修改数据, 子组件只能通过props传递数据
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})
JS不可变



//React.PropTypes 在 React v15.5 版本后已经移到了 prop-types 库
PropTypes.string.isRequired
bool, string, number, symbol, array, object, func, 
arrayOf, objectOf, oneOf
any, element, node, shape, instanceOf

//10.30 生命周期
componentWillMount()
componentDidMount()														//

componentWillRectiveProps()										//每当一个组件接收到一组新的props; this.props, this.nextProps

shouldComponentUpdate(newProps, newState)			//接收新props或state时被调用; 方法返回 false, 则不会WillUpdate(), render(), DidUpdate()
																							//初始化渲染的时候，这个方法不会被调用
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

componentWillUnMount()

componentDidCache

render()																			//每次更新都会重新渲染 willMount render didMount, willUpdate render didUpdate

getDerivedStateFromProps
getSnapsHotBeforeUpdate

//16.2 Fragment片断可以添加多个子节点
//19.4.16
受控、非受控组件						//onChange事件来监听值的变化

<select value={this.state.value} onChange={this.handleChange}>