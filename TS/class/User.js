"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(id, name) {
        this.id = id; // 只读属性只能在构造函数里初始化
        this.name = name;
    }
    Object.defineProperty(User.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.say = function () {
        console.log("name " + this._name);
    };
    User.print = function () {
        console.log('static metch 断点需主文件添加断点才有效');
    };
    return User;
}());

exports["default"] = User;
var jack = new User(1, 'jack');
console.log(jack instanceof User);
console.log(jack.name, jack.id, jack._name);
jack.say();
