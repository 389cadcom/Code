export default {
	format(){
		
	},
	getRunTime(time) {
		time    = String(time).padEnd(13, '0')*1 - Date.now();
		var day = Math.floor(time / 1000 / 60 / 60 / 24);
		var hour = Math.floor(time / 1000 / 60 / 60 % 24);
		var minute = Math.floor(time / 1000 / 60 % 60);
		var second = Math.floor(time / 1000 % 60);

		return {
			day,
			hour: String(hour).padStart(2, '0'),
			minute: String(minute).padStart(2, '0'),
			second: String(second).padStart(2, '0')
		}
	},
  goodTime (str) {
    let now      = new Date().getTime()
    let oldTime  = new Date(str).getTime()
    let distance = now - oldTime
    let result   = ''
    let minute   = 1000 * 60
    let hour     = minute * 60
    let day      = hour * 24
    let month    = day * 30
    let year     = month * 12
    let _year    = distance / year
    let _month   = distance / month
    let _week    = distance / (7 * day)
    let _day     = distance / day
    let _hour    = distance / hour
    let _min     = distance / minute

    if (_year >= 1) {
      result = ~~(_year) + ' ��ǰ'
    } else if (_month >= 1) {
      result = ~~(_month) + ' ����ǰ'
    } else if (_week >= 1) {
      result = ~~(_week) + ' ��ǰ'
    } else if (_day >= 1) {
      result = ~~(_day) + ' ��ǰ'
    } else if (_hour >= 1) {
      result = ~~(_hour) + ' ��Сʱǰ'
    } else if (_min >= 1) {
      result = ~~(_min) + ' ����ǰ'
    } else {
      result = '�ո�'
    }
    return result
  },
	getTime1(){
		//return +new Date() || Date.now()	
		return new Date().setHours(0, 0, 0, 0)
	},
	zeroPad(num){
		return +num <=9 ? '0'+num + num;
	}
}
