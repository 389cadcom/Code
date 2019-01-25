import Vue from 'vue';
import crypto from 'crypto';
import EXIF from './exif';

export default {
  setCookie: function (name, value, days=168) {
    var d = new Date;
    d.setTime(d.getTime() + 60*60*1000*days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    Vue.prototype[name] = value;
  },
  getCookie: function (name) {
      var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
  },
  clearCookie: function (name) {
      this.setCookie(name, '', -1);
  },
  createMap: function(){
    const promise = new Promise(function(resolve, reject) {
      if(typeof AMap!='undefined'){
        console.log('amap is append');
        resolve()
        return false
      }
      let script = document.createElement('script')
      script.src = 'http://webapi.amap.com/maps?v=1.4.5&key=2930d58e5b798679de367dc6996c5e07'
      document.body.appendChild(script)

      if (script.nodeName === 'SCRIPT') {
        script.onload = () => {
          console.log('地图加载完全')
          resolve()
        }
      } else {
        reject(new Error('Could not script image at ' + script.src))
      }
    })
    return promise;
  },
  getNum(){
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var nums="";
    for(var i=0;i<32;i++){
      var id = parseInt(Math.random()*61);
      nums+=chars[id];
    }
    return nums;
  },
  MD5(str){
    return crypto.createHash("md5").update(str).digest("hex").toUpperCase();
  },
  //加解密
  Encrypt(data, key="asdfg"){
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  },
  Decrypt(encrypted, key="asdfg"){
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
  //图片压缩
  compressImage(file, quality) {
    if(file.size/1024 < 1025){
      return Promise.resolve(file)
    }
    return new Promise(function(resolve, reject){
      var reader = new FileReader();
      var mimeType = file.type || 'image/jpeg';
      var Orientation = null;

      EXIF.getData(file, function() {
        Orientation = EXIF.getTag(this, 'Orientation');

        console.log(Orientation);
      });

      reader.onload = function(){
        var dataURL = reader.result;
        var image = new Image();
        image.onload = canvasImage;
        image.onerror = function(){
          var err = new Error('加载图片文件失败');
          reject(err);
          throw err;
        }
        image.src = dataURL;
      }
      reader.onerror = function(){
        var err = new Error('读取图片文件失败');
        reject(err);
        throw err;
      }
      reader.readAsDataURL(file);

      //canvas
      function canvasImage() {
        var canvas = document.createElement('canvas');
        var ctx;
        var dataURI;
        var result;

        var imgWidth = this.naturalWidth
        var imgHeight = this.naturalHeight
        canvas.width  = imgWidth;
        canvas.height = imgHeight;
        ctx = canvas.getContext('2d');
        if(Orientation && Orientation){
          switch (Orientation) {
            case 6:       //旋转90度
              canvas.width = imgHeight;
              canvas.height = imgHeight;
              ctx.rotate(Math.PI/2)
              ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
              break;
            case 3:       //旋转180度
              ctx.rotate(Math.PI)
              ctx.drawImage(this, 0, -imgWidth, -imgHeight);
              break;
            case 8:       //旋转-90度
              canvas.width = imgHeight;
              canvas.height = imgWidth;
              ctx.rotate(3 * Math.PI / 2);
              ctx.drawImage(this, -imgWidth, 0);
              break;
          }
        }else{
          ctx.drawImage(this, 0, 0);
        }
        dataURI = canvas.toDataURL(mimeType, quality);
        result = dataURIToBlob(dataURI);

        resolve(result);
      }

      //toBlob
      function dataURIToBlob(dataURI) {
        var type = dataURI.match(/data:([^;]+)/)[1];
        var base64 = dataURI.replace(/^[^,]+,/, '');
        var byteString = atob(base64);

        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {type: type});
      }
    })
  }
}
