:class �﷨ ��������

:class="spec.id==currentData.id?'selected':''"			//��Ŀ����

:class="[show?'icon-close':'icon-caidan', 'hide']"		//�����﷨-��Ŀ����

:class="{'active': i==0}"								//�����﷨
:class="{'checked':addr.is_default==1, 'hide':i>=3}"


:style="{ color: activeColor, fontSize: fontSize + 'px' }"


//vue-cli webpack����
������ļ�Ҫ����һ��HTTP������, file:///���ʣ���Դ����ʧ�ܣ�������webpack��Դ����(publicPath��Ϊ���·��)���ı�webpack���ã���������û����ļ���������û��Ч��

//1-4 ���ݽṹ
//������Ӧʽԭ��
Object.create, assign, defineProerty

vm.$data
Vue.set(object, key, value)

//˫���
<input type="text" id="txt"/><span id="sp"></span>
js:
var txt = dg('txt'), sp= dg('sp');
var obj = {};
Object.defineProperty(obj, 'msg', {
	set: (old, val)=>{
		txt.value    = val;
		sp.innerText = val;
	}
})

txt.on('keyup', e=>{
	obj.msg = event.target.value
})

//�첽����
Vue.nextTick()
this.$nextTick()

//������
Vue.filter('data', (val, format)=>{})


// �� axios ��ӵ� Vue.prototype ��
Vue.prototype.$axios = axios	==> this.$axios.get(url)


// ����������
axios.interceptors.request.use()
axios.interceptors.response.use()


//���ݷַ�  --slot  refs