import { useUserStore } from '@/pinia/modules/user'
import { useRouterStore } from '@/pinia/modules/router'
import getPageTitle from '@/utils/page'
import router from '@/router'
import Nprogress from 'nprogress'

const whiteList = ['Login', 'Init']

const getRouter = async(userStore) => {
  const routerStore = useRouterStore()
  await routerStore.SetAsyncRouter()
  await userStore.GetUserInfo()
  const asyncRouters = routerStore.asyncRouters
  asyncRouters.forEach(asyncRouter => {
    router.addRoute(asyncRouter)
  })
}

async function handleKeepAlive(to) {
  if (to.matched.some(item => item.meta.keepAlive)) {
    if (to.matched && to.matched.length > 2) {
      for (let i = 1; i < to.matched.length; i++) {
        const element = to.matched[i - 1]
        if (element.name === 'layout') {
          to.matched.splice(i, 1)
          await handleKeepAlive(to)
        }
        //  rú guǒ méi yǒu àn xū jiā zài wán chéng zé děng dài jiā zài
        if (typeof element.components.default === 'function') {
          await element.components.default()
          await handleKeepAlive(to)
        }
      }
    }
  }
}

router.beforeEach(async(to, from) => {
  const routerStore = useRouterStore()
  Nprogress.start()
  const userStore = useUserStore()
  to.meta.matched = [...to.matched]
  handleKeepAlive(to)
  const token = userStore.token
  //  zài bái míng dān zhōng de pàn duàn qíng kuàng
  document.title = getPageTitle(to.meta.title, to)
  if (whiteList.indexOf(to.name) > -1) {
    if (token) {
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter(userStore)
      }
      // token  kě yǐ jiě xī dàn shì què shì bù cún zài de yòng hù id  huò jiǎo sè id  huì dǎo zhì wú xiàn diào yòng
      if (userStore.userInfo?.authority?.defaultRouter != null) {
        return { name: userStore.userInfo.authority.defaultRouter }
      } else {
        //  qiáng zhì tuì chū zhàng hào
        userStore.ClearStorage()
        return {
          name: 'Login',
          query: {
            redirect: document.location.hash
          }
        }
      }
    } else {
      return true
    }
  } else {
    //  bù zài bái míng dān zhōng bìng qiě yǐ jīng dēng lù de shí hòu
    if (token) {
      //  tiān jiāflag fáng zhǐ duō cì huò qǔ dòng tài lù yóu hé zhàn yì chū
      if (!routerStore.asyncRouterFlag && whiteList.indexOf(from.name) < 0) {
        await getRouter(userStore)
        if (userStore.token) {
          return { ...to, replace: true }
        } else {
          return {
            name: 'Login',
            query: { redirect: to.href }
          }
        }
      } else {
        if (to.matched.length) {
          return true
        } else {
          return { path: '/layout/404' }
        }
      }
    }
    //  bù zài bái míng dān zhōng bìng qiě wèi dēng lù de shí hòu
    if (!token) {
      return {
        name: 'Login',
        query: {
          redirect: document.location.hash
        }
      }
    }
  }
})

router.afterEach(() => {
  //  lù yóu jiā zài wán chéng hòu guān bì jìn dù tiáo
  document.getElementsByClassName('main-cont main-right')[0]?.scrollTo(0, 0)
  Nprogress.done()
})

router.onError(() => {
  //  lù yóu fā shēng cuò wù hòu xiāo huǐ jìn dù tiáo
  Nprogress.remove()
})
