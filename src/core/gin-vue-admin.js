/*
 * gin-vue-admin web kuāng jià zǔ
 *
 * */
//  jiā zài wǎng zhàn pèi zhì wén jiàn jiā
import { register } from './global'

export default {
  install: (app) => {
    register(app)
    console.log(`
        huān yíng shǐ yòng Gin-Vue-Admin
        dāng qián bǎn běn:v2.5.6
        jiā qún fāng shì: wēi xìn：shouzi_1994 QQ qún：622360840
       GVA tǎo lùn shè qū:https://support.qq.com/products/371961
        chā jiàn shì chǎng:https://plugin.gin-vue-admin.com
        mò rèn zì dòng huà wén dàng dì zhǐ:http://127.0.0.1:${import.meta.env.VITE_SERVER_PORT}/swagger/index.html
        mò rèn qián duān wén jiàn yùn xíng dì zhǐ:http://127.0.0.1:${import.meta.env.VITE_CLI_PORT}
        rú guǒ xiàng mù ràng nín huò dé le shōu yì， xī wàng nín néng qǐng tuán duì hē bēi kě lè:https://www.gin-vue-admin.com/coffee/index.html
    `)
  }
}
