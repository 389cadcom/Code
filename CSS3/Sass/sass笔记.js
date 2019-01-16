//sass -i	进入sass shell编辑环境
//live sass compile

//插值、默认参数、rest参数、Each...in、list、 Map、@extend

//type-of: string, boolean, number, null, color, list, map

compass create project
compass init

compass compile  --output-style compressed
compass watch


//expanded compact compressed
sass -t expanded  src/index.scss index.css --sourcemap=none
sass -t expanded --watch src/index.scss 

//运算符前后需空隔, 不然编译会报错 $i: $i - 1;

.header {
  @at-root #{&}-top{ }
  .page & { }
}

//处理media, keyframes内容 @content
@mixin tablet {
  @media (max-width:767px){
	@content;
  }
}
@include tablet {
	p{font-size:12px;}
}

//条件、三目运算
top: if($direction==left, 1px, 0);

@if $bool {	}
@else { }
//@if not()  not or and表示 非，或，与  type-of

//for, while遍历
@for $i from 1 through 4 { }
@for $i from 1 $i to 4 {}

$type: 4;
@while $type > 0 {
	.item-#{$type}{padding:#{$type}px}
	$type: $type - 1;				//运算前后需空格
}


//字符与数据函数，三目函数
quote, unquote

percentage, 
random, round, ceil, floor, max, min

str-length, str-insert($str, $t, index), str-index, str_slice, 
to_upper_case, to_lower_case
//随机
unique-id()

//列表函数     separator  comma(逗号)和space(空格)
length($list)
nth($list, n)  
index($list, value)

join(list1,list1, list2, [$separator]),
append($list, val, [$separator])


//map函数
map-get(map, key)
map-remove($m, key)
map-has-key($m, key)
map-merge($m1, $m2)
map-keys($m)
map-values($m)

//自定义函数 @function  @return
$social-colors: (
    facebook: #3b5998,
    github: #171515,
    google: #db4437,
    twitter: #55acee
);

@function color($color){
	@if not map-has-key($social-colors, $color){
		@warn "No color found"
	}
	@return map-get($social-colors, $color)
}

//颜色
rgb()		三种rgb转为十六进制颜色
rgba()	    十六进制和透明度转为rgba颜色

lighten, darken			//加深、减淡 10% ~ 30%
lighten($baseColor,10%)


