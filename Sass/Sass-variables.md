/*
���ı��� error:
C:\Ruby23-x64\lib\ruby\gems\2.3.0\gems\sass-3.4.23\lib\sass\engine.rb
��ӣ�
Encoding.default_external = Encoding.find('utf-8')


sass-convert:
sass-convert style.sass style.scss	sass-convert style.scss style.sass

����:
--watch				scss --watch test.scss:test.css
--style=nested		-t	expanded, compact, compressed
--sourcemap=default		none 
--no-cache		-C

--line-number		-l
--line-comments
*/

!global		//ȫ�ֱ���
!default	//Ĭ�ϸ�ֵ	�������Ѿ�����ֵ�������ٱ����¸�ֵ
&		//&Ƕ�׹������ĸ�ѡ����
#{}		//��ֵ��䣺ѡ����������ֵʹ�ñ���
_colors.scss	//���벻�����ļ�	@import "colors";


//�ؼ���
@import
@mixin		//���Զ�����������ϴ���      @content
@include	//
@extend		//����ʹ�ò������ϲ���ͬ����  @extend .error;	@extend %line;
@content
@function
@return
@media		
@at-root	//����Ƕ��(������ý�飬����)	@at-root (without: media)  all

@debug
@warn
@error

@if
@else if
@else
@for		//@for $i from 1 through 3, from ... to
@each		//@each $i in $list	��άֵ--$animal, $color, $cursor in (puma, black, default), 
@while		//@while $i > 0{ $i:$i-2;}

%placeholder	//�̼ʱ��������ǰ�� 



/*
����ʵ��
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


lighten($color, $amount)	//����
darken($color, $amount)		//�䰵
grayscale($color)		//���


@function colors($color){
	//�ж�map�Ƿ����ֵ
    @if not map-has-key($social-colors,$color){
        @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
    }
    @return map-get($social-colors,$color);
}

//���
@if, @else

if($bool, bold, normal)
width: if($width > 800, 800px, 600px);


@for $i from 1 through 3
@for $i from 1 to 3

@while $types > 0{
//...	
$types: types-1;
}

//eachѭ��
@each $color in map-keys($social-colors){
    .btn-#{$color} {
	color: colors($color);
    }
}
//forѭ��
$list: map-keys($social-colors);
@for $i from 1 through length($list){
	$color: nth($list, $i);
	.btn-#{$color} {
		color: colors($color);
	}
}

