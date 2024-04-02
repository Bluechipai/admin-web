<template>
  <div>
    <div class="gva-search-box">
      <el-form ref="searchForm" :inline="true" :model="searchInfo">
        <el-form-item label=" lù jìng">
          <el-input v-model="searchInfo.path" placeholder=" lù jìng" />
        </el-form-item>
        <el-form-item label=" miáo shù">
          <el-input v-model="searchInfo.description" placeholder=" miáo shù" />
        </el-form-item>
        <el-form-item label="API zǔ">
          <el-input v-model="searchInfo.apiGroup" placeholder="api zǔ" />
        </el-form-item>
        <el-form-item label=" qǐng qiú">
          <el-select v-model="searchInfo.method" clearable placeholder=" qǐng xuǎn zé">
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="search" @click="onSubmit"> chá xún</el-button>
          <el-button icon="refresh" @click="onReset"> zhòng zhì</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog('addApi')"> xīn zēng</el-button>
        <el-popover v-model="deleteVisible" placement="top" width="160">
          <p> què dìng yào shān chú ma？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="deleteVisible = false"> qǔ xiāo</el-button>
            <el-button type="primary" @click="onDelete"> què dìng</el-button>
          </div>
          <template #reference>
            <el-button icon="delete" :disabled="!apis.length" style="margin-left: 10px;" @click="deleteVisible = true"> shān chú</el-button>
          </template>
        </el-popover>
        <el-popover v-model="freshVisible" placement="top" width="160">
          <p> què dìng yào shuā xīnCasbin huǎn cún ma？</p>
          <div style="text-align: right; margin-top: 8px;">
            <el-button type="primary" link @click="freshVisible = false"> qǔ xiāo</el-button>
            <el-button type="primary" @click="onFresh"> què dìng</el-button>
          </div>
          <template #reference>
            <el-button icon="Refresh" style="margin-left: 10px;" @click="freshVisible = true"> shuā xīn huǎn cún</el-button>
          </template>
        </el-popover>
      </div>
      <el-table :data="tableData" @sort-change="sortChange" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="left" label="id" min-width="60" prop="ID" sortable="custom" />
        <el-table-column align="left" label="API lù jìng" min-width="150" prop="path" sortable="custom" />
        <el-table-column align="left" label="API fēn zǔ" min-width="150" prop="apiGroup" sortable="custom" />
        <el-table-column align="left" label="API jiǎn jiè" min-width="150" prop="description" sortable="custom" />
        <el-table-column align="left" label=" qǐng qiú" min-width="150" prop="method" sortable="custom">
          <template #default="scope">
            <div>
              {{ scope.row.method }} / {{ methodFilter(scope.row.method) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column align="left" fixed="right" label=" cāo zuò" width="200">
          <template #default="scope">
            <el-button
              icon="edit"

              type="primary"
              link
              @click="editApiFunc(scope.row)"
            > biān jí</el-button>
            <el-button
              icon="delete"

              type="primary"
              link
              @click="deleteApiFunc(scope.row)"
            > shān chú</el-button>
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

    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="dialogTitle">
      <warning-bar title=" xīn zēngAPI， xū yào zài jiǎo sè guǎn lǐ nèi pèi zhì quán xiàn cái kě shǐ yòng" />
      <el-form ref="apiForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label=" lù jìng" prop="path">
          <el-input v-model="form.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" qǐng qiú" prop="method">
          <el-select v-model="form.method" placeholder=" qǐng xuǎn zé" style="width:100%">
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="`${item.label}(${item.value})`"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="api fēn zǔ" prop="apiGroup">
          <el-input v-model="form.apiGroup" autocomplete="off" />
        </el-form-item>
        <el-form-item label="api jiǎn jiè" prop="description">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button type="primary" @click="enterDialog"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Api',
}
</script>

<script setup>
import {
  getApiById,
  getApiList,
  createApi,
  updateApi,
  deleteApi,
  deleteApisByIds,
  freshCasbin
} from '@/api/api'
import { toSQLLine } from '@/utils/stringFun'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const methodFilter = (value) => {
  const target = methodOptions.value.filter(item => item.value === value)[0]
  return target && `${target.label}`
}

const apis = ref([])
const form = ref({
  path: '',
  apiGroup: '',
  method: '',
  description: ''
})
const methodOptions = ref([
  {
    value: 'POST',
    label: ' chuàng jiàn',
    type: 'success'
  },
  {
    value: 'GET',
    label: ' chá kàn',
    type: ''
  },
  {
    value: 'PUT',
    label: ' gèng xīn',
    type: 'warning'
  },
  {
    value: 'DELETE',
    label: ' shān chú',
    type: 'danger'
  }
])

const type = ref('')
const rules = ref({
  path: [{ required: true, message: ' qǐng shū rùapi lù jìng', trigger: 'blur' }],
  apiGroup: [
    { required: true, message: ' qǐng shū rù zǔ míng chēng', trigger: 'blur' }
  ],
  method: [
    { required: true, message: ' qǐng xuǎn zé qǐng qiú fāng shì', trigger: 'blur' }
  ],
  description: [
    { required: true, message: ' qǐng shū rùapi jiè shào', trigger: 'blur' }
  ]
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

const onReset = () => {
  searchInfo.value = {}
}
//  sōu suǒ

const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
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

//  pái xù
const sortChange = ({ prop, order }) => {
  if (prop) {
    if (prop === 'ID') {
      prop = 'id'
    }
    searchInfo.value.orderKey = toSQLLine(prop)
    searchInfo.value.desc = order === 'descending'
  }
  getTableData()
}

//  chá xún
const getTableData = async() => {
  const table = await getApiList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

//  pī liàng cāo zuò
const handleSelectionChange = (val) => {
  apis.value = val
}

const deleteVisible = ref(false)
const onDelete = async() => {
  const ids = apis.value.map(item => item.ID)
  const res = await deleteApisByIds({ ids })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: res.msg
    })
    if (tableData.value.length === ids.length && page.value > 1) {
      page.value--
    }
    deleteVisible.value = false
    getTableData()
  }
}
const freshVisible = ref(false)
const onFresh = async() => {
  const res = await freshCasbin()
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: res.msg
    })
  }
  freshVisible.value = false
}

//  dàn chuāng xiāng guān
const apiForm = ref(null)
const initForm = () => {
  apiForm.value.resetFields()
  form.value = {
    path: '',
    apiGroup: '',
    method: '',
    description: ''
  }
}

const dialogTitle = ref(' xīn zēngApi')
const dialogFormVisible = ref(false)
const openDialog = (key) => {
  switch (key) {
    case 'addApi':
      dialogTitle.value = ' xīn zēngApi'
      break
    case 'edit':
      dialogTitle.value = ' biān jíApi'
      break
    default:
      break
  }
  type.value = key
  dialogFormVisible.value = true
}
const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
}

const editApiFunc = async(row) => {
  const res = await getApiById({ id: row.ID })
  form.value = res.data.api
  openDialog('edit')
}

const enterDialog = async() => {
  apiForm.value.validate(async valid => {
    if (valid) {
      switch (type.value) {
        case 'addApi':
          {
            const res = await createApi(form.value)
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: ' tiān jiā chéng gōng',
                showClose: true
              })
            }
            getTableData()
            closeDialog()
          }

          break
        case 'edit':
          {
            const res = await updateApi(form.value)
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: ' biān jí chéng gōng',
                showClose: true
              })
            }
            getTableData()
            closeDialog()
          }
          break
        default:
          // eslint-disable-next-line no-lone-blocks
          {
            ElMessage({
              type: 'error',
              message: ' wèi zhī cāo zuò',
              showClose: true
            })
          }
          break
      }
    }
  })
}

const deleteApiFunc = async(row) => {
  ElMessageBox.confirm(' cǐ cāo zuò jiāng yǒng jiǔ shān chú suǒ yǒu jiǎo sè xià gāiapi,  shì fǒu jì xù?', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning'
  })
    .then(async() => {
      const res = await deleteApi(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: ' shān chú chéng gōng!'
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
}

</script>

<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.warning {
  color: #dc143c;
}
</style>
