global.msg = 'ha';


let arrow = {
    msg: 'msg',
    init(){
        //箭头无法通过apply, call改变上下文
        this.getMsg = () => this.msg;
    },
    foo() {
        // console.log(this);
        return this.msg;
    }
}
let b = {
    msg: 'Hi'
}

arrow.init();

console.log(arrow.foo())
console.log(arrow.foo.call(b))

console.log(arrow.getMsg.call(b))
//
console.log(arrow.foo.bind(b)())

