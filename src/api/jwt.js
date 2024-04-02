import service from '@/utils/request'
// @Tags jwt
// @Summary jwt jiā rù hēi míng dān
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" lā hēi chéng gōng"}"
// @Router /jwt/jsonInBlacklist [post]
export const jsonInBlacklist = () => {
  return service({
    url: '/jwt/jsonInBlacklist',
    method: 'post'
  })
}
