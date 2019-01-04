"use strict";
/* import User from '../class/User';

let user:User = new User(1, 'jack');
user.say() */
Object.defineProperty(exports, "__esModule", { value: true });
const Decorator_1 = require("./Decorator");
let jack = new Decorator_1.default();
jack.name = "jack";
console.log(jack.id);
//jack.changeName('');
