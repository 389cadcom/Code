/**
  1.���eslint��ȫ�֣�����Ҳ����ȫ�ְ�װ html -- npm i eslint-plugin-html -g 
  2.plugins: ['vue'] -- eslint-plugin-html eslint-plugin-vue

  �ڸ�Ŀ¼��.eslintignore����ӣ�*.vue���ͻ��������vue��׺�ļ����

  "off"����0		//���ԣ��رչ���ر�
  "warn"����1		//�ڴ򿪵Ĺ�����Ϊ���棨��Ӱ���˳����룩
  "error"����2		//�ѹ�����Ϊһ�������˳����봥��ʱΪ1��
*/
//������˲������ʶ���ļ��е�js���룬û��MIME���ͱ�ʶû��script��ǩҲ����ʶ�𵽣���ʶ��.vue�ļ��е�js����
/* eslint-disable */

module.exports = {
    parser: 'babel-eslint',//����������������ʹ��babel-eslint
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        sourceType: 'module',
        parser: 'babel-eslint'
    },
    plugins: ['vue'],		
    rules: {
		'indent': 0								// ����indent
        indent: ['error', 2],
		'no-mixed-spaces-and-tabs': [2, true],	//ͬʱʹ��tab space
        'linebreak-style': ['error', 'unix'],
		"no-unused-vars": [2, { 
		  // ��������δʹ�ñ���
		  "vars": "local",
		  // ���������
		  "args": "none" 
		}],
        quotes: ['error', 'single'],
        semi: ['error', 'never']
    },
    /* globals: {
        __dirname: true
    } */
}

