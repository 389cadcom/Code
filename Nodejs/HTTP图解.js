//1.ͬԴ��������
Э�顢�������˿�����һ������ͬ�������ڿ���
���ܻ�ȡCookie��LocalStorage; ���ܻ�ȡDOM�ڵ�; ���ܽ���һ��ҪAjaxͨ��

//2.JSONP����--��̬����script��ǩ�����Ŀ��url�����󣬲���ȷ���Ƿ�����ʧ�ܣ�script ��ǩ�� onerror �¼���δ�õ�������㷺��֧��
script, img, iframe��ǩ����ͬԴ��������

//3.CORS ����-- ���˽��� Ajax ͨ��ʱ, ͨ���Զ��� HTTP ͷ�����ôӶ������������Ӧ�Ƿ���Ч

//application/json,  multipart/formdata

1.Content-Type: 'text/plain;charset=utf-8'		//Request Payload   xhrĬ�Ϸ�ʽ	  encodeURIComponent(key) = encodeURIComponent(data[key]) 
2.application/x-www-form-urlencoded				//Form Data			jqĬ�Ϸ�ʽ
3.application/json								//Query String Parameters
4.enctype="multipart/form-data"					//�ϴ��ļ�

//ajax�������get����, ����������Ĭ�ϵ�����ͷ 'text/html, application/xhtml+xml; q=0.9,image/webp'
//xhr
var xhr = new XMLHttpRequest();
xhr.open('post', 'http://127.0.0.1');
xhr.setRequestHeader("Content-type", "application/json");
var data = {id:5, name: "yin"};
xhr.send(JSON.stringify(data));

xhr.send('name=yufeng&age=20');

//FormData
var form = $('form')[0];
var formData = new FormData(form);
formData.append("id", 5);
xhr.send(formData)

//jq--ǰ��
$.ajax({
	url: 'http://127.0.0.1',
//	method:'post',
//	headers: {'Content-Type':'application/json', 'Accept': "application/json; charset=utf-8",},
	contentType: 'application/json',
	data: JSON.stringify({name:'yufeng'}),
	success: function(){
		
	}
})


//URL�ṹ
scheme: ��ʾЭ�飬��Http, Https, Ftp�ȣ�		//location.protocol
host:   ��ʾ��������Դ���ڵ����������磺www.baidu.com;
port:   ��ʾ�˿ںţ�Ĭ��Ϊ80��
path:   ��ʾ�����ʵ���Դ��Ŀ�������ϵĴ���·����
query:  ��ʾ��ѯ������


//���ĸ�ʽ (Fiddlerץ��--Inspector Rawѡ��)
//1.�����ĸ�ʽ
���󷽷� URL HTTP/�汾��
�����ײ��ֶ�--��ѡ
����
body(post���������ʽ)

//2.��Ӧ���ĸ�ʽ
HTTP/�汾�� ״̬�� ״̬����
��Ӧ�ײ��ֶ�
����
body


//Eg: https://www.tuicool.com/articles/uuUb6ja
//Request Headers �����ײ��ֶ�
accept							//�ͻ����ܹ������ý������		text/html
accept-charset					//�ͻ����ܹ�֧�ֵ��ַ���		GB2312
accept-encoding					//�ͻ����ܹ�֧�ֵ����ݱ����ʽ  gzip, deflate
accept-language					//�ͻ����ܹ�֧�ֵ�����	        zh-cn, en
user-angent						//���������������ʹ������Ƶ���Ϣ���͸������	navigator.userAgent

referer							//�����Ǵ��ĸ�ҳ�淢���		document.referer
X-Requested-With				//ajax����

//Response Headers ��Ӧ�ײ��ֶ�
Accept-Ranges					//��֪�ͻ����Լ��ܹ�����Χ����: bytes, none
age								//��֪�ͻ��ˣ�Դ�������������ǻ�����������ڶ��֮ǰ��������Ӧ
etag							//ʵ����Դ�ı�ʶ
server							//��ǰʹ�õ�HTTP������Ӧ�ó���������Ϣ

//ʵ���ײ��ֶ�
allow
content-encoding				//��֪�ͻ��ˣ�����������Դ���ݵı���
content-language				//��֪�ͻ��ˣ�����������Դʹ�õ���Ȼ����
content-length					//��֪�ͻ�����Դ����
content-type					//��֪�ͻ���Դ��ý������
content-encoding				//��֪�ͻ���Դ�ı����ʽ
expries							//��֪�ͻ�����Դ��ʧЧ���ڡ������ڶԻ���Ĵ���
last-modifies					//��֪�ͻ�����Դ���һ���޸ĵ�ʱ�䡣

//ͨ�ñ����ֶ�
date							//����HTTP�������ں�ʱ��
cache-control					//���ƻ�����Ϊ max-age=2592000 --> 60*60*24*30
connection						//����־����ӣ�������ֵΪKeep-Alive��ʵ�ֳ����ӡ�
Transfer-Encoding				//�涨�˴��䱨������ʱʹ�õĴ�����룬��Transfer-Encoding: chunked

//��Ӧ״̬��
xhr.status >=200 && xhr.status < 300 || xhr.status == 304

//3��ͷ���ض���, ��������Զ��ض���
301		�����ض���
302		��Դ��ʱת��  //������ת������
304		û���޸ģ����ñ��ػ���
307		��ʱ�ض���

//�ͻ��˴���
400		������Ч--����ȱʧ��������ʽ��Ч
401		û����֤��û�е�½��֤֮��Ĵ���
403		��ֹ/�ܾ�����--�磺���������ĳ��Ŀ¼
404		�ļ�������

//����˴���
500		�ڲ�����������
502		���ش���
504		���س�ʱ
	
600		������û�з�����Ӧͷ����ֻ����ʵ������(��̫���õ�״̬��)