<template>
<div>
	<div class="page-title">Cell</div>
	<div class="page-wrapper">
		<mt-field placeholder="请输入用户名" type="text"></mt-field>
		<mt-field placeholder="输入数字" type="number"></mt-field>
		<mt-field label="内容" placeholder="内容" type="textarea" rows="3"></mt-field>
		<br>
		<mt-field label="带状态效果" placeholder="成功" type="email" state="success"></mt-field>
		<mt-field label="带状态效果" placeholder="失败" type="email" state="error"></mt-field>
		<mt-field label="带状态效果" placeholder="警告" type="email" state="warning"></mt-field>
		<mt-field label="验证码" placeholder="请输入验证码" type="text" onlyread>
			<img src="../assets/100x100.png" height="45px" width="100px"/>
		</mt-field>
		<div style="text-align: center; margin-top: 10px;">
			<mt-button type="danger">提 交</mt-button>
		</div>
	</div>
</div>
</template>

<script>
import {Cell, Field} from 'mint-ui';
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)

export default {
	data(){
		return {
			msg: 'msg'
		}
	}
}
</script>

<style lang="scss">
</style>