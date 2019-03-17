//10.20  JSX
表达式、 -->加减乘除、三元 、数组
样式、   -->cameCase, 样式不能写在组件上，写在JSX中 <h1 className='hi' style = {{fontSize:'12px'}}
注释     -->{/**/}  jsx			//  /**/

标签-组件  --> className, htmlFor
ReactDOM.Render(
	<ul>Num.map( txt => <li>{txt}</li>)</ul>,
	document.getElement('el')
)
<ul>{list.map((txt,i) => <li key={i}>{txt}</li>)}</ul>,

//原生html标签用小写母, React类名以大写字母


//10.23  事件处理
//绑定this
this.handler = this.handler.bind(this)
handler = (e) => {}

onClick = { this.handler }   //未绑定this--当前对象, 非react
//绑定this
onClick = { this.handler.bind(this, arg) }
onClick = { (e) => this.handler(e) }


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

shouldComponentUpdate(newProps, newState)			//初始或forceUpdate不被调用
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

compnentWillUnMount()