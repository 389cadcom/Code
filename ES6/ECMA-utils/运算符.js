//1.���Ȳ��� -- ��������ֵ
var a = b = 10;   //a�ֲ�����, bȫ�ֱ���  var a = (b = 10)

a = {n:1}					//����ֵ������
b = a
a.x = a = {n:2}
a.x = ?, b.x = ?


//2.ԭ��
Object.prototype.a = 1
Function.protype.a = 2

function fn(){}
var f = new fn();

fn.a == ?, f.a = ?