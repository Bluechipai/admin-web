import service from '@/utils/request'
// @Tags authority
// @Summary  gèng gǎi jiǎo sèapi quán xiàn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true " gèng gǎi jiǎo sèapi quán xiàn"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /casbin/UpdateCasbin [post]
export const UpdateCasbin = (data) => {
  return service({
    url: '/casbin/updateCasbin',
    method: 'post',
    data
  })
}

// @Tags casbin
// @Summary  huò qǔ quán xiàn liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true " huò qǔ quán xiàn liè biǎo"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /casbin/getPolicyPathByAuthorityId [post]
export const getPolicyPathByAuthorityId = (data) => {
  return service({
    url: '/casbin/getPolicyPathByAuthorityId',
    method: 'post',
    data
  })
}
