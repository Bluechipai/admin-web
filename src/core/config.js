/**
 *  wǎng zhàn pèi zhì wén jiàn
 */

const config = {
  appName: 'Gin-Vue-Admin',
  appLogo: 'https://www.gin-vue-admin.com/img/logo.png',
  showViteLogo: true
}

export const viteLogo = (env) => {
  if (config.showViteLogo) {
    const chalk = require('chalk')
    console.log(
      chalk.green(
        `>  huān yíng shǐ yòngGin-Vue-Admin， kāi yuán dì zhǐ：https://github.com/flipped-aurora/gin-vue-admin`
      )
    )
    console.log(
      chalk.green(
        `>  dāng qián bǎn běn:v2.5.6`
      )
    )
    console.log(
      chalk.green(
        `>  jiā qún fāng shì: wēi xìn：shouzi_1994 QQ qún：622360840`
      )
    )
    console.log(
      chalk.green(
        `> GVA tǎo lùn shè qū：https://support.qq.com/products/371961`
      )
    )
    console.log(
      chalk.green(
        `>  chā jiàn shì chǎng:https://plugin.gin-vue-admin.com`
      )
    )
    console.log(
      chalk.green(
        `>  mò rèn zì dòng huà wén dàng dì zhǐ:http://127.0.0.1:${env.VITE_SERVER_PORT}/swagger/index.html`
      )
    )
    console.log(
      chalk.green(
        `>  mò rèn qián duān wén jiàn yùn xíng dì zhǐ:http://127.0.0.1:${env.VITE_CLI_PORT}`
      )
    )
    console.log(
      chalk.green(
        `>  rú guǒ xiàng mù ràng nín huò dé le shōu yì， xī wàng nín néng qǐng tuán duì hē bēi kě lè:https://www.gin-vue-admin.com/coffee/index.html`
      )
    )
    console.log('\n')
  }
}

export default config
