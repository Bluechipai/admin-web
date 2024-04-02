<template>
  <div>
    <warning-bar
      title=" huò qǔ zì diǎn qiě huǎn cún fāng fǎ yǐ zài qián duānutils/dictionary  yǐ jīng fēng zhuāng wán chéng  bù bì zì jǐ shū xiě  shǐ yòng fāng fǎ chá kàn wén jiàn nèi zhù shì"
    />
    <div class="gva-search-box">
      <el-form :inline="true" :model="searchInfo">
        <el-form-item label=" zì diǎn míng（ zhōng）">
          <el-input v-model="searchInfo.name" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item label=" zì diǎn míng（ yīng）">
          <el-input v-model="searchInfo.type" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item label=" zhuàng tài" prop="status">
          <el-select v-model="searchInfo.status" clear placeholder=" qǐng xuǎn zé">
            <el-option key="true" label=" shì" value="true" />
            <el-option key="false" label=" fǒu" value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label=" miáo shù">
          <el-input v-model="searchInfo.desc" placeholder=" sōu suǒ tiáo jiàn" />
        </el-form-item>
        <el-form-item>
          <el-button

            type="primary"
            icon="search"
            @click="onSubmit"
          > chá xún</el-button>
          <el-button

            icon="refresh"
            @click="onReset"
          > zhòng zhì</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button

          type="primary"
          icon="plus"
          @click="openDialog"
        > xīn zēng</el-button>
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
          <template #default="scope">{{
            formatDate(scope.row.CreatedAt)
          }}</template>
        </el-table-column>

        <el-table-column
          align="left"
          label=" zì diǎn míng（ zhōng）"
          prop="name"
          width="160"
        />

        <el-table-column
          align="left"
          label=" zì diǎn míng（ yīng）"
          prop="type"
          width="120"
        />

        <el-table-column align="left" label=" zhuàng tài" prop="status" width="120">
          <template #default="scope">{{
            formatBoolean(scope.row.status)
          }}</template>
        </el-table-column>

        <el-table-column align="left" label=" miáo shù" prop="desc" width="280" />

        <el-table-column align="left" label=" cāo zuò">
          <template #default="scope">
            <el-button

              icon="document"
              type="primary"
              link
              @click="toDetail(scope.row)"
            > xiáng qíng</el-button>
            <el-button

              icon="edit"
              type="primary"
              link
              @click="updateSysDictionaryFunc(scope.row)"
            > biàn gèng</el-button>
            <el-popover
              v-model="scope.row.visible"
              placement="top"
              width="160"
            >
              <p> què dìng yào shān chú ma？</p>
              <div style="text-align: right; margin-top: 8px">
                <el-button

                  type="primary"
                  link
                  @click="scope.row.visible = false"
                > qǔ xiāo</el-button>
                <el-button
                  type="primary"

                  @click="deleteSysDictionaryFunc(scope.row)"
                > què dìng</el-button>
              </div>
              <template #reference>
                <el-button
                  type="primary"
                  link
                  icon="delete"

                  style="margin-left: 10px"
                  @click="scope.row.visible = true"
                > shān chú</el-button>
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
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      :title="type==='create'?' tiān jiā zì diǎn':' xiū gǎi zì diǎn'"
    >
      <el-form
        ref="dialogForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item label=" zì diǎn míng（ zhōng）" prop="name">
          <el-input
            v-model="formData.name"
            placeholder=" qǐng shū rù zì diǎn míng（ zhōng）"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label=" zì diǎn míng（ yīng）" prop="type">
          <el-input
            v-model="formData.type"
            placeholder=" qǐng shū rù zì diǎn míng（ yīng）"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label=" zhuàng tài" prop="status" required>
          <el-switch
            v-model="formData.status"
            active-text=" kāi qǐ"
            inactive-text=" tíng yòng"
          />
        </el-form-item>
        <el-form-item label=" miáo shù" prop="desc">
          <el-input
            v-model="formData.desc"
            placeholder=" qǐng shū rù miáo shù"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button

            type="primary"
            @click="enterDialog"
          > què  dìng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SysDictionary',
}
</script>

<script setup>
import {
  createSysDictionary,
  deleteSysDictionary,
  updateSysDictionary,
  findSysDictionary,
  getSysDictionaryList,
} from '@/api/sysDictionary' //  cǐ chù qǐng zì xíng tì huàn dì zhǐ
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { formatBoolean, formatDate } from '@/utils/format'

const router = useRouter()

const formData = ref({
  name: null,
  type: null,
  status: true,
  desc: null,
})
const rules = ref({
  name: [
    {
      required: true,
      message: ' qǐng shū rù zì diǎn míng（ zhōng）',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: ' qǐng shū rù zì diǎn míng（ yīng）',
      trigger: 'blur',
    },
  ],
  desc: [
    {
      required: true,
      message: ' qǐng shū rù miáo shù',
      trigger: 'blur',
    },
  ],
})

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
  const table = await getSysDictionaryList({
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

const toDetail = (row) => {
  router.push({
    name: 'dictionaryDetail',
    params: {
      id: row.ID,
    },
  })
}

const dialogFormVisible = ref(false)
const type = ref('')
const updateSysDictionaryFunc = async(row) => {
  const res = await findSysDictionary({ ID: row.ID, status: row.status })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysDictionary
    dialogFormVisible.value = true
  }
}
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    name: null,
    type: null,
    status: true,
    desc: null,
  }
}
const deleteSysDictionaryFunc = async(row) => {
  row.visible = false
  const res = await deleteSysDictionary({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' shān chú chéng gōng',
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

const dialogForm = ref(null)
const enterDialog = async() => {
  dialogForm.value.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysDictionary(formData.value)
        break
      case 'update':
        res = await updateSysDictionary(formData.value)
        break
      default:
        res = await createSysDictionary(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage.success(' cāo zuò chéng gōng')
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

<style></style>
