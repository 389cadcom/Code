//JS�Զ���Ч������
function pause(target:HTMLElement){
	var isRunning = target.style.animationPlayState == 'running';
	if(isRunning){
		target.style.animationPlayState = 'paused';
	}
	return isRunning;
}

function play(target:HTMLElement){
	var isStop = target.style.animationPlayState == 'paused';
	if(isStop){
		target.style.animationPlayState = 'running';
	}
	return isStop;
}

function replay (target: HTMLElement, animationClassName: string):void {
	target.classList.remove(animationClassName);
	requestAnimationFrame( _=>{
		//�ص�����������һ�ν�����Ⱦǰִ��
		requestAnimationFrame( _ => {
			target.classList.add(animationClassName);
		})
	})
}


