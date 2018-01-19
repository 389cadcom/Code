/*
 * @Author: Lonves 
 * @Date: 2017-09-30 14:40:43 
 * @Last Modified by:   lonves.zheng 
 * @Last Modified time: 2017-09-30 14:40:43 
 * 
 * ES5定义Set、Map对象
 */
class Set {
    //对_set进行去重;
    static refresh() {
        let _this = this;
        let __set = [];
        this._set.forEach(function(obj) {
            if (__set.indexOf(obj) === -1 && obj != undefined) {
                __set.push(obj);
            }
        });
        _this._set = __set;
        this.size = _this._set.length;
    }
    constructor(arg) {
        this.size = 0;
        this[Symbol.species] = this;
        this._set = (Array.isArray(arg) && arg) || [];
        Set.refresh.call(this);
    }
    add(obj) {
        this._set.push(obj);
        Set.refresh.call(this);
        return this;
    }
    clear() {
        this._set.length = 0;
        return this;
    }
    delete(obj) {
        if (this._set.indexOf(obj) != -1) {
            this._set[this._set.indexOf(obj)] = undefined;
        }
        Set.refresh.call(this);
        return this;
    }
    /**
     * @desc
     * @return Entries [[],[],[],[]]
     * */
    entries() {
        let result = [];
        this.forEach(function(key, value) {
            result.push([key, value]);
        });
        return result;
    }
    has() {
        if (this._set.indexOf(obj) != -1) return true;
    }
    keys() {
        return this[Symbol.iterator]();
    }
    values() {
        return this[Symbol.iterator]();
    }
    //直接使用数组的forEach方便啊;
    forEach(fn, context) {
        let _this = this;
        this._set.forEach(value =>
            fn.call(context || value, value, value, _this)
        );
    }
    //必须支持生成器的写法;
    *[Symbol.iterator]() {
        let index = 0;
        let val = undefined;
        while (index < this.size) {
            val = this._set[index];
            yield val;
            index++;
        }
    }
}
var set = new Set([0, 0]);
//对Set进行基本的操作;



"use strict";
class Map {
    /**
     * @param [[key, value], [k, val]];
     * @return void;
     */
    static refresh (arg) {
        for(let [key,value] of arg) {
            //判断是否重复了；
            let index = Map.has.call(this, key);
            if(index===false) {
                this._keys.push(key);
                this._values.push(value);
            }else{
                //如果有重复的值，那么我们执行覆盖;
                this._keys[index] = key;
                this._values[index] = value;
            }
        };
        this.size = this._keys.length;
    }
    /**
     * @desc return false || Number；
     * */
    static has (key) {
        var index = this._keys.indexOf(key);
        if(index === -1) {
            return false;
        }else{
            return index;
        };
    }
    constructor(arg) {
        this._keys = [];
        this._values = [];
        Map.refresh.call(this, arg);
    }
    set (key, value) {
        Map.refresh.call(this, [[key,value]]);
        return this;
    }
    clear () {
        this._keys = [];
        this._values = [];
        return this;
    }
    delete (key) {
        var index = Map.has.call(this, key);
        if(index!==false) {
            this._keys.splice(index,1);
            this._values.splice(index,1);
        };
        return this;
    }
    entries () {
        return this[Symbol.iterator]();
    }
    has (key) {
        return Map.has.call(this, key) === false ? false : true;
    }
    *keys() {
        for(let k of this._keys) {
            yield k;
        }
    }
    *values () {
        for(let v of this._values) {
            yield v;
        }
    }
    //直接使用数组的forEach方便啊;
    forEach (fn, context) {
        return this;
    }
    //必须支持生成器的写法;
    *[Symbol.iterator] (){
        for(var i=0; i<this._keys.length; i++) {
            yield [this._keys[i], this._values[i]];
        }
    }
};