//10.20  JSX
表达式、 -->三元运算 、数组
样式、   -->cameCase				fontSize
注释     -->{/**/}  jsx			//  /**/

标签-组件  --> className, htmlFor
ReactDOM.Render(
	<ul>Num.map( txt => <li>{txt}</li>)</ul>,
	document.getElement('el')
)


//10.22  组件 React.Component
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})


//10.23  事件处理
//绑定this
this.handler = this.handler.bind(this)
handler = (e) => {}

onClick = { this.handler }   //未绑定this--当前对象, 非react
//绑定this
onClick = { this.handler.bind(this, arg) }
onClick = { (e) => this.handler(e) }


//10.24 组件API
setState
replaceState

setProps
replaceState

fouceUpdate
findNodeDOM

isMounted

//10.25 循环 key--JSX
<ul>{list.map((txt,i) => <li key={i}>{txt}</li>)}</ul>,



//10.30 生命周期
componentWillMount()
componentDidMount()

componentWillRectiveProps()

shouldComponentUpdate(newProps, newState)			//初始或forceUpdate不被调用
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

compnentWillUnMount()