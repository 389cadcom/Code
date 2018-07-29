//Vue.prototype.$utils = utils

export default {
  //��ȡʱ���
  getTime (str) {
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
  }
}
