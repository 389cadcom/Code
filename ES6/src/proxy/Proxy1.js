var obj = new Proxy({a:'A'}, {
    get(target, prop){
        console.log('代理获取值', target, prop);
        return prop in target ? target[prop] : `Errror: ${target} has not ${prop} property!`;
    },
    set(target, prop, value){
        console.log('设置值');
        target[prop] = value;
    }
})

console.log(obj.b)


var person = new Proxy({}, {
    set(target, prop, value){
        if(prop == 'age'){
            if(!Number.isInteger(value)){
                throw new TypeError('The age is not an integer');
            }
            if(value > 200){
                throw new RangeError('The age seems invalid');
            }
        }
        target[prop] = value;
    }
})

// person.age = 100;

// person.age = 300;


/*
    handler.getPrototypeOf()
　　handler.setPrototypeOf()
　　handler.isExtensible()
　　handler.preventExtensions()
　　handler.getOwnPropertyDescriptor()
　　handler.defineProperty()
　　handler.has()
　　handler.get()
　　handler.set()
　　handler.deleteProperty()
　　handler.ownKeys()
　　handler.apply()
　　handler.construct()
*/