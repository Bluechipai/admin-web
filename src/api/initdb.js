import service from '@/utils/request'
// @Tags InitDB
// @Summary  chū shǐ huà yòng hù shù jù kù
// @Produce  application/json
// @Param data body request.InitDB true " chū shǐ huà shù jù kù cān shù"
// @Success 200 {string} string "{"code":0,"data":{},"msg":" zì dòng chuàng jiàn shù jù kù chéng gōng"}"
// @Router /init/initdb [post]
export const initDB = (data) => {
  return service({
    url: '/init/initdb',
    method: 'post',
    data
  })
}

// @Tags CheckDB
// @Summary  chū shǐ huà yòng hù shù jù kù
// @Produce  application/json
// @Success 200 {string} string "{"code":0,"data":{},"msg":" tàn cè wán chéng"}"
// @Router /init/checkdb [post]
export const checkDB = () => {
  return service({
    url: '/init/checkdb',
    method: 'post'
  })
}
