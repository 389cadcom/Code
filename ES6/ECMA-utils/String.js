//�ַ�����ȡ
1.substring(start, end)			//��ֵ����Ϊ0; ��endʡ�ԣ����ʾ��startλ��һֱ��ȡ�����
	substring(start, lenng-1)
	substring(2, 1)						//��startС��end, ��λ�öԻ�λ��

//start��С��end
2.slice(start, end)					//�����Ǹ�ֵ����ֵβ����ʼ�����λ�� (-1 --> length -1)
	slice(2, 1)								//���ؿ�

3.substr(start, length)			//���startΪ���������ʾ���ַ���β����ʼ

4.split([separator][, limit])


//���ҷ���
1.indexOf(search, fromIndex), lastIndexOf()

2.includes()					//���ز���ֵ

3.search([str, reg])	//��indexOf()����������ʽ

4.match([str, reg])		//����һ�����null, ��Ϊ����ȫ��ƥ��, ���������ַ������飬û��index��input���ԡ�
	match('w')					//['w', index:0, input:'']
	match(/w/g)					//['w', 'w', 'w']
  //reg.exec(str)			//������exec����ȫ��ƥ��

	'dogdogabdogdogbogbog'.match(/(dog){2}/g)    //['dogdog', 'dogdog']
	'dogdogabdogdogbogbog'.match(/(dog){2}/)		 //['dogdog', 'dog', input, groups]	�ڶ�λ�Ƿ��鲶�������


5.replace()																			//TODO ������� 2018-8-8
	str.replace(reg, (str, $s1, $s2)=>{})
//str = "<a id='4a5dff2feed447b3bcb7d1b10724cba7'>�����¥Ⱥ</a>��ǰ����ӵ����Ϊ���������Ŷ�ʱ�䣬��������ȥ"
  reg = /<a id=["|'](.*)["|']>(.*)<\/a>/g		
  reg = /<a id=["|'](.*?)["|']>(.*?)<\/a>/g			// .*? �������ƥ��TODO 
	str.replace(reg, (str, s1, s2)=>{
		console.log(str, s1, s2)
		return `<a href='${s1}'>${s2}</a>`
	})

//����
1.toLowerCase(), toUpperCase()

2.charAt(), charCodeAt(), fromCharCode()

3.concat(), repeat()

//ȥ���հ���
String.prototype.removeBlankLines = function () {
 return this.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}

//תΪ��ά����
str1 = `
����������Զ��,������Ӱ��ѻ�ء�
һ�������ɽ���,�ĺ����˶�Ϧ����
����ɽ��ӭʤ��,����������������
�����ɾպ�����,�������������硣
`

str1.split(/\n/).map(elem => elem.split(','))
