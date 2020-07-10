(function(doc, win) {
 var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function() {
   var clientWidth = docEl.clientWidth;
   if (!clientWidth) return;
   docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
  };
 if (!doc.addEventListener) return;
 win.addEventListener(resizeEvt, recalc, false);
 doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window)


Flex自适应布局:
flex: initial;    //默认值  flex: 0 auto; flex: 0 1 auto;

flex: 1;     -->  flex:1 1 0%;
flex: 2;     -->  flex:2 1 0%;
flex: auto;  -->  flex: 1 1 auto;
flex: none   -->  flex: 0 0 auto;


//两栏布局, 左定宽，右自适应
.flex_left{
	//min-width: 200px;  //若只设置width:200px, 则为默认值flex:0 1 auto; 容器小于宽度则会被压缩
	flex: 0 0 200px;
}
.flex_right{
	flex: 1;						//flex: 1 1 0%;
}

//三栏布局
.flex_content{flex: 1;}
.flex_left, .flex_right{ flex: 0 0 200px}
//.flex_left{min-width: 200px;}  .flex_right{min-width:100px}

.flex_icon, .flex_more{flex: 0 0 80px;}
.flex_more{margin-left: auto;}

/*三栏负边距*/
.list{
	padding-right:20px;
	li{
		float:left;
		width:33.33%;
		&:nth-child(3n+2){
			margin: 0 10px;
		}
		&:nth-child(3n){
			margin-right:-20px;
		}
	}
}



//动画：
transform: translate(0,10px)/translate(10px); rotate, scale, skew;

3D:
perspective, 
backface-visibility

transition:transform 3s ease 5s;   
//transition-property, duration, timing-function, delay

//延迟播放：先高度-->再背景，宽度
transition:background 1s linear 1s, height 1s linear 0, width 1s linear 1s;
@-webkit-keyframes firstAnimal{}
@keyframes firstAnimal{
  from{}
  to{}
}

//animation: name duration delay timing-function iteration-count direction
animation: move 2s 0.5s 1 linear;
animation: move 2s 0.5s 1 forwards liear;

animation-name:
animation-duration:
animation-timing-funtion:
animation-delay:
animation-iteration-count:
animation-direction:
animation-fill-mode:
animation-play-state:	running | paused;


//渐变：gradient

background-image:linear-gradient(to bottom, #fff, #ddd);

background-origin:  ;
background-clip:   ;     //text
text-fill-color: transparent;


