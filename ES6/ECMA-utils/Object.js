//�ж�����
Object.prototype.toString.call()
({}).toString.call(arr).match(/\s(\[a-zA-Z]+)/)	// 


//1.����תΪMap
new Map(Object.entries(obj))
fn = o => Object.keys(o).reduce((map, k) => map.set(k, o[k]), new Map())	//fn(obj)
