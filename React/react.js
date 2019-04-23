//10.20  JSX   Babel在 JSX转换需用到React.createElement
表达式、 -->加减乘除、三元 、数组运算
样式、   -->cameCase, 样式不能写在组件上，写在JSX中 <h1 className='hi' style = {{fontSize:'12px'}}
注释     -->{/**/}  jsx			//  /**/

标签-组件  --> className, htmlFor
ReactDOM.Render(
	<ul>{list.map((txt,i) => <li key={i}>{txt}</li>)}</ul>,
	document.getElement('el')
)

function NumberList(props){
	var arr = props.arr
	var ListItems = arr.map( (item, i) => (
		<ListItem key = {i} value={item}/>
	))

	return (
		<ul>
			{ListItems}
		</ul>
	)
}

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
onClick = { this.handler }									//TODO  未绑定this--当前对象, 非react


//10.24 组件API  容器组件定义state更新修改数据, 子组件只能通过props传递数据
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})

//1.有无状态
state						//可以根据与用户交互来改变
setState				//this.setState(state => state.count = 1 )
replaceState

this.props			//子组件通过props传递数据
defaultProps
setProps
replaceState

fouceUpdate
findNodeDOM

isMounted



//React.PropTypes 在 React v15.5 版本后已经移到了 prop-types 库


//10.30 生命周期
componentWillMount()
componentDidMount()

componentWillRectiveProps()

shouldComponentUpdate(newProps, newState)			//接收新props或state时被调用, 初始或forceUpdate不被调用
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

componentWillUnMount()

componentDidCache

render()																			//每次更新都会重新渲染 willMount render didMount, willUpdate render didUpdate



//16.2 Fragment片断可以添加多个子节点
//19.4.16
受控、非受控组件						//onChange事件来监听值的变化

<select value={this.state.value} onChange={this.handleChange}>