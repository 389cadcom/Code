//10.20  JSX
���ʽ�� -->��Ԫ���� ������
��ʽ��   -->cameCase				fontSize
ע��     -->{/**/}  jsx			//  /**/

��ǩ-���  --> className, htmlFor
ReactDOM.Render(
	<ul>Num.map( txt => <li>{txt}</li>)</ul>,
	document.getElement('el')
)


//10.22  ��� React.Component
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})


//10.23  �¼�����
//��this
this.handler = this.handler.bind(this)
handler = (e) => {}

onClick = { this.handler }   //δ��this--��ǰ����, ��react
//��this
onClick = { this.handler.bind(this, arg) }
onClick = { (e) => this.handler(e) }


//10.24 ���API
setState
replaceState

setProps
replaceState

fouceUpdate
findNodeDOM

isMounted

//10.25 ѭ�� key--JSX
<ul>{list.map((txt,i) => <li key={i}>{txt}</li>)}</ul>,



//10.30 ��������
componentWillMount()
componentDidMount()

componentWillRectiveProps()

shouldComponentUpdate(newProps, newState)			//��ʼ��forceUpdate��������
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

compnentWillUnMount()