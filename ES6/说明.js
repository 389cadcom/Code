/*
-Stage 0 - Strawman（展示阶段）

-Stage 1 - Proposal（征求意见阶段）

-Stage 2 - Draft（草案阶段）

-Stage 3 - Candidate（候选人阶段）

-Stage 4 - Finished（定案阶段）
*/

//12.29 --ES6内部只有静态方法, 没有静态属性, ES7有一个静态属性的提案, 目前 Babel 转码器支持

es6定义的实例方法不可遍历，只有构造函数属性才可遍历
es5定义的都可遍历

Object.defineProperty(p, 'sex', {
  writable: true,
  configurable: false,
  enumerable: false
})

Object.defineProperties(p, {
  'sex': {
    writable: true,
    configurable: false,
    enumerable: false
  }
})