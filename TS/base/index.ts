/* import User from '../class/User';

let user:User = new User(1, 'jack');
user.say() */

import Hello from './Decorator';

let jack:Hello = new Hello();
jack.name = "jack";
console.log(jack.id);
 
//jack.changeName('');