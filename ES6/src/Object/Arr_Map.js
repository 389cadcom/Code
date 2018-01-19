/*Map, Dictionary*/
var Map = (function () {
  Array.prototype.remove = function (val) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (val == this[i]) {
        this.splice(i, 1);
      }
    }
  }

  function Map() {
    this.keys = [];		//存放键
    this.data = {};		//存放数据
  }
  Map.prototype = {
    set: function (key, value) {
      if (this.data[key] == null) {
        this.keys.push(key);            //key唯一值
      }
      this.data[key] = value;
      return this;
    },
    get: function (key) {
      return this.data[key];
    },
    has: function (key) {
      this.keys.some(function (item) {
        return item === key;
      })
    },
    delete: function (key) {
      this.keys.remove(key);
      this.data[key] = null;
    },
    size: function () {
      return this.keys.length;
    },
    isEmpty: function () {
      return this.keys.length == 0;
    },
    clear: function () {
      this.keys = [];
      this.data = {};
    },
	/**
	 * 遍历Map
	 * @param {Function} 回调函数  fn(key, value, index)
	 */
    each: function (fn) {
      if (typeof fn != 'function') return;

      var len = this.keys.length
      for (var i = 0; i < len; i++) {
        var key = this.keys[i];
        fn(key, this.data[key], i);
      }
    },
    keys: function () {
      return this.keys;
    },
    entries: function () {
      var len = this.keys.length;
      var arr = new Array[len];

      for (var i = 0; i < len; i++) {
        var key = this.keys[i];
        arr[i] = {
          key: key,
          value: this.data[key]
        }
      }
      return arr;
    },
    toString: function () {
      var str = '{';
      for (var i = 0, len = this.keys.length; i < len; i++) {
        var key = this.keys[i],
          val = this.data[key];
        str += key + '=' + val;
        if (i != len - 1) {
          str += ','
        }
      }
      str += '}';
      return str;
    }
  }
  return Map;
})(window);
