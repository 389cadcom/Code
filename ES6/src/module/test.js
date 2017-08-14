import def, {firstName, lastName, year} from './profile.js';

//module Person from './profile.js';

/*
node6不支持module

要使用babel-node执行-->  babel-node test.js
*/

for(var i=0; i<12; i++){
    console.log(i);
}

console.log(firstName, lastName, year, def)
