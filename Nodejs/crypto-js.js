/*
import AES    from 'crypto-js/aes';
import MD5    from 'crypto-js/md5';
import HMAC   from 'crypto-js/hmac';
import Hex    from 'crypto-js/enc-hex';
import Base64 from 'crypto-js/enc-base64';
import Pkcs7  from 'crypto-js/pad-pkcs7';
import CBC    from 'crypto-js/mode-ecb';
import libs   from 'crypto-js/lib-typedarrays';

console.log(libs.random(16).toString(hex))
CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
*/

const crypto = require('crypto');
const CryptoJS = require('crypto-js');


let key = '1234567812345678'                        //32位--node中key必须32位
let num = '1234567812345678'                        //16位

/**
 * Hex, Base64, Utf8, Utf16, Utf16BE/LE
 * parse, stringify
 */
// iv = CryptoJS.enc.Hex.parse(iv)
//将key转为WordArray对象

key = CryptoJS.enc.Utf8.parse(key)
iv = CryptoJS.enc.Utf8.parse(num)


/**
 * 加密模式默认：    CryptoJS.mode.CBC
 * 偏移量默认:       CryptoJS.pad.Pkcs7
 */
let option = {
  iv: iv,
  // mode   : CryptoJS.mode.CBC,                        
  // padding: CryptoJS.pad.Pkcs7                       
}

module.exports = {

  MD5(val) {
    var hash = crypto.createHash('md5');
    hash.update(val);

    return hash.digest('hex')
  },
  key: '1234567812345678',                             
  iv : '1234567812345678',                             //16位
  encode: 'hex',                                       //加密后字符
  mode: 'aes-256-cbc',                                 //node中  128key必须16位, 256key必须是32五个
  AES(data){
    //Node-AES加密
    var hash = crypto.createCipheriv(this.mode, this.key, this.iv)
    hash.update(data, 'utf8')
    return hash.final(this.encode)
  },
  AES1(data){
    var hash = crypto.createDecipheriv(this.mode, this.key, this.iv)
    hash.update(data, this.encode)
    return hash.final('utf8')
  },

  //aes加密、解密
  encrypt(data) {
    var res, result = CryptoJS.AES.encrypt(data, key, option)
    res = result.toString()
    // res = result.ciphertext.toString()

    base64 = CryptoJS.enc.Base64.parse(res);          //base64 --> WordArray对象
    str = CryptoJS.enc.Hex.stringify(base64)          //WordArray  --> 转为16进制
    return str;
  },
  //默认加密后是base64
  decrypt(data) {
    let parse = CryptoJS.enc.Hex.parse(data);               //将十六进制转为 --> WordArray对象
    let base64 = CryptoJS.enc.Base64.stringify(parse)       //转为Base64

    let result = CryptoJS.AES.decrypt(base64, key, option);  //解码
    result = result.toString(CryptoJS.enc.Utf8)
    return result;
  },
  encrypt64(data){
    var str = CryptoJS.AES.encrypt(data, key, option);
    str = str.toString();
    return str;
  },
  decrypt64(data){
    let str, result = CryptoJS.AES.decrypt(data, key, option)

    // str = CryptoJS.enc.Utf8.stringify(result);
    //默认CryptoJS.enc.Hex，即16进制字符串
    str = result.toString(CryptoJS.enc.Utf8)
    return str;
  }
}
