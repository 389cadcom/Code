1.methods, watcher, computed

2.Vue.mixin, Vue.extend, components, install--Vue.use



//ios�������û�лָ�
var inputs = [...document.querySelectorAll('input'), ...document.querySelectorAll('textarea'), ]
inputs.forEach( input => {
  input.addEventListener('blur', e => {
    setTimeout(() => {
      document.activeElement.scrollIntoViewIfNeeded(true);
      document.body.scrollTop = document.body.scrollTop;
      console.log('blur')
    }, 100)
  });
})



//���ظ���

//�ɹ��������ĸ߶�
let innerHeight = document.querySelector('#app').clientHeight;
//��Ļ�ߴ�߶�
let outerHeight = document.documentElement.clientHeight;
//�ɹ�������������ǰ������ʾ��Χ�ĸ߶�
let scrollTop = document.documentElement.scrollTop;
if (innerHeight < (outerHeight + scrollTop)) {
    //���ظ������
    console.log("loadmore");
}