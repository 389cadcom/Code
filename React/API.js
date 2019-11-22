1.React在初始化和更新的时候会触发的钩子函数？ 
						constructor, willMount,  render, (sub), didMounted  | sub->update  app->update  render

2.父组件在更新状态的时候父组件与子组件的生命周期顺序是怎么执行的？ 
																				render, willReceiveProps, shouldComponentUpdate, willUpdate, didUpdate 
																				getDerivedStateFormProps, getSnapshotBeforeUpdate

//npx create-reate-app  Demo
//React API 挂载、更新、卸载   类字段提案的说明 static
//类组件、
React.Component

React.PureComponent

React.createElement  cloneElement

React.createContext

createFactory, createRef

//16.6+  React.memo  lazy
//16.7   生命周期方法，只能用类组件


//ReactDOM
ReactDOM.render

//函数组件  TODO props.handler
const Hello = (props) => <div onClick={ props.handler } >hello, {props.name}</div>

class SomeOne extends React.Component {
	//类字段提案说明
	state = {		
		name: 'Someone ^_^'
	}
	handler = () => this.setState({name: 'You'})
	render(){
		return (
			<HelloWorld name={this.state.name} onClick={ this.handler }/> 
		)
	}
}