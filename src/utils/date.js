//  duìDate de kuò zhǎn， jiāng Date  zhuǎn huà wèi zhǐ dìng gé shì deString
//  yuè(M)、 rì(d)、 xiǎo shí(h)、 fēn(m)、 miǎo(s)、 jì dù(q)  kě yǐ yòng 1-2  gè zhàn wèi fú，
//  nián(y) kě yǐ yòng 1-4  gè zhàn wèi fú， háo miǎo(S) zhǐ néng yòng 1  gè zhàn wèi fú( shì 1-3  wèi de shù zì)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //  yuè fèn
    'd+': this.getDate(), //  rì
    'h+': this.getHours(), //  xiǎo shí
    'm+': this.getMinutes(), //  fēn
    's+': this.getSeconds(), //  miǎo
    'q+': Math.floor((this.getMonth() + 3) / 3), //  jì dù
    'S': this.getMilliseconds() //  háo miǎo
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function formatTimeToStr(times, pattern) {
  var d = new Date(times).Format('yyyy-MM-dd hh:mm:ss')
  if (pattern) {
    d = new Date(times).Format(pattern)
  }
  return d.toLocaleString()
}
