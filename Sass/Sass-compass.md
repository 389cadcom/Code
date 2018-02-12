/*
2017-5-8
sprite
*/
$icon-sprite-base-class: '.ico';				//��������
$icon-clean-up: false;				   	        //������ͼƬ


$icon-sprite-dimensions: true;					//ÿ����
$icon-spacing: 10px;						//spriteͼƬ��϶
$icon-wechat-spacing: 10px;					//1.pngͼƬ��ӿ�϶
$icon-wechat-repeat: repeat-x;					//png��Сһ����������ƽ��

$icon-position: 0;						//png��Сһ����������ƽ��
$icon-wechat-position: 50px;					//png��Сһ����������ƽ��
$icon-layout: horizontal;					//sprite�Ű� vertical, diagonal, smart
		

@import 'icon/*.png';
@include all-icon-sprites;

.ico-wechat {
  @include icon-sprite(wechat);					//���õ���
  width: icon-sprite-width(compass-logo);
  height: icon-sprite-height(compass-logo);
}


2.ͼƬ����
image-url(img, false, false)
inline-image(img)
width: image-width('icon.png');
height: image-height('icon.png');	


//���� 2017-5-4
compass create libs -r bootstrap-sass --using bootstrap		//����bootatrap-sass 

compass compile -s compact --force --sourcemap			//ָ����ʽ

compass compile -e production --force				//ָ���������� development

compass compile --force						//���±���δ�Ķ���

compass compile -c prod_config.rb --force			//ָ�������ļ�

clean, compile, create, init, watch


//�����ļ��е�ע�ͣ���Ҫ��ע�͵Ŀ�ͷ����!
/*!
 * Author: Lonve
 */

