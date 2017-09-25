<template>
    <div class="page">
        <h1 class="page-title">Swipe</h1>
        <div class="page-wrapper">
            <p class="page-swipe-desc" >基础用法</p>
            <mt-swipe :speed="200" :auto="3000" @change="handleChange">
                <mt-swipe-item class="slide1">1</mt-swipe-item>
                <mt-swipe-item class="slide2">2</mt-swipe-item>
                <mt-swipe-item class="slide3">3</mt-swipe-item>
            </mt-swipe>
            <p class="page-swipe-desc">隐藏indicators</p>
            <mt-swipe :show-indicators="false" :auto="0" :defaultIndex="1">
                <mt-swipe-item class="slide1">1</mt-swipe-item>
                <mt-swipe-item class="slide2">2</mt-swipe-item>
                <mt-swipe-item class="slide3">3</mt-swipe-item>
            </mt-swipe>
            <p class="page-swipe-desc">单个</p>
            <mt-swipe :show-indicators="false">
                <mt-swipe-item class="slide3">only one</mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>
<script>
//按需引入
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

export default {
    data() {
        return {
            msg: 'msg'
        }
    },
    methods: {
    	handleChange(index){
    		console.log(index)
    	}
    }
}
</script>
<style lang="scss">
.page-swipe-desc {
    text-align: center;
    color: #666;
    margin-bottom: 5px;
}

.mint-swipe {
    height: 200px !important;
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 20px;
    
    .mint-swipe-item {
        line-height: 200px;
    }
    .slide1 {
        background-color: #0089dc;
        color: #fff;
    }
    .slide2 {
        background-color: #ffd705;
        color: #000;
    }
    .slide3 {
        background-color: #ff2d4b;
        color: #fff;
    }
}
</style>