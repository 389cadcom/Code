//1.
let some = <ISome>{}

let count = <Count>function(start: number){
	
}

��ʼ������������и�ֵts�����Զ��Ƶ����ͣ�����ָ������

//2.������η�
����ͬһ������, ��Ϊ�����������Ǽ���
private, protected  //�ܱ������ԣ�ֻ�������������ʹ��

���캯������ǳ� protected�� �಻���ڰ����������ⱻʵ�����������ܱ��̳�

readonlyֻ���ڳ�ʼ�����캯���и�ֵ

��������
constructor(private name:string){}


ֻ��get������ set�Ĵ�ȡ���Զ����ƶ�Ϊ readonly

//������, ���󷽷� abstract    ��������԰�����Աʵ�ֵķ���

//�����������ͣ�(Rhino | Elephant | Snake)[]  Animal[]
var x = [new Rhino(), new Elephant(), new Snake()];


//12.25����
Array<T>       //���͡�String�����Ƿ�������   String<T>����

interface ILength{
	length:number
}
function<T extends ILength>(arg:T):T{

}

//TODO
interface Generics<T> {
    data: T;
}
let g1: Generics<number> = <Generics<number>>{};


//12.28 ���ͼ�����
ts�ṹ����ϵͳ��������Щ���ͱȴ�ͳ��������ϵͳ���ã�

�磺����Ҫȥʵ�ֽӿ����ݣ�ֻ��Ҫ���Ŀ�����ͳ�Ա���ԡ�������һ�¾Ϳ��Ը�ֵ
interface IName{
	name:string
}
class Person{
	name:string = 'lonve'
}

let p:IName = new Person()


let x:IName
let y = {name:'lonve', age:3}
x = y

//���������Ƿ��ܸ�ֵ����������ǹ���ȫ������ȱ��

let x = {name: 'lonve', age:3}
let y = {name: 'yufeng'}

x = y			//Error
y = x			//Yes


//�����Ĳ����Ƿ��ܴ��Σ���������Ƿ�̫�࣬ȱʡ������
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error


//��ͬ��ö��֮�䲻����


//���о�̬���ԡ�ʵ�����ԡ����캯��
�Ƚ�����������͵Ķ���ʱ��ֻ��ʵ���ĳ�Ա�ᱻ�Ƚ�


//�߼�����
�������ͺ���������

���ͱ�������������

��Null������

�ַ�������������

��̬��this����

��������

ӳ������