vue-meta						//����
Vue-Lazyload.js			//ͼƬ������
vue-scroller				//��������
vuex-persistedstate	//���ݳ־û���


better-normal-scroll



//�����ʽ���ȼ�(���Ⱥ�����)  base.cssҪ���� App�ж������ʽ
import Vue from 'vue'
import '@/assets/base.css'     

import App from './App'



//�Զ�ע��ȫ�����
const requireComponent = require.context('./components', false, /\.vue$/)

requireComponent.keys().forEach( fileName => {
  var component = requireComponent(fileName)
  var componentName = fileName.replace(/^\.\//, '').replace('.vue', '')
  console.log(componentName, component.default);

	Vue.component(componentName, componentConfig.default || componentConfig)
})

	
//������
Vue.use(VueLazyload, {
	error: '',
	loading: '',
	preLoad: 1,
	attempt: 1
})

<img v-lazy='item.img'