import service from '@/utils/request'
// @Tags FileUploadAndDownload
// @Summary  fēn yè wén jiàn liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true " fēn yè huò qǔ wén jiàn hù liè biǎo"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /fileUploadAndDownload/getFileList [post]
export const getFileList = (data) => {
  return service({
    url: '/fileUploadAndDownload/getFileList',
    method: 'post',
    data
  })
}

// @Tags FileUploadAndDownload
// @Summary  shān chú wén jiàn
// @Security ApiKeyAuth
// @Produce  application/json
// @Param data body dbModel.FileUploadAndDownload true " chuán rù wén jiàn lǐ miànid jí kě"
// @Success 200 {string} json "{"success":true,"data":{},"msg":" fǎn huí chéng gōng"}"
// @Router /fileUploadAndDownload/deleteFile [post]
export const deleteFile = (data) => {
  return service({
    url: '/fileUploadAndDownload/deleteFile',
    method: 'post',
    data
  })
}

/**
 *  biān jí wén jiàn míng huò zhě bèi zhù
 * @param data
 * @returns {*}
 */
export const editFileName = (data) => {
  return service({
    url: '/fileUploadAndDownload/editFileName',
    method: 'post',
    data
  })
}
