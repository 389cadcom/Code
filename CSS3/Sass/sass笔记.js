//sass -i	进入sass shell编辑环境
//live sass compile

//插值、默认参数、rest参数、Each...in、list、 Map、@extend

//type-of: string, boolean, number, null, color, list, map



//运算符前后需空隔, 不然编译会报错 $i: $i - 1;

//括号来解决SASS\SCSS 避免运算的问题
@mixin ts($s1:1px,$s2:1px,$color:$cff){
    text-shadow:
    $s1 $s1 $s2 $color,
    -$s1 $s1 $s2 $color,
    $s1 (-$s1) $s2 $color,
    -$s1 (-$s1) $s2 $color;
}


//跳出嵌套         @at-root (with-out:)   all（表示所有），rule（表示常规css），media（表示media）
.header {
  @at-root #{&}-top{ }
  .page & { }
}

//应用于@keyframes
.animate{
	animation: move 3s infinite;

	@at-root{
		@keyframes move{
			from{}
			to{}
		}
	}
}

//处理media, keyframes内容 @content
@mixin tablet {											 多值参数 $variables...
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
@if not()  not or and表示 非，或，与  type-of

//for
@for $i from 1 through 4 { }
@for $i from 1 $i to 4 {}

//while遍历
$num: 4;
@while $num > 0 {
	.item-#{$num}{
		padding:#{$num}px										//连接单位
	}
	$num: $num - 1;												//运算前后需空格
}

//each
@each $key, $var in <list or map>




//字符与数据函数，三目函数
quote, unquote

percentage,															//百分比
random, round, ceil, floor, max, min

str-length, str-insert($str, $t, index), str-index, str_slice, 
to_upper_case, to_lower_case

//随机
unique-id()

//列表函数     separator  comma(逗号)和space(空格)   一维$list: 1px 2px;  二维 $list: 1px 2px, 3px 4px;
length($list)
nth($list, n)  
index($list, value)

join(list1,list1, list2, [$separator]),
append($list, val, [$separator])


//map函数																						 $map: (h1:2px, h2:4px)
map-get(map, key)
map-remove($m, key)
map-has-key($m, key)
map-merge($m1, $m2)
map-keys($m)
map-values($m)

//自定义函数 @function  @return
$colors: (
    facebook: #3b5998,
    github: #171515,
    google: #db4437,
    twitter: #55acee
);

@function color($color){
	@if not map-has-key($colors, $color){
		@warn "No color found"
	}
	@return map-get($colors, $color)
}

//颜色
rgb()				三种rgb转为十六进制颜色
rgba()	    十六进制和透明度转为rgba颜色

lighten, darken			//加深、减淡 10% ~ 30%
lighten($baseColor,10%)



/*--------------------------------sass编译-----------------------------*/
Ruby  -->  gem install sass

compass create project
compass init

compass compile  --output-style compressed
compass watch


//--style nested expanded compact compressed
//--sourcemap=none  auto inline  file

sass -t expanded  src/index.scss index.css --sourcemap=none
sass -t expanded --watch src/index.scss 

//--output-style expanded compact compressed
node-sass index.scss index.css --output-style compressed   --source-map true

"liveSassCompile.settings.formats":[
	{
			"format": "expanded",
			"extensionName": ".css",
			"savePath": null
	}
}