import config from './config'

//  tǒng yī dǎo rùel-icon tú biāo
import * as ElIconModules from '@element-plus/icons-vue'
//  dǎo rù zhuǎn huàn tú biāo míng chēng de hán shù

export const register = (app) => {
  //  tǒng yī zhù cèel-icon tú biāo
  for (const iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
  }
  app.config.globalProperties.$GIN_VUE_ADMIN = config
}
