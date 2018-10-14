{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["ie >=9"]			//配置当前环境
      },
      "useBuiltIns": true,
      "debug": true
    }]
  ],
	"plugins": ["transform-runtime"]
}
//useBuiltIns: true   根据当前配置的环境去加载对应的一系列插件译替换直接引用babel-polyfill
//入口文件添加 require('babel-polyfill')

Using targets:
{
  "ie": "9"
}

Modules transform: commonjs

Using plugins:
  check-es2015-constants {"ie":"9"}
  transform-es2015-arrow-functions {"ie":"9"}
  transform-es2015-block-scoped-functions {"ie":"9"}
  transform-es2015-block-scoping {"ie":"9"}
  transform-es2015-classes {"ie":"9"}
  transform-es2015-computed-properties {"ie":"9"}
  transform-es2015-destructuring {"ie":"9"}
  transform-es2015-duplicate-keys {"ie":"9"}
  transform-es2015-for-of {"ie":"9"}
  transform-es2015-function-name {"ie":"9"}
  transform-es2015-literals {"ie":"9"}
  transform-es2015-object-super {"ie":"9"}
  transform-es2015-parameters {"ie":"9"}
  transform-es2015-shorthand-properties {"ie":"9"}
  transform-es2015-spread {"ie":"9"}
  transform-es2015-sticky-regex {"ie":"9"}
  transform-es2015-template-literals {"ie":"9"}
  transform-es2015-typeof-symbol {"ie":"9"}
  transform-es2015-unicode-regex {"ie":"9"}
  transform-regenerator {"ie":"9"}
  transform-exponentiation-operator {"ie":"9"}
  transform-async-to-generator {"ie":"9"}
  syntax-trailing-function-commas {"ie":"9"}

Using polyfills:
  es6.typed.array-buffer {"ie":"9"}
  es6.typed.data-view {"ie":"9"}
  es6.typed.int8-array {"ie":"9"}
  es6.typed.uint8-array {"ie":"9"}
  es6.typed.uint8-clamped-array {"ie":"9"}
  es6.typed.int16-array {"ie":"9"}
  es6.typed.uint16-array {"ie":"9"}
  es6.typed.int32-array {"ie":"9"}
  es6.typed.uint32-array {"ie":"9"}
  es6.typed.float32-array {"ie":"9"}
  es6.typed.float64-array {"ie":"9"}
  es6.map {"ie":"9"}
  es6.set {"ie":"9"}
  es6.weak-map {"ie":"9"}
  es6.weak-set {"ie":"9"}
  es6.reflect.apply {"ie":"9"}
  es6.reflect.construct {"ie":"9"}
  es6.reflect.define-property {"ie":"9"}
  es6.reflect.delete-property {"ie":"9"}
  es6.reflect.get {"ie":"9"}
  es6.reflect.get-own-property-descriptor {"ie":"9"}
  es6.reflect.get-prototype-of {"ie":"9"}
  es6.reflect.has {"ie":"9"}
  es6.reflect.is-extensible {"ie":"9"}
  es6.reflect.own-keys {"ie":"9"}
  es6.reflect.prevent-extensions {"ie":"9"}
  es6.reflect.set {"ie":"9"}
  es6.reflect.set-prototype-of {"ie":"9"}
  es6.promise {"ie":"9"}
  es6.symbol {"ie":"9"}
  es6.object.freeze {"ie":"9"}
  es6.object.seal {"ie":"9"}
  es6.object.prevent-extensions {"ie":"9"}
  es6.object.is-frozen {"ie":"9"}
  es6.object.is-sealed {"ie":"9"}
  es6.object.is-extensible {"ie":"9"}
  es6.object.get-own-property-descriptor {"ie":"9"}
  es6.object.get-prototype-of {"ie":"9"}
  es6.object.keys {"ie":"9"}
  es6.object.get-own-property-names {"ie":"9"}
  es6.object.assign {"ie":"9"}
  es6.object.is {"ie":"9"}
  es6.object.set-prototype-of {"ie":"9"}
  es6.function.name {"ie":"9"}
  es6.string.raw {"ie":"9"}
  es6.string.from-code-point {"ie":"9"}
  es6.string.code-point-at {"ie":"9"}
  es6.string.repeat {"ie":"9"}
  es6.string.starts-with {"ie":"9"}
  es6.string.ends-with {"ie":"9"}
  es6.string.includes {"ie":"9"}
  es6.regexp.flags {"ie":"9"}
  es6.regexp.match {"ie":"9"}
  es6.regexp.replace {"ie":"9"}
  es6.regexp.split {"ie":"9"}
  es6.regexp.search {"ie":"9"}
  es6.array.from {"ie":"9"}
  es6.array.of {"ie":"9"}
  es6.array.copy-within {"ie":"9"}
  es6.array.find {"ie":"9"}
  es6.array.find-index {"ie":"9"}
  es6.array.fill {"ie":"9"}
  es6.array.iterator {"ie":"9"}
  es6.number.is-finite {"ie":"9"}
  es6.number.is-integer {"ie":"9"}
  es6.number.is-safe-integer {"ie":"9"}
  es6.number.is-nan {"ie":"9"}
  es6.number.epsilon {"ie":"9"}
  es6.number.min-safe-integer {"ie":"9"}
  es6.number.max-safe-integer {"ie":"9"}
  es6.math.acosh {"ie":"9"}
  es6.math.asinh {"ie":"9"}
  es6.math.atanh {"ie":"9"}
  es6.math.cbrt {"ie":"9"}
  es6.math.clz32 {"ie":"9"}
  es6.math.cosh {"ie":"9"}
  es6.math.expm1 {"ie":"9"}
  es6.math.fround {"ie":"9"}
  es6.math.hypot {"ie":"9"}
  es6.math.imul {"ie":"9"}
  es6.math.log1p {"ie":"9"}
  es6.math.log10 {"ie":"9"}
  es6.math.log2 {"ie":"9"}
  es6.math.sign {"ie":"9"}
  es6.math.sinh {"ie":"9"}
  es6.math.tanh {"ie":"9"}
  es6.math.trunc {"ie":"9"}
  es7.array.includes {"ie":"9"}
  es7.object.values {"ie":"9"}
  es7.object.entries {"ie":"9"}
  es7.object.get-own-property-descriptors {"ie":"9"}
  es7.string.pad-start {"ie":"9"}
  es7.string.pad-end {"ie":"9"}
  web.timers {"ie":"9"}
  web.immediate {"ie":"9"}
  web.dom.iterable {"ie":"9"}