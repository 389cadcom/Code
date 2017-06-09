/**
 * Point
 * @authors lonves (lonves@qq.com)
 * @date    2017-05-02 20:21:43
 * @version $Id$
 */
class Point{
	constructor(x, y, ...args){
		this.x = x;
		this.y = y;
		this.args = args;
	}
	toString(){
		return `(x=${this.x}, y=${y})`;
	}
	//属性值函数
	get copyX(){
		return this.x;
	}
	set copyX(x){
		this.x = x;
	}

	//静态方法
	static distace(){
		return 'super static Method'
		console.log('this is class static method!');
	}

	//Generator函数  Symbol.iterator
	* [Symbol.iterator](){
		for(let arg of this.args){
			yield arg;
		}
	}
}

export {Point};



//继承babel-node 执行失败 5-2
class ColorPoint extends Point{
	constructor(x, y, color){
		super(x, y);

		this.color = color;
	}
	//子类通过super对象上调用
	static area(){
		super.area() + "add";
	}
}

export {ColorPoint};