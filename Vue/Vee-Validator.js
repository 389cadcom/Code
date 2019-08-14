/**
 * Validator --> create, dictionary, local, localize, extend
 */
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate';
import zh from 'vee-validate/dist/locale/zh_CN';

Validator.localize('zh_CN', zh);        //配置中文提示

//自定义提示语--覆盖、合并默认提示语
const dictionary = {
  zh_CN: {
    messages: {
      required: field => "请输入" + field,
      email: () => '请输入正确的邮箱格式'
    },
    attributes: {
      email: '邮箱',
      phone: '手机号'
    },
  }
}
Validator.localize(dictionary)

//扩展自定义的验证
Validator.extend('phone', {
  getMessage: field => field + '必须是11位手机号码',    //手机格式不正确
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
});

//基础配置
const config = {
  locale    : 'zh_CN',
  classes   : true,
  classNames: {
    valid   : 'is-valid',  // success
    invalid : 'is-invalid' // error
  },
}
Vue.use(VeeValidate, config);