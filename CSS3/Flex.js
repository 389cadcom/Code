Flex自适应布局:

//网格布局 -- 百分比布局

//圣杯布局
flex-direction: column;

//固定底栏 -- 首尾高度固定，中间flex:1
flex-direction: column;
min-height: 100vh;

//流式布局 
flex-wrap: wrap;

flex: 0 0 25%




//新Flex:
display:flex; 
	flex-direction:		伸缩流方向
	flex-wrap: 				伸缩换行
	flex-flow:

	justify-content: center | space-between | space-around 
	align-items: flex-start | flex-end | center | stretch   
	align-self:
	align-content:		堆栈伸缩行
	flex-group: 0 | 1;  /*left{width:100px; flex-group:0;}; right{width:auto; flex-group:1;}*/


//旧Flex:
display:box;  box-align, box-pack, box-direction:reverse, box-orient:horizontal/vertical
	      box-flex,  box-flex-group, box-flex-ordinal

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


