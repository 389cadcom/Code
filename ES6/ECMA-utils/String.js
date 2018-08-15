//字符串截取
1.substring(start, end)			//负值则视为0; 若end省略，则表示从start位置一直截取到最后
	substring(start, lenng-1)
	substring(2, 1)						//若start小于end, 则位置对换位置

//start须小于end
2.slice(start, end)					//可以是负值，负值尾部开始算起的位置 (-1 --> length -1)
	slice(2, 1)								//返回空

3.substr(start, length)			//如果start为负数，则表示从字符串尾部开始

4.split([separator][, limit])


//查找方法
1.indexOf(search, fromIndex), lastIndexOf()

2.includes()					//返回布尔值

3.search([str, reg])	//比indexOf()多了正则表达式

4.match([str, reg])		//返回一数组或null, 若为正则全局匹配, 则所有子字符串数组，没有index和input属性。
	match('w')					//['w', index:0, input:'']
	match(/w/g)					//['w', 'w', 'w']
  //reg.exec(str)			//比正则exec多了全局匹配

	'dogdogabdogdogbogbog'.match(/(dog){2}/g)    //['dogdog', 'dogdog']
	'dogdogabdogdogbogbog'.match(/(dog){2}/)		 //['dogdog', 'dog', input, groups]	第二位是分组捕获的内容


5.replace()																			//TODO 正则分组 2018-8-8
	str.replace(reg, (str, $s1, $s2)=>{})
//str = "<a id='4a5dff2feed447b3bcb7d1b10724cba7'>大地土楼群</a>当前客流拥挤，为减少您的排队时间，建议您先去"
  reg = /<a id=["|'](.*)["|']>(.*)<\/a>/g		
  reg = /<a id=["|'](.*?)["|']>(.*?)<\/a>/g			// .*? 正则惰性匹配TODO 
	str.replace(reg, (str, s1, s2)=>{
		console.log(str, s1, s2)
		return `<a href='${s1}'>${s2}</a>`
	})

//其他
1.toLowerCase(), toUpperCase()

2.charAt(), charCodeAt(), fromCharCode()

3.concat(), repeat()

//去除空白行
String.prototype.removeBlankLines = function () {
 return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}

//转为二维组数
str1 = `
渺渺钟声出远方,依依林影万鸦藏。
一生负气成今日,四海无人对夕阳。
破碎山河迎胜利,残馀岁月送凄凉。
松门松菊何年梦,且认他乡作故乡。
`

str1.split(/\n/).map(elem => elem.split(','))
