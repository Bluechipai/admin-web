import axios from 'axios' //  yǐn rùaxios
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import { emitter } from '@/utils/bus.js'
import router from '@/router/index'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 99999
})
let acitveAxios = 0
let timer
const showLoading = () => {
  acitveAxios++
  if (timer) {
    clearTimeout(timer)
  }
  timer = setTimeout(() => {
    if (acitveAxios > 0) {
      emitter.emit('showLoading')
    }
  }, 400)
}

const closeLoading = () => {
  acitveAxios--
  if (acitveAxios <= 0) {
    clearTimeout(timer)
    emitter.emit('closeLoading')
  }
}
// http request  lán jié qì
service.interceptors.request.use(
  config => {
    if (!config.donNotShowLoading) {
      showLoading()
    }
    const userStore = useUserStore()
    config.headers = {
      'Content-Type': 'application/json',
      'x-token': userStore.token,
      'x-user-id': userStore.userInfo.ID,
      ...config.headers
    }
    return config
  },
  error => {
    if (!error.config.donNotShowLoading) {
      closeLoading()
    }
    ElMessage({
      showClose: true,
      message: error,
      type: 'error'
    })
    return error
  }
)

// http response  lán jié qì
service.interceptors.response.use(
  response => {
    const userStore = useUserStore()
    if (!response.config.donNotShowLoading) {
      closeLoading()
    }
    if (response.headers['new-token']) {
      userStore.setToken(response.headers['new-token'])
    }
    if (response.data.code === 0 || response.headers.success === 'true') {
      if (response.headers.msg) {
        response.data.msg = decodeURI(response.headers.msg)
      }
      return response.data
    } else {
      ElMessage({
        showClose: true,
        message: response.data.msg || decodeURI(response.headers.msg),
        type: 'error'
      })
      if (response.data.data && response.data.data.reload) {
        userStore.token = ''
        localStorage.clear()
        router.push({ name: 'Login', replace: true })
      }
      return response.data.msg ? response.data : response
    }
  },
  error => {
    if (!error.config.donNotShowLoading) {
      closeLoading()
    }

    if (!error.response) {
      ElMessageBox.confirm(`
        <p> jiǎn cè dào qǐng qiú cuò wù</p>
        <p>${error}</p>
        `, ' qǐng qiú bào cuò', {
        dangerouslyUseHTMLString: true,
        distinguishCancelAndClose: true,
        confirmButtonText: ' shāo hòu zhòng shì',
        cancelButtonText: ' qǔ xiāo'
      })
      return
    }

    switch (error.response.status) {
      case 500:
        ElMessageBox.confirm(`
        <p> jiǎn cè dào jiē kǒu cuò wù${error}</p>
        <p> cuò wù mǎ<span style="color:red"> 500 </span>： cǐ lèi cuò wù nèi róng cháng jiàn yú hòu táipanic， qǐng xiān chá kàn hòu tái rì zhì， rú guǒ yǐng xiǎng nín zhèng cháng shǐ yòng kě qiáng zhì dēng chū qīng lǐ huǎn cún</p>
        `, ' jiē kǒu bào cuò', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: ' qīng lǐ huǎn cún',
          cancelButtonText: ' qǔ xiāo'
        })
          .then(() => {
            const userStore = useUserStore()
            userStore.token = ''
            localStorage.clear()
            router.push({ name: 'Login', replace: true })
          })
        break
      case 404:
        ElMessageBox.confirm(`
          <p> jiǎn cè dào jiē kǒu cuò wù${error}</p>
          <p> cuò wù mǎ<span style="color:red"> 404 </span>： cǐ lèi cuò wù duō wèi jiē kǒu wèi zhù cè（ huò wèi zhòng qǐ） huò zhě qǐng qiú lù jìng（ fāng fǎ） yǔapi lù jìng（ fāng fǎ） bù fú-- rú guǒ wèi zì dòng huà dài mǎ qǐng jiǎn chá shì fǒu cún zài kōng gé</p>
          `, ' jiē kǒu bào cuò', {
          dangerouslyUseHTMLString: true,
          distinguishCancelAndClose: true,
          confirmButtonText: ' wǒ zhī dào le',
          cancelButtonText: ' qǔ xiāo'
        })
        break
    }

    return error
  }
)
export default service
