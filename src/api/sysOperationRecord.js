import service from '@/utils/request'
// @Tags SysOperationRecord
// @Summary  shān chúSysOperationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysOperationRecord true " shān chúSysOperationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /sysOperationRecord/deleteSysOperationRecord [delete]
export const deleteSysOperationRecord = (data) => {
  return service({
    url: '/sysOperationRecord/deleteSysOperationRecord',
    method: 'delete',
    data
  })
}

// @Tags SysOperationRecord
// @Summary  shān chúSysOperationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true " shān chúSysOperationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" shān chú chéng gōng"}"
// @Router /sysOperationRecord/deleteSysOperationRecord [delete]
export const deleteSysOperationRecordByIds = (data) => {
  return service({
    url: '/sysOperationRecord/deleteSysOperationRecordByIds',
    method: 'delete',
    data
  })
}

// @Tags SysOperationRecord
// @Summary  fēn yè huò qǔSysOperationRecord liè biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true " fēn yè huò qǔSysOperationRecord liè biǎo"
// @Success 200 {string} string "{"success":true,"data":{},"msg":" huò qǔ chéng gōng"}"
// @Router /sysOperationRecord/getSysOperationRecordList [get]
export const getSysOperationRecordList = (params) => {
  return service({
    url: '/sysOperationRecord/getSysOperationRecordList',
    method: 'get',
    params
  })
}
