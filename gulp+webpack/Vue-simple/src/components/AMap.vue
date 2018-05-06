<template>
  <div id="container" style="height:600px" class="home">Home</div>
</template>

<script>
// 创建高德地图
let createMap = () => {
  const promise = new Promise(function (resolve, reject) {
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://webapi.amap.com/maps?v=1.3&key=1f648c12a2709a14b0e79551fdc5f791'   // 高德地图
    document.head.appendChild(script)
    script.onload = function(){
        if (script.nodeName === 'SCRIPT') {
            resolve()
        } else {
            reject(new Error('Could not script image at ' + script.src))
        }
    }
    
  })
  return promise
}


export default {
    data(){
        return {
            msg: 'Home'
        }
    },
    mounted(){
        var vm = this;
        createMap().then(function () {
            console.log('读取高德地图成功')
            vm.init()
            // 加載當前的ip定位
        }).catch(function (error) {
            // 处理 getJSON 和 前一个回调函数运行时发生的错误
            console.log('发生错误！', error)
        })
    },
    methods: {
        init(){
            var map = new AMap.Map('container', {
                center: [121.52710487067272, 31.22889232359548],
                resizeEnable: false,
                zoom: 5
            })
            
        }
    }
}
</script>

<style>
.home{color: orange}
</style>
