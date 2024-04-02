import service from '@/utils/request'
// @Tags SysDictionaryDetail
// @Summary  chuàng jiànSysDictionaryDetail
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionaryDetail true " chuàng jiànSysDictionaryDetail"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /sysDictionaryDetail/createSysDictionaryDetail [post]
export const createSysDictionaryDetail = (data) => {
  return service({
    url: '/sysDictionaryDetail/createSysDictionaryDetail',
    method: 'post',
    data
  })
}

// @Tags SysDictionaryDetail
// @Summary  shān chúSysDictionaryDetail
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionaryDetail true " shān chúSysDictionaryDetail"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /sysDictionaryDetail/deleteSysDictionaryDetail [delete]
export const deleteSysDictionaryDetail = (data) => {
  return service({
    url: '/sysDictionaryDetail/deleteSysDictionaryDetail',
    method: 'delete',
    data
  })
}

// @Tags SysDictionaryDetail
// @Summary  gèng xīnSysDictionaryDetail
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionaryDetail true " gèng xīnSysDictionaryDetail"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" gèng xīn chéng gōng"}"
// @Router /sysDictionaryDetail/updateSysDictionaryDetail [put]
export const updateSysDictionaryDetail = (data) => {
  return service({
    url: '/sysDictionaryDetail/updateSysDictionaryDetail',
    method: 'put',
    data
  })
}

// @Tags SysDictionaryDetail
// @Summary  yòngid chá xúnSysDictionaryDetail
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionaryDetail true " yòngid chá xúnSysDictionaryDetail"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" chá xún chéng gōng"}"
// @Router /sysDictionaryDetail/findSysDictionaryDetail [get]
export const findSysDictionaryDetail = (params) => {
  return service({
    url: '/sysDictionaryDetail/findSysDictionaryDetail',
    method: 'get',
    params
  })
}

// @Tags SysDictionaryDetail
// @Summary  fēn yè huò qǔSysDictionaryDetail liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true " fēn yè huò qǔSysDictionaryDetail liè biǎo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /sysDictionaryDetail/getSysDictionaryDetailList [get]
export const getSysDictionaryDetailList = (params) => {
  return service({
    url: '/sysDictionaryDetail/getSysDictionaryDetailList',
    method: 'get',
    params
  })
}
