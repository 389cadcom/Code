//1.����forѭ��,    forEach���������ʱ�����޷� break ���� return false �жϵ�
var arr = [1,2,3]
arr.foo = 'foo'
for(let i of arr){   //for...in   obj.hasOwnProperty �ų�ԭ�ͷ��� i, arr[i]
	if(i==2) break;
}

//ע��
1.for...in������������������--����+ԭ��, �������ڴ��������

2.for...of �������顢α���飬�������Ҫ����������

3.forEach((item, i)=>{}), ��ʹ������ֵʹ�ã��������жϱ���