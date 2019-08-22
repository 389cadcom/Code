//https://segmentfault.com/a/1190000015057278#articleHeader1

async function async1(){
    console.log('async1 start')
    await async2()											//async ����Promise
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')


//await �ȴ�Promise���첽����, ֻ�����ڡ��첽�������

async function test1(){
	var result = await setTimeout(()=>{
		console.log('�ӳ�һ��')
	}, 1000)
	console.log('test1 end')
	
	return result;
}

test1().then( res => {
	console.log('���', res)
})