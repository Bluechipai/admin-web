<template>
  <div>
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo">
        <el-form-item label=" zhǎn shì zhí">
          <el-input v-model="searchInfo.label" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item label=" zì diǎn zhí">
          <el-input-number v-model="searchInfo.value" placeholder=" sōu suǒ tiáo jiàn" min="-2147483648" max="2147483647"/>
        </el-form-item>
        <el-form-item label=" qǐ yòng zhuàng tài" prop="status">
          <el-select v-model="searchInfo.status" placeholder=" qǐng xuǎn zé">
            <el-option key="true" label=" shì" value="true" />
            <el-option key="false" label=" fǒu" value="false" />
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
        <el-button type="primary" icon="plus" @click="openDialog"> xīn zēng zì diǎn xiàng</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label=" rì qī" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>

        <el-table-column align="left" label=" zhǎn shì zhí" prop="label" width="120" />

        <el-table-column align="left" label=" zì diǎn zhí" prop="value" width="120" />

        <el-table-column align="left" label=" qǐ yòng zhuàng tài" prop="status" width="120">
          <template #default="scope">{{ formatBoolean(scope.row.status) }}</template>
        </el-table-column>

        <el-table-column align="left" label=" pái xù biāo jì" prop="sort" width="120" />

        <el-table-column align="left" label=" cāo zuò">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="updateSysDictionaryDetailFunc(scope.row)"> biàn gèng</el-button>
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p> què dìng yào shān chú ma？</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false"> qǔ xiāo</el-button>
                <el-button type="primary" @click="deleteSysDictionaryDetailFunc(scope.row)"> què dìng</el-button>
              </div>
              <template #reference>
                <el-button type="primary" link icon="delete" @click="scope.row.visible = true"> shān chú</el-button>
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

    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" :title="type==='create'?' tiān jiā zì diǎn xiàng':' xiū gǎi zì diǎn xiàng'">
      <el-form ref="dialogForm" :model="formData" :rules="rules" label-width="110px">
        <el-form-item label=" zhǎn shì zhí" prop="label">
          <el-input
            v-model="formData.label"
            placeholder=" qǐng shū rù zhǎn shì zhí"
            clearable
            :style="{width: '100%'}"
          />
        </el-form-item>
        <el-form-item label=" zì diǎn zhí" prop="value">
          <el-input-number
            v-model.number="formData.value"
            step-strictly
            :step="1"
            placeholder=" qǐng shū rù zì diǎn zhí"
            clearable
            :style="{width: '100%'}"
            min="-2147483648"
            max="2147483647"
          />
        </el-form-item>
        <el-form-item label=" qǐ yòng zhuàng tài" prop="status" required>
          <el-switch v-model="formData.status" active-text=" kāi qǐ" inactive-text=" tíng yòng" />
        </el-form-item>
        <el-form-item label=" pái xù biāo jì" prop="sort">
          <el-input-number v-model.number="formData.sort" placeholder=" pái xù biāo jì" />
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
  name: 'SysDictionaryDetail'
}
</script>

<script setup>
import {
  createSysDictionaryDetail,
  deleteSysDictionaryDetail,
  updateSysDictionaryDetail,
  findSysDictionaryDetail,
  getSysDictionaryDetailList
} from '@/api/sysDictionaryDetail' //  cǐ chù qǐng zì xíng tì huàn dì zhǐ
import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ElMessage } from 'element-plus'
import { formatBoolean, formatDate } from '@/utils/format'
const route = useRoute()

onBeforeRouteUpdate((to) => {
  if (to.name === 'dictionaryDetail') {
    searchInfo.value.sysDictionaryID = to.params.id
    getTableData()
  }
})

const formData = ref({
  label: null,
  value: null,
  status: true,
  sort: null
})
const rules = ref({
  label: [
    {
      required: true,
      message: ' qǐng shū rù zhǎn shì zhí',
      trigger: 'blur'
    }
  ],
  value: [
    {
      required: true,
      message: ' qǐng shū rù zì diǎn zhí',
      trigger: 'blur'
    }
  ],
  sort: [
    {
      required: true,
      message: ' pái xù biāo jì',
      trigger: 'blur'
    }
  ]
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({ sysDictionaryID: Number(route.params.id) })
const onReset = () => {
  searchInfo.value = { sysDictionaryID: Number(route.params.id) }
  getTableData()
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
  const table = await getSysDictionaryDetailList({
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

const type = ref('')
const dialogFormVisible = ref(false)
const updateSysDictionaryDetailFunc = async(row) => {
  const res = await findSysDictionaryDetail({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reSysDictionaryDetail
    dialogFormVisible.value = true
  }
}

const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    label: null,
    value: null,
    status: true,
    sort: null,
    sysDictionaryID: ''
  }
}
const deleteSysDictionaryDetailFunc = async(row) => {
  row.visible = false
  const res = await deleteSysDictionaryDetail({ ID: row.ID })
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

const dialogForm = ref(null)
const enterDialog = async() => {
  formData.value.sysDictionaryID = Number(route.params.id)
  dialogForm.value.validate(async valid => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysDictionaryDetail(formData.value)
        break
      case 'update':
        res = await updateSysDictionaryDetail(formData.value)
        break
      default:
        res = await createSysDictionaryDetail(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: ' chuàng jiàn/ gèng gǎi chéng gōng'
      })
      closeDialog()
      getTableData()
    }
  })
}
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

</script>

<style>
</style>
