//1.�첽���⹹��Promise
var [user, account] = await Promise.all([
	fetch('/user'),
	fetch('/account')
])

//2.��չ�����
Math.max(...arr);

o = {...obj}		//������չ����

//3.���������⹹����
function f({id, name, force})