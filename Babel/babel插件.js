//������ת��������
{   presets: [],   plugins: [] }

//{presets: ['es2015']}

//Ԥ��presets  --> plugins�����				http://babeljs.io/docs/plugins/
env, es2015, es2016, es2017, latest, react		//latest  --> babel-preset-env����

//es2015
check-es2015-constants					// ����const�����Ƿ����¸�ֵ
transform-es2015-arrow-functions		// �����ͷ����
transform-es2015-block-scoped-functions	// ������������������
transform-es2015-block-scoping			// ����const��let
transform-es2015-classes				// ����class
transform-es2015-computed-properties	// ��������������
transform-es2015-destructuring			// ����⹹��ֵ
transform-es2015-duplicate-keys			// ����������ظ���key����ʵ��ת���ɼ����������
transform-es2015-for-of					// ����for...of
transform-es2015-function-name			// ��function.name����Ӧ�������е�function
transform-es2015-literals				// ��������(8����/16����)��unicode
transform-es2015-modules-commonjs		// ��modules�����commonjs
transform-es2015-object-super			// ����super
transform-es2015-parameters				// �������������Ĭ�ϲ��������������ͽ⹹����
transform-es2015-shorthand-properties	// ����������д
transform-es2015-spread					// ����չ�������
transform-es2015-sticky-regex			// �������sticky����
transform-es2015-template-literals		// ����ģ���ַ���
transform-es2015-typeof-symbol			// ����Symbol����
transform-es2015-unicode-regex			// �������unicodeģʽ
transform-regenerator					// ����generator����

//es2016	--es7
transform-exponentiation-operator		// �����������

//es2017	--es8
syntax-trailing-function-commas			// function���һ����������ʹ�ö���
transform-async-to-generator			// ��async����ת����generator����


/*
	Stage-X(0/1/2/3/4) ����׶�: չʾ�����󡢲ݰ�����ѡ������

	��ת��������δ����׼Ϊ����Javascript������
*/

//stage-4:
syntax-trailing-function-commas			// function���һ����������ʹ�ö��ţ�ES8�Ѿ����ڣ�
transform-async-to-generator			// ��async����ת����generator������ES8�Ѿ����ڣ�
transform-exponentiation-operator		// �������������ES7�Ѿ����ڣ�

babel-preset-stage-3��					// ����stage-4�����ݣ����������²����
transform-object-rest-spread			// �������Ľ⹹��ֵ�Ͳ�������
transform-async-generator-functions		// ��async generator function��for await����Ϊes2015��generator��


//stage-2��								//����stage-3�����ݣ����������²����
syntax-dynamic-import					// ��̬����ģ��
transform-class-properties				// ���뾲̬����(es2015)�����Գ�ʼ���﷨����������(es2016)��
//transform-decorators					�ѽ��õĵȴ��᰸���£������ڴ��ڼ�ʹ�þɰ�ת����


//stage-1��
transform-class-constructor-call(����)	// ����class�е�constructor����Babel7�лᱻ�Ƴ�
transform-export-extensions				// ��������export�﷨����export * as ns from "mod";


//stage-0��
transform-do-expressions				// ����do���ʽ
transform-function-bind					// ����bind���������::



{
	"presets": [ ["env", { "modules":false }], "stage-2"],
	"plugins": [ "transform-runtime" ]
}



//plugins���  Ĭ��ֻת������䣬��ת��API

//Iterator��Generator��Set��Maps��Proxy��Reflect��Symbol��Promise��ȫ�ֶ���
//ȫ�ֶ����ϵķ���Object.assign, Array.from



//���˵��:
babel-plugin-transform-es2015-modules-strip	//���õ��롢����ģ��

babel-plugin-transfrom-runtime				//

babel-plugin-add-module-exports

/*
ע��
���ò��babel-plugin-transfrom-runtime��Babel�ͻ�ʹ��babel-runtime���ߺ����������Զ�����babel-polyfill
*/
