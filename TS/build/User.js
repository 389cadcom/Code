"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
    }
    constructor(id, name) {
        this.id = id; // 只读属性只能在构造函数里初始化
        this.name = name;
    }
    say() {
        console.log(`name ${this._name}`);
    }
    static print() {
        console.log('static metch 断点需主文件添加断点才有效');
    }
}
exports.default = User;
let jack = new User(1, 'jack');
console.log(jack instanceof User);
console.log(jack.name, jack.id, jack._name);
jack.say();
