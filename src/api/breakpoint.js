import service from '@/utils/request'
// @Summary  shè zhì jiǎo sè zī yuán quán xiàn
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body sysModel.SysAuthority true " shè zhì jiǎo sè zī yuán quán xiàn"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shè zhì chéng gōng"}"
// @Router /authority/setDataAuthority [post]

export const findFile = (params) => {
  return service({
    url: '/fileUploadAndDownload/findFile',
    method: 'get',
    params
  })
}

export const breakpointContinue = (data) => {
  return service({
    url: '/fileUploadAndDownload/breakpointContinue',
    method: 'post',
    donNotShowLoading: true,
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const breakpointContinueFinish = (params) => {
  return service({
    url: '/fileUploadAndDownload/breakpointContinueFinish',
    method: 'post',
    params
  })
}

export const removeChunk = (data, params) => {
  return service({
    url: '/fileUploadAndDownload/removeChunk',
    method: 'post',
    data,
    params
  })
}
