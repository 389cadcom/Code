Flex����Ӧ����:

//���񲼾� -- �ٷֱȲ���

//ʥ������
flex-direction: column;

//�̶����� -- ��β�߶ȹ̶����м�flex:1
flex-direction: column;
min-height: 100vh;

//��ʽ���� 
flex-wrap: wrap;

flex: 0 0 25%




//��Flex:
display:flex; 
	flex-direction:		����������
	flex-wrap: 				��������
	flex-flow:

	justify-content: center | space-between | space-around 
	align-items: flex-start | flex-end | center | stretch   
	align-self:
	align-content:		��ջ������
	flex-group: 0 | 1;  /*left{width:100px; flex-group:0;}; right{width:auto; flex-group:1;}*/


//��Flex:
display:box;  box-align, box-pack, box-direction:reverse, box-orient:horizontal/vertical
	      box-flex,  box-flex-group, box-flex-ordinal

//������
transform: translate(0,10px)/translate(10px); rotate, scale, skew;

3D:
perspective, 
backface-visibility

transition:transform 3s ease 5s;   
//transition-property, duration, timing-function, delay

//�ӳٲ��ţ��ȸ߶�-->�ٱ��������
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


//���䣺gradient

background-image:linear-gradient(to bottom, #fff, #ddd);

background-origin:  ;
background-clip:   ;     //text
text-fill-color: transparent;


