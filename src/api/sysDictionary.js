import service from '@/utils/request'
// @Tags SysDictionary
// @Summary  chuàng jiànSysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true " chuàng jiànSysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /sysDictionary/createSysDictionary [post]
export const createSysDictionary = (data) => {
  return service({
    url: '/sysDictionary/createSysDictionary',
    method: 'post',
    data
  })
}

// @Tags SysDictionary
// @Summary  shān chúSysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true " shān chúSysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /sysDictionary/deleteSysDictionary [delete]
export const deleteSysDictionary = (data) => {
  return service({
    url: '/sysDictionary/deleteSysDictionary',
    method: 'delete',
    data
  })
}

// @Tags SysDictionary
// @Summary  gèng xīnSysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true " gèng xīnSysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" gèng xīn chéng gōng"}"
// @Router /sysDictionary/updateSysDictionary [put]
export const updateSysDictionary = (data) => {
  return service({
    url: '/sysDictionary/updateSysDictionary',
    method: 'put',
    data
  })
}

// @Tags SysDictionary
// @Summary  yòngid chá xúnSysDictionary
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysDictionary true " yòngid chá xúnSysDictionary"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" chá xún chéng gōng"}"
// @Router /sysDictionary/findSysDictionary [get]
export const findSysDictionary = (params) => {
  return service({
    url: '/sysDictionary/findSysDictionary',
    method: 'get',
    params
  })
}

// @Tags SysDictionary
// @Summary  fēn yè huò qǔSysDictionary liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true " fēn yè huò qǔSysDictionary liè biǎo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /sysDictionary/getSysDictionaryList [get]
export const getSysDictionaryList = (params) => {
  return service({
    url: '/sysDictionary/getSysDictionaryList',
    method: 'get',
    params
  })
}
