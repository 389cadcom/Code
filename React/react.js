react-update-on

react-transition-group


//6.19 react-router
Router, Route, Link, IndexRoute


//10.20  JSX   Babel�� JSXת�����õ�React.createElement(el, attrs, ...elem)

//ԭ��html��ǩ��Сдĸ, React�����Դ�д��ĸ


//�¼�����  ��this
constructor(props){
	super(props)

	this.handler = this.handler.bind(this)		//1.���캯����this
}
handler = (e) => {}													//2.��ͷ��������, ��ʽ����event����

//��this���ݲ���
onClick = { this.handler.bind(this, arg) }  //3.bind��ʽ����this: �¼�����eҪ���������ݲ����ĺ��� handler(name, e){}  ��ʽ����event����
onClick = { (e) => this.handler(e) }				//4.��ͷ������: �¼�����e������ʽ����
onClick = { this.handler }									//TODO  δ��this--��ǰ����, ��react


//10.24 ���API  �����������state�����޸�����, �����ֻ��ͨ��props��������
state, setState({count: this.state.count+1}), setState(state => {count: state.count+1})
JS���ɱ�



//React.PropTypes �� React v15.5 �汾���Ѿ��Ƶ��� prop-types ��
PropTypes.string.isRequired
bool, string, number, symbol, array, object, func, 
arrayOf, objectOf, oneOf
any, element, node, shape, instanceOf

//10.30 ��������
componentWillMount()
componentDidMount()

componentWillRectiveProps()

shouldComponentUpdate(newProps, newState)			//������props��stateʱ������, ��ʼ��forceUpdate��������
componentWillUpdate(nextProps, nextState)
componentDidUpdate(prevProps, prevState)

componentWillUnMount()

componentDidCache

render()																			//ÿ�θ��¶���������Ⱦ willMount render didMount, willUpdate render didUpdate

getDerivedStateFromProps
getSnapsHotBeforeUpdate

//16.2 FragmentƬ�Ͽ�����Ӷ���ӽڵ�
//19.4.16
�ܿء����ܿ����						//onChange�¼�������ֵ�ı仯

<select value={this.state.value} onChange={this.handleChange}>