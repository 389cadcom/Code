/**
 * ColorPoint
 * @authors lonves (lonves@qq.com)
 * @date    2017-05-02 20:23:43
 * @version $Id$
 */
class ColorPoint extends Point{
	constructor(x, y, color){
		super(x, y);

		this.color = color;
	}
}

export {ColorPoint};
