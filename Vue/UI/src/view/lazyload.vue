<template>
<div class="">
	<div class="page-title">加载更多 infinite</div>
	<div class="page-wraper">
		<ul class="lazyload-list">
		  	<li class="page-lazyload-listitem" v-for="item in list">
		  		<img v-lazy="item" />
		  	</li>
		</ul>
	</div>
</div>
</template>

<script>
//Vue-lazyload	
import { Lazyload } from 'mint-ui'
import img from '../assets/loading.svg';

console.log(img)
//v-lazy
Vue.use(Lazyload,{		
	loading: img
});					
	
export default {
	data(){
		return {
			list: [
	          'http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg',
	          'http://fuss10.elemecdn.com/3/1e/42634e29812e6594c98a89e922c60jpeg.jpeg',
	          'http://fuss10.elemecdn.com/1/c5/95c37272d3e554317dcec1e17a9f5jpeg.jpeg',
	          'http://fuss10.elemecdn.com/7/85/e478e4b26af74f4539c79f31fde80jpeg.jpeg',
	          'http://fuss10.elemecdn.com/b/df/b630636b444346e38cef6c59f6457jpeg.jpeg',
	          'http://fuss10.elemecdn.com/7/a5/596ab03934612236f807b92906fd8jpeg.jpeg'
	        ]
		}
	}
}
</script>

<style lang="scss">
.lazyload-list{
	li{
		list-style: none;
		width: 300px;
        margin: 0 auto;
        margin-bottom: 10px;
        background-color: #ddd;
	}
	img{
		display: block;
        width: 100%;
	}
	img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
}
</style>