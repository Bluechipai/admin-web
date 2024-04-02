import service from '@/utils/request'
// @Tags System
// @Summary  fā sòng cè shì yóu jiàn
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fā sòng chéng gōng"}"
// @Router /email/emailTest [post]
export const emailTest = (data) => {
  return service({
    url: '/email/emailTest',
    method: 'post',
    data
  })
}

// @Tags System
// @Summary  fā sòng yóu jiàn
// @Security ApiKeyAuth
// @Produce  application/json
// @Param data body email_response.Email true " fā sòng yóu jiàn bì xū de cān shù"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" fā sòng chéng gōng"}"
// @Router /email/sendEmail [post]
export const sendEmail = (data) => {
  return service({
    url: '/email/sendEmail',
    method: 'post',
    data
  })
}

