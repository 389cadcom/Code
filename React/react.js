//10.20  JSX
���ʽ�� -->�Ӽ��˳�����Ԫ ������
��ʽ��   -->cameCase, ��ʽ����д������ϣ�д��JSX�� <h1 className='hi' style = {{fontSize:'12px'}}
ע��     -->{/**/}  jsx			//  /**/

��ǩ-���  --> className, htmlFor
ReactDOM.Render(
	<ul>Num.map( txt => <li>{txt}</li>)</ul>,
	document.getElement('el')
)
<ul>{list.map((txt,i) => <li key={i}>{txt}</li>)}</ul>,

//ԭ��html��ǩ��Сдĸ, React�����Դ�д��ĸ


//10.23  �¼�����
//��this
this.handler = this.handler.bind(this)
handler = (e) => {}

onClick = { this.handler }   //δ��this--��ǰ����, ��react
//��this
onClick = { this.handler.bind(this, arg) }
onClick = { (e) => this.handler(e) }


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

shouldComponentUpdate(newProps, newState)			//��ʼ��forceUpdate��������
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

compnentWillUnMount()