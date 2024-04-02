
import axios from 'axios'
import { ref } from 'vue'

const weatherInfo = ref(' jīn rì qíng，0℃ - 10℃， tiān qì hán lěng， zhù yì tiān jiā yī wù。')
const amapKey = '8e8baa8a7317586c29ec694895de6e0a'

export const useWeatherInfo = () => {
  ip()
  return weatherInfo
}

export const ip = async() => {
  // key huàn chéng nǐ zì jǐ de https://console.amap.com/dev/index
  if (amapKey === '') {
    return false
  }
  const res = await axios.get('https://restapi.amap.com/v3/ip?key=' + amapKey)
  if (res.data.adcode) {
    getWeather(res.data.adcode)
  }
}

const getWeather = async(code) => {
  const response = await axios.get('https://restapi.amap.com/v3/weather/weatherInfo?key=' + amapKey + '&extensions=base&city=' + code)
  if (response.data.status === '1') {
    const s = response.data.lives[0]
    weatherInfo.value = s.city + '  tiān qì：' + s.weather + '  wēn dù：' + s.temperature + ' shè shì dù  fēng xiàng：' + s.winddirection + '  fēng lì：' + s.windpower + ' jí  kōng qì shī dù：' + s.humidity
  }
}

