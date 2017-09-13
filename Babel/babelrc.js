//������ת��������
{   presets: [],   plugins: [] }

//Ԥ��presets  --> plugins�����				http://babeljs.io/docs/plugins/
env, es2015, es2016, es2017, latest, react		//latest  --> babel-preset-env����

//{paresets: ['es2015']}

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



//Stage-X
babel-preset-stage-4:					// ��ת��������δ����׼Ϊ����Javascript������
syntax-trailing-function-commas			// function���һ����������ʹ�ö��ţ�ES8�Ѿ����ڣ�
transform-async-to-generator			// ��async����ת����generator������ES8�Ѿ����ڣ�
transform-exponentiation-operator		// �������������ES7�Ѿ����ڣ�

babel-preset-stage-3��					//����stage-4�����ݣ����������²����
transform-object-rest-spread			// �������Ľ⹹��ֵ�Ͳ�������
transform-async-generator-functions		// ��async generator function��for await����Ϊes2015��generator��


babel-preset-stage-2��					//����stage-3�����ݣ����������²����

syntax-dynamic-import					// ��̬����ģ��
transform-class-properties				// ���뾲̬����(es2015)�����Գ�ʼ���﷨����������(es2016)��
//transform-decorators					�ѽ��õĵȴ��᰸���£������ڴ��ڼ�ʹ�þɰ�ת����


babel-preset-stage-1��
transform-class-constructor-call(����)	// ����class�е�constructor����Babel7�лᱻ�Ƴ�
transform-export-extensions				// ��������export�﷨����export * as ns from "mod";ϸ�ڿ��Կ������


babel-preset-stage-0��
transform-do-expressions				// ����do���ʽ
transform-function-bind					// ����bind���������::



//���ò���
{
  "presets": ["env", options]
}
/*
targets.node			֧�ֵ��ĸ��汾�� node
targets.browsers		֧�ֵ��ĸ��汾�������
loose					��������ģʽ����� webpack �� loader ʹ��
modules					ʹ�ú���ģ����ػ���
debug					��������ģʽ
include					������Щ�ļ�
exclude					�ų���Щ�ļ�
useBuiltIns				�Ƿ�� babel-polyfill ���зֽ⣬ֻ��������Ĳ���
*/



/*********************************Babel ���(plugins)************************************/
