<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo">
        <el-form-item label=" qǐng qiú fāng fǎ">
          <el-input v-model="searchInfo.method" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item label=" qǐng qiú lù jìng">
          <el-input v-model="searchInfo.path" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item label=" jié guǒ zhuàng tài mǎ">
          <el-input v-model="searchInfo.status" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit"> chá xún</el-button>
          <el-button icon="refresh" @click="onReset"> zhòng zhì</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">

        <el-popover v-model="deleteVisible" placement="top" width="160">
          <p> què dìng yào shān chú ma？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="deleteVisible = false"> qǔ xiāo</el-button>
            <el-button type="primary" @click="onDelete"> què dìng</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" style="margin-left: 10px;" :disabled="!multipleSelection.length" @click="deleteVisible = true"> shān chú</el-button>
          </template>
        </el-popover>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="left" type="selection" width="55" />
        <el-table-column align="left" label=" cāo zuò rén" width="140">
          <template #default="scope">
            <div>{{ scope.row.user.userName }}({{ scope.row.user.nickName }})</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" rì qī" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label=" zhuàng tài mǎ" prop="status" width="120">
          <template #default="scope">
            <div>
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" qǐng qiúIP" prop="ip" width="120" />
        <el-table-column align="left" label=" qǐng qiú fāng fǎ" prop="method" width="120" />
        <el-table-column align="left" label=" qǐng qiú lù jìng" prop="path" width="240" />
        <el-table-column align="left" label=" qǐng qiú" prop="path" width="80">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.body" placement="left-start" trigger="click">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.body) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer;"><warning /></el-icon>
                </template>
              </el-popover>

              <span v-else> wú</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" xiǎng yīng" prop="path" width="80">
          <template #default="scope">
            <div>
              <el-popover v-if="scope.row.resp" placement="left-start" trigger="click">
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.resp) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer;"><warning /></el-icon>
                </template>
              </el-popover>
              <span v-else> wú</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" cāo zuò">
          <template #default="scope">
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p> què dìng yào shān chú ma？</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false"> qǔ xiāo</el-button>
                <el-button type="primary" @click="deleteSysOperationRecordFunc(scope.row)"> què dìng</el-button>
              </div>
              <template #reference>
                <el-button icon="delete" type="primary" link @click="scope.row.visible = true"> shān chú</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  deleteSysOperationRecord,
  getSysOperationRecordList,
  deleteSysOperationRecordByIds
} from '@/api/sysOperationRecord' //  cǐ chù qǐng zì xíng tì huàn dì zhǐ
import { formatDate } from '@/utils/format'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const onReset = () => {
  searchInfo.value = {}
}
//  tiáo jiàn sōu suǒ qián duān kàn cǐ fāng fǎ
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  if (searchInfo.value.status === '') {
    searchInfo.value.status = null
  }
  getTableData()
}

//  fēn yè
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

//  chá xún
const getTableData = async() => {
  const table = await getSysOperationRecordList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value,
  })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

const deleteVisible = ref(false)
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const onDelete = async() => {
  const ids = []
  multipleSelection.value &&
        multipleSelection.value.forEach(item => {
          ids.push(item.ID)
        })
  const res = await deleteSysOperationRecordByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' shān chú chéng gōng'
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}
const deleteSysOperationRecordFunc = async(row) => {
  row.visible = false
  const res = await deleteSysOperationRecord({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' shān chú chéng gōng'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}
const fmtBody = (value) => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}

</script>

<script>

export default {
  name: 'SysOperationRecord'
}
</script>

<style lang="scss">
.table-expand {
  padding-left: 60px;
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
.popover-box {
  background: #112435;
  color: #f08047;
  height: 600px;
  width: 420px;
  overflow: auto;
}
.popover-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
