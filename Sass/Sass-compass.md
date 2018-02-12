/*
2017-5-8
sprite
*/
$icon-sprite-base-class: '.ico';				//基础类名
$icon-clean-up: false;				   	        //保留旧图片


$icon-sprite-dimensions: true;					//每项宽高
$icon-spacing: 10px;						//sprite图片空隙
$icon-wechat-spacing: 10px;					//1.png图片添加空隙
$icon-wechat-repeat: repeat-x;					//png大小一样，可设置平铺

$icon-position: 0;						//png大小一样，可设置平铺
$icon-wechat-position: 50px;					//png大小一样，可设置平铺
$icon-layout: horizontal;					//sprite排版 vertical, diagonal, smart
		

@import 'icon/*.png';
@include all-icon-sprites;

.ico-wechat {
  @include icon-sprite(wechat);					//设置单个
  width: icon-sprite-width(compass-logo);
  height: icon-sprite-height(compass-logo);
}


2.图片设置
image-url(img, false, false)
inline-image(img)
width: image-width('icon.png');
height: image-height('icon.png');	


//参数 2017-5-4
compass create libs -r bootstrap-sass --using bootstrap		//基于bootatrap-sass 

compass compile -s compact --force --sourcemap			//指定格式

compass compile -e production --force				//指定生产环境 development

compass compile --force						//重新编译未改动的

compass compile -c prod_config.rb --force			//指定配置文件

clean, compile, create, init, watch


//保留文件中的注释，需要在注释的开头加上!
/*!
 * Author: Lonve
 */

