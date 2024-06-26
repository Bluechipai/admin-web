import service from '@/utils/request'

export const preview = (data) => {
  return service({
    url: '/autoCode/preview',
    method: 'post',
    data
  })
}

export const createTemp = (data) => {
  return service({
    url: '/autoCode/createTemp',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

// @Tags SysApi
// @Summary  huò qǔ dāng qián suǒ yǒu shù jù kù
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" chuàng jiàn chéng gōng"}"
// @Router /autoCode/getDatabase [get]
export const getDB = (params) => {
  return service({
    url: '/autoCode/getDB',
    method: 'get',
    params
  })
}

// @Tags SysApi
// @Summary  huò qǔ dāng qián shù jù kù suǒ yǒu biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" chuàng jiàn chéng gōng"}"
// @Router /autoCode/getTables [get]
export const getTable = (params) => {
  return service({
    url: '/autoCode/getTables',
    method: 'get',
    params
  })
}

// @Tags SysApi
// @Summary  huò qǔ dāng qián shù jù kù suǒ yǒu biǎo
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":" chuàng jiàn chéng gōng"}"
// @Router /autoCode/getColumn [get]
export const getColumn = (params) => {
  return service({
    url: '/autoCode/getColumn',
    method: 'get',
    params
  })
}

export const getSysHistory = (data) => {
  return service({
    url: '/autoCode/getSysHistory',
    method: 'post',
    data
  })
}

export const rollback = (data) => {
  return service({
    url: '/autoCode/rollback',
    method: 'post',
    data
  })
}

export const getMeta = (data) => {
  return service({
    url: '/autoCode/getMeta',
    method: 'post',
    data
  })
}

export const delSysHistory = (data) => {
  return service({
    url: '/autoCode/delSysHistory',
    method: 'post',
    data
  })
}

export const createPackageApi = (data) => {
  return service({
    url: '/autoCode/createPackage',
    method: 'post',
    data
  })
}

export const getPackageApi = () => {
  return service({
    url: '/autoCode/getPackage',
    method: 'post'
  })
}

export const deletePackageApi = (data) => {
  return service({
    url: '/autoCode/delPackage',
    method: 'post',
    data
  })
}

export const createPlugApi = (data) => {
  return service({
    url: '/autoCode/createPlug',
    method: 'post',
    data
  })
}

export const installPlug = (data) => {
  return service({
    url: '/autoCode/installPlug',
    method: 'post',
    data
  })
}

export const pubPlug = (params) => {
  return service({
    url: '/autoCode/pubPlug',
    method: 'post',
    params
  })
}
