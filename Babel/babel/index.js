//ES2020  globalThis, String.property.matchAll, import(), BigInt, Promise.allSettled

const decro = (val) => (_class) => new _class(val);

@decro("abc")
class Test {
  name = 'decorator'
  constructor(val){
    this.val = val
  }
  log() {
    console.log(this.val);
  }
}

Test.log();
