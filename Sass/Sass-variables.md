/*
中文编码 error:
C:\Ruby23-x64\lib\ruby\gems\2.3.0\gems\sass-3.4.23\lib\sass\engine.rb
添加：
Encoding.default_external = Encoding.find('utf-8')


sass-convert:
sass-convert style.sass style.scss	sass-convert style.scss style.sass

参数:
--watch				scss --watch test.scss:test.css
--style=nested		-t	expanded, compact, compressed
--sourcemap=default		none 
--no-cache		-C

--line-number		-l
--line-comments
*/

!global		//全局变量
!default	//默认赋值	若变量已经被赋值，不会再被重新赋值
&		//&嵌套规则外层的父选择器
#{}		//插值语句：选择器或属性值使用变量
_colors.scss	//导入不编译文件	@import "colors";


//关键字
@import
@mixin		//可以定义参数，不合代码      @content
@include	//
@extend		//不能使用参数，合并相同代码  @extend .error;	@extend %line;
@content
@function
@return
@media		
@at-root	//跳出嵌套(父级，媒介，所有)	@at-root (without: media)  all

@debug
@warn
@error

@if
@else if
@else
@for		//@for $i from 1 through 3, from ... to
@each		//@each $i in $list	多维值--$animal, $color, $cursor in (puma, black, default), 
@while		//@while $i > 0{ $i:$i-2;}

%placeholder	//继际编译代码提前， 



/*
代码实例
*/
@mixin map($args...){
    @debug keywords($args);
}
@include map(
  $dribble: #ea4c89,
  $facebook: #3b5998,
  $github: #171515,
  $google: #db4437,
  $twitter: #55acee
);


lighten($color, $amount)	//变亮
darken($color, $amount)		//变暗
grayscale($color)		//变灰


@function colors($color){
	//判断map是否存在值
    @if not map-has-key($social-colors,$color){
        @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
    }
    @return map-get($social-colors,$color);
}

//语句
@if, @else

if($bool, bold, normal)
width: if($width > 800, 800px, 600px);


@for $i from 1 through 3
@for $i from 1 to 3

@while $types > 0{
//...	
$types: types-1;
}

//each循环
@each $color in map-keys($social-colors){
    .btn-#{$color} {
	color: colors($color);
    }
}
//for循环
$list: map-keys($social-colors);
@for $i from 1 through length($list){
	$color: nth($list, $i);
	.btn-#{$color} {
		color: colors($color);
	}
}

