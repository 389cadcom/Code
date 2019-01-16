//https://www.tuicool.com/articles/3UnY32A

//1.Ԫ�ַ�
( [ { \ ^ $ | ) * ? + .

/\?/	--> 	new RegExp("\\?")

//2.�����ַ�  ASCII, Unicode  

\x61			ASCII   ʮ������			'about'.match(/\x61/)
\141			ASCII		�˽���			  /\141/.test('about')
\u0062		Unicode ʮ������			/\\u0062/.test('about')

//3.�ų�ѡ��	��Χѡ��
		[^ab]			[a-zA-Z]

//4.Ԥ����	\t \n \r 

.		 =>   [^\n\r]						��������س��������ַ�
\d	 =>   [0-9]							����
\D	 =>		[^0-9]						������
\s	 =>   [\n\r\t\f\x0B]		�հ��ַ�--���С��س����Ʊ���ҳ
\S	 =>		[^\t\n\r\f\x0B]		�ǿհ��ַ�
\w	 =>		[a-zA-Z0-9_]			�����ַ�--��ĸ�����֡��»���
\W	 =>		[^a-zA-Z0-9_]			�ǵ����ַ�


//5.����  
?				//{0,1}  0��1��  
*				//{0, }  0��N��
+				//{1, }  1��N��
{n}			//N��
{n, m}	//����N�Σ�����M��
{n,}		//����N��

//6.̰�������ԡ�֧������
//a.̰��ƥ�䣬�ȿ������ַ��Ƿ�ƥ�䣬Ȼ��һ�����³�����ֱ��ƥ��Ϊֹ��Ĭ�϶���̰��ƥ��
//b.����ƥ�䣬�ȿ���һ���ַ��Ƿ�ƥ�䣬���ٳԾ�����ԣ�ֱ��ƥ��ɹ�Ϊֹ  {n}?
//c.֧�����ʣ�ֻ����ƥ�������ַ�����ƥ�䲻�ٳ��ԣ�һ���� --- �����������

̰��							����						֧����			//֧�����������֧��
?									??							?+					0��1��
*									*?							*+					0����
+									+?							++					0����
{n}								{n}?						{n}+				N��
{n, m}						{n,m}?					{n,m}+			n-m��
{n, }							{n,}?						{n,}+				����n��

//7.���顢��������--�洢���������ֵ  RegExp.$1, RegExp.$2  \1

trim = /^\s*(.*?)\s*$/			// '  abc  '.replace(/^\s*(.*?)\s*$/, '$1')   '  abc  '.replace(/^\s*|\s*$/g, '')

'1234 5678'.replace(/(\d{4})\s*(\d{4})/, '$2 $1')			//'5678 1234'

//ǧ�ֺ�
str.split('').reverse().join('').replace(/(\d{3})/g, '$1,').split('').reverse().join('').substr(1)

str.replace(/\d{1,3}(?=(\d{3}+$))/g, '$1,')

//8.�ǲ����Է��� -- ����洢����RegExp.$1, RegExp.$2							��������ƥ���У�ֻ�ǲ���������
���������ڼ�?: ��ʽ

'1234 5678'.replace(/(?:\d{4})\s*(\d{4})/, '$2 $1')	//'$2 5678'

//ƥ��ȥ��HTML��ǩ
"<a href>��¥</b> >����</a>".replace(/<(?:.|\s)*?>/g, '')



//9.����																													ĳ���ַ���ǰ�߻��ߺ��
function formatPhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$3");   //RegExp.$1, RegExp.$2, RegExp.$3
}

str = '<title>document</title>'
reg = /(?<=<title>).*(?=<\/title>)/
str.match(reg)


//������ʾ��һ�����һ���֣��������ǺŴ���()�ų���һ�������һ���ַ�

'ʵ��ʵ��'.replace(/(?<=.).(?=.)/g, '*')				//���ж���,  �󷢶���   

nickname.replace(/^(.).+(.|\s)$/, '$1**$2')


new Array(str.length).join('*') + str.substr(-1);


//������תΪ���� ����ת������--> ���� Object.keys().map((key)=> k + '=' + params[k])
var url = decodeURI(location.search)
var reg = /([^?=&]+)=([^&]*)/gi, o = {};
url.replace(reg, (str, a, b)=>{
  o[a] = b;
})
console.log(o)

var ary = url.match(reg)
var o = ary.reduce((prev, curr)=>{
  var a = curr.split('=')
  //console.log(prev, a)
  prev[a[0]] = a[1];
  return prev
}, {})



//10.����
//a.�߽�-- ^, $, \b, \B

//11.
dataURI = 'data:image/png;base64,iVBC'
var type = dataURI.match(/data:([^;]+)/)[1];			//image/png
var base64 = dataURI.replace(/^[^,]+,/, '');			//iVBC        [^,]--ƥ��δ�����������ַ�