1.React�ڳ�ʼ���͸��µ�ʱ��ᴥ���Ĺ��Ӻ�����
2.������ڸ���״̬��ʱ����������������������˳������ôִ�еģ�


//npx create-reate-app  Demo
//React API ���ء����¡�ж��   ���ֶ��᰸��˵��
//�������
React.Component

React.PureComponent

React.createElement  cloneElement

React.createContext

createFactory, createRef

//16.6+  React.memo  lazy
//16.7   �������ڷ�����ֻ���������


//ReactDOM
ReactDOM.render

//�������  TODO props.handler
const Hello = (props) => <div onClick={ props.handler } >hello, {props.name}</div>

class SomeOne extends React.Component {
	//���ֶ��᰸˵��
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