import service from '@/utils/request'

// @Tags api
// @Summary  fēn yè huò qǔ jiǎo sè liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true " fēn yè huò qǔ yòng hù liè biǎo"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /api/getApiList [post]
// {
//  page     int
//	pageSize int
// }
export const getApiList = (data) => {
  return service({
    url: '/api/getApiList',
    method: 'post',
    data
  })
}

// @Tags Api
// @Summary  chuàng jiàn jī chǔapi
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true " chuàng jiànapi"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /api/createApi [post]
export const createApi = (data) => {
  return service({
    url: '/api/createApi',
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
// @Router /menu/getApiById [post]
export const getApiById = (data) => {
  return service({
    url: '/api/getApiById',
    method: 'post',
    data
  })
}

// @Tags Api
// @Summary  gèng xīnapi
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true " gèng xīnapi"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" gèng xīn chéng gōng"}"
// @Router /api/updateApi [post]
export const updateApi = (data) => {
  return service({
    url: '/api/updateApi',
    method: 'post',
    data
  })
}

// @Tags Api
// @Summary  gèng xīnapi
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true " gèng xīnapi"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" gèng xīn chéng gōng"}"
// @Router /api/setAuthApi [post]
export const setAuthApi = (data) => {
  return service({
    url: '/api/setAuthApi',
    method: 'post',
    data
  })
}

// @Tags Api
// @Summary  huò qǔ suǒ yǒu deApi  bù fēn yè
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /api/getAllApis [post]
export const getAllApis = (data) => {
  return service({
    url: '/api/getAllApis',
    method: 'post',
    data
  })
}

// @Tags Api
// @Summary  shān chú zhǐ dìngapi
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.Api true " shān chúapi"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /api/deleteApi [post]
export const deleteApi = (data) => {
  return service({
    url: '/api/deleteApi',
    method: 'post',
    data
  })
}

// @Tags SysApi
// @Summary  shān chú xuǎn zhōngApi
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "ID"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /api/deleteApisByIds [delete]
export const deleteApisByIds = (data) => {
  return service({
    url: '/api/deleteApisByIds',
    method: 'delete',
    data
  })
}

// FreshCasbin
// @Tags      SysApi
// @Summary    shuā xīncasbin huǎn cún
// @accept    application/json
// @Produce   application/json
// @Success   200   {object}  response.Response{msg=string}  " shuā xīn chéng gōng"
// @Router    /api/freshCasbin [get]
export const freshCasbin = () => {
  return service({
    url: '/api/freshCasbin',
    method: 'get'
  })
}
