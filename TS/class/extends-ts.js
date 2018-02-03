var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Person = (function () {
    function Person() {
    }
    Person.prototype.run = function () {
        console.log('run');
    };
    return Person;
}());
var Man = (function (_super) {
    __extends(Man, _super);
    function Man() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Man.prototype.move = function () {
        console.log('move');
    };
    return Man;
}(Person));
