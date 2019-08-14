import Vue from 'vue'
import utils from './utils.js'

/**
 * @directive preventReClick 防止按钮在短时间内多次点击造成的多次请求(一般用于提交按钮)
 * @param {Element} el 绑定的元素
 * @param {Number} binding 绑定的时间
 * 使用方式 <el-button v-prevent-replace-click></el-button>
 */
Vue.directive('preventReplaceClick', {
	inserted(el, binding){
		el.addEventListener('click', ()=>{
			if(el.disabled) return;

			el.classList.add('is-disabled');
			let i = document.createElement('i')
			i.classList.add('icon-loading')
			el.prepend(i)
			el.classList.add('is-loading')
			el.disabled = true

			setTimeout(() => {
				el.disabled = false
				el.removeList('is-disabled')
				el.removeList('is-loading')
				el.removeChild(i)
			}, binding.value || 1000);
		})
	}
})