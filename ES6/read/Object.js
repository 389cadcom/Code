//����

Object.defineProperty(obj, 'a', {value: 'Hi'})


//�����������ָ��Ϊһ��Symbolֵ
Object.defineProperty(obj, sym, {value: 'H'});


Object.getOwnPropertySymbols()

Object.getOwnPropertyNames()


//�½�һ������ ES6
obj = Object.assign({}, obj, {a:1, b:2})