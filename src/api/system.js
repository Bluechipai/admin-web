import service from '@/utils/request'
// @Tags systrm
// @Summary  huò qǔ pèi zhì wén jiàn nèi róng
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fǎn huí chéng gōng"}"
// @Router /system/getSystemConfig [post]
export const getSystemConfig = () => {
  return service({
    url: '/system/getSystemConfig',
    method: 'post'
  })
}

// @Tags system
// @Summary  shè zhì pèi zhì wén jiàn nèi róng
// @Security ApiKeyAuth
// @Produce  application/json
// @Param data body sysModel.System true
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fǎn huí chéng gōng"}"
// @Router /system/setSystemConfig [post]
export const setSystemConfig = (data) => {
  return service({
    url: '/system/setSystemConfig',
    method: 'post',
    data
  })
}

// @Tags system
// @Summary  huò qǔ fú wù qì yùn xíng zhuàng tài
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fǎn huí chéng gōng"}"
// @Router /system/getServerInfo [post]
export const getSystemState = () => {
  return service({
    url: '/system/getServerInfo',
    method: 'post',
    donNotShowLoading: true
  })
}
