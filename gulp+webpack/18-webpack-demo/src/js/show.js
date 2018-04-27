import _ from 'lodash';
import { cube} from './maths'

function show(content) {
  window.document.getElementById('app').innerText = 'He,' + content;

  /* let el = document.createElement('div');
  el.innerText = _.join(['Hello', ' ',  'Hi'], '')
  document.body.appendChild(el) */
}
var num = cube(5);
console.log('立方计算:' + num);

module.exports = show;