import service from '@/utils/request'
// @Tags email
// @Summary  fā sòng cè shì yóu jiàn
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fǎn huí chéng gōng"}"
// @Router /email/emailTest [post]
export const emailTest = (data) => {
  return service({
    url: '/email/emailTest',
    method: 'post',
    data
  })
}
