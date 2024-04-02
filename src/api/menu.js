import service from '@/utils/request'
// @Summary  yòng hù dēng lù  huò qǔ dòng tài lù yóu
// @Produce  application/json
// @Param  kě yǐ shén me dōu bù tián  diào yī xià jí kě
// @Router /menu/getMenu [post]
export const asyncMenu = () => {
  return service({
    url: '/menu/getMenu',
    method: 'post'
  })
}

// @Summary  huò qǔmenu liè biǎo
// @Produce  application/json
// @Param {
//  page     int
//	pageSize int
// }
// @Router /menu/getMenuList [post]
export const getMenuList = (data) => {
  return service({
    url: '/menu/getMenuList',
    method: 'post',
    data
  })
}

// @Summary  xīn zēng jī chǔmenu
// @Produce  application/json
// @Param menu Object
// @Router /menu/getMenuList [post]
export const addBaseMenu = (data) => {
  return service({
    url: '/menu/addBaseMenu',
    method: 'post',
    data
  })
}

// @Summary  huò qǔ jī chǔ lù yóu liè biǎo
// @Produce  application/json
// @Param  kě yǐ shén me dōu bù tián  diào yī xià jí kě
// @Router /menu/getBaseMenuTree [post]
export const getBaseMenuTree = () => {
  return service({
    url: '/menu/getBaseMenuTree',
    method: 'post'
  })
}

// @Summary  tiān jiā yòng hùmenu guān lián guān xì
// @Produce  application/json
// @Param menus Object authorityId string
// @Router /menu/getMenuList [post]
export const addMenuAuthority = (data) => {
  return service({
    url: '/menu/addMenuAuthority',
    method: 'post',
    data
  })
}

// @Summary  huò qǔ yòng hùmenu guān lián guān xì
// @Produce  application/json
// @Param authorityId string
// @Router /menu/getMenuAuthority [post]
export const getMenuAuthority = (data) => {
  return service({
    url: '/menu/getMenuAuthority',
    method: 'post',
    data
  })
}

// @Summary  shān chúmenu
// @Produce  application/json
// @Param ID float64
// @Router /menu/deleteBaseMenu [post]
export const deleteBaseMenu = (data) => {
  return service({
    url: '/menu/deleteBaseMenu',
    method: 'post',
    data
  })
}

// @Summary  xiū gǎimenu liè biǎo
// @Produce  application/json
// @Param menu Object
// @Router /menu/updateBaseMenu [post]
export const updateBaseMenu = (data) => {
  return service({
    url: '/menu/updateBaseMenu',
    method: 'post',
    data
  })
}

// @Tags menu
// @Summary  gēn jùid huò qǔ cài dān
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.GetById true " gēn jùid huò qǔ cài dān"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /menu/getBaseMenuById [post]
export const getBaseMenuById = (data) => {
  return service({
    url: '/menu/getBaseMenuById',
    method: 'post',
    data
  })
}
