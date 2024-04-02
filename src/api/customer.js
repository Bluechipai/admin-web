import service from '@/utils/request'
// @Tags SysApi
// @Summary  shān chú kè hù
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.ExaCustomer true " shān chú kè hù"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /customer/customer [post]
export const createExaCustomer = (data) => {
  return service({
    url: '/customer/customer',
    method: 'post',
    data
  })
}

// @Tags SysApi
// @Summary  gèng xīn kè hù xìn xī
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.ExaCustomer true " gèng xīn kè hù xìn xī"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /customer/customer [put]
export const updateExaCustomer = (data) => {
  return service({
    url: '/customer/customer',
    method: 'put',
    data
  })
}

// @Tags SysApi
// @Summary  chuàng jiàn kè hù
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.ExaCustomer true " chuàng jiàn kè hù"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /customer/customer [delete]
export const deleteExaCustomer = (data) => {
  return service({
    url: '/customer/customer',
    method: 'delete',
    data
  })
}

// @Tags SysApi
// @Summary  huò qǔ dān yī kè hù xìn xī
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.ExaCustomer true " huò qǔ dān yī kè hù xìn xī"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /customer/customer [get]
export const getExaCustomer = (params) => {
  return service({
    url: '/customer/customer',
    method: 'get',
    params
  })
}

// @Tags SysApi
// @Summary  huò qǔ quán xiàn kè hù liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true " huò qǔ quán xiàn kè hù liè biǎo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /customer/customerList [get]
export const getExaCustomerList = (params) => {
  return service({
    url: '/customer/customerList',
    method: 'get',
    params
  })
}
