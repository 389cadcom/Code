//JS对动画效果控制
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
		//回调函数会在下一次界面渲染前执行
		requestAnimationFrame( _ => {
			target.classList.add(animationClassName);
		})
	})
}


