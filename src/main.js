import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import 'element-plus/es/components/message-box/style/css'
import './style/element_visiable.scss'
import { createApp } from 'vue'
//  yǐn rùgin-vue-admin qián duān chū shǐ huà xiāng guān nèi róng
import './core/gin-vue-admin'
//  yǐn rù fēng zhuāng derouter
import router from '@/router/index'
import '@/permission'
import run from '@/core/gin-vue-admin.js'
import auth from '@/directive/auth'
import { store } from '@/pinia'
import App from './App.vue'
import { initDom } from './utils/positionToCode'

initDom()
/**
 * @description  dǎo rù jiā zài jìn dù tiáo， fáng zhǐ shǒu píng jiā zài shí jiān guò zhǎng， yòng hù děng dài
 *
 * */
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Nprogress.configure({ showSpinner: false, ease: 'ease', speed: 500 })
Nprogress.start()

/**
 *  wú xū zài zhè kuài jié shù， huì zài lù yóu zhōng jiān jiàn zhōng jié shù cǐ kuài nèi róng
 * */

const app = createApp(App)
app.config.productionTip = false

app
  .use(run)
  .use(store)
  .use(auth)
  .use(router)
  .mount('#app')

export default app
