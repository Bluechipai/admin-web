import service from '@/utils/request'
// @Router /authority/getAuthorityList [post]
export const getAuthorityList = (data) => {
  return service({
    url: '/authority/getAuthorityList',
    method: 'post',
    data
  })
}

// @Summary  shān chú jiǎo sè
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body {authorityId uint} true " shān chú jiǎo sè"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /authority/deleteAuthority [post]
export const deleteAuthority = (data) => {
  return service({
    url: '/authority/deleteAuthority',
    method: 'post',
    data
  })
}

// @Summary  chuàng jiàn jiǎo sè
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true " chuàng jiàn jiǎo sè"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /authority/createAuthority [post]
export const createAuthority = (data) => {
  return service({
    url: '/authority/createAuthority',
    method: 'post',
    data
  })
}

// @Tags authority
// @Summary  kǎo bèi jiǎo sè
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true " kǎo bèi jiǎo sè"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" kǎo bèi chéng gōng"}"
// @Router /authority/copyAuthority [post]
export const copyAuthority = (data) => {
  return service({
    url: '/authority/copyAuthority',
    method: 'post',
    data
  })
}

// @Summary  shè zhì jiǎo sè zī yuán quán xiàn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body sysModel.SysAuthority true " shè zhì jiǎo sè zī yuán quán xiàn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shè zhì chéng gōng"}"
// @Router /authority/setDataAuthority [post]
export const setDataAuthority = (data) => {
  return service({
    url: '/authority/setDataAuthority',
    method: 'post',
    data
  })
}

// @Summary  xiū gǎi jiǎo sè
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysAuthority true " xiū gǎi jiǎo sè"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shè zhì chéng gōng"}"
// @Router /authority/setDataAuthority [post]
export const updateAuthority = (data) => {
  return service({
    url: '/authority/updateAuthority',
    method: 'put',
    data
  })
}
