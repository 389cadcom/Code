//10.20  JSX   Babel�� JSXת�����õ�React.createElement
���ʽ�� -->�Ӽ��˳�����Ԫ ����������
��ʽ��   -->cameCase, ��ʽ����д������ϣ�д��JSX�� <h1 className='hi' style = {{fontSize:'12px'}}
ע��     -->{/**/}  jsx			//  /**/

��ǩ-���  --> className, htmlFor
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

//ԭ��html��ǩ��Сдĸ, React�����Դ�д��ĸ


//�¼�����  ��this
constructor(props){
	super(props)

	this.handler = this.handler.bind(this)		//��this
}
handler = (e) => {}													//���庯��, ��ʽ����event����
onClick = { this.handler }									//δ��this--��ǰ����, ��react


//��this���ݲ���
onClick = { this.handler.bind(this, arg) }  //bind��ʽ: �¼�����eҪ���������ݲ����ĺ��� handler(name, e){}  ��ʽ����event����
onClick = { (e) => this.handler(e) }				//��ͷ����: �¼�����e������ʽ����


//10.24 ���API  �����������state�����޸�����, �����ֻ��ͨ��props��������
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})

//1.����״̬
state						//���Ը������û��������ı�
setState				//this.setState(state => state.count = 1 )
replaceState

this.props			//�����ͨ��props��������
defaultProps
setProps
replaceState

fouceUpdate
findNodeDOM

isMounted



//React.PropTypes �� React v15.5 �汾���Ѿ��Ƶ��� prop-types ��


//10.30 ��������
componentWillMount()
componentDidMount()

componentWillRectiveProps()

shouldComponentUpdate(newProps, newState)			//������props��stateʱ������, ��ʼ��forceUpdate��������
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

compnentWillUnMount()

render()																			//ÿ�θ��¶���������Ⱦ willMount render didMount, willUpdate render didUpdate