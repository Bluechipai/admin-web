<template>
  <div class="authority">
    <warning-bar title=" zhù： yòu shàng jiǎo tóu xiàng xià lā kě qiè huàn jiǎo sè" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="addAuthority(0)"> xīn zēng jiǎo sè</el-button>
      </div>
      <el-table
        :data="tableData"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        row-key="authorityId"
        style="width: 100%"
      >
        <el-table-column label=" jiǎo sèID" min-width="180" prop="authorityId" />
        <el-table-column align="left" label=" jiǎo sè míng chēng" min-width="180" prop="authorityName" />
        <el-table-column align="left" label=" cāo zuò" width="460">
          <template #default="scope">
            <el-button
              icon="setting"

              type="primary"
              link
              @click="opdendrawer(scope.row)"
            > shè zhì quán xiàn</el-button>
            <el-button
              icon="plus"

              type="primary"
              link
              @click="addAuthority(scope.row.authorityId)"
            > xīn zēng zi jiǎo sè</el-button>
            <el-button
              icon="copy-document"

              type="primary"
              link
              @click="copyAuthorityFunc(scope.row)"
            > kǎo bèi</el-button>
            <el-button
              icon="edit"

              type="primary"
              link
              @click="editAuthority(scope.row)"
            > biān jí</el-button>
            <el-button
              icon="delete"

              type="primary"
              link
              @click="deleteAuth(scope.row)"
            > shān chú</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--  xīn zēng jiǎo sè dàn chuāng -->
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
      <el-form ref="authorityForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label=" fù jí jiǎo sè" prop="parentId">
          <el-cascader
            v-model="form.parentId"
            style="width:100%"
            :disabled="dialogType==='add'"
            :options="AuthorityOption"
            :props="{ checkStrictly: true,label:'authorityName',value:'authorityId',disabled:'disabled',emitPath:false}"
            :show-all-levels="false"
            filterable
          />
        </el-form-item>
        <el-form-item label=" jiǎo sèID" prop="authorityId">
          <el-input v-model="form.authorityId" :disabled="dialogType==='edit'" autocomplete="off" maxlength="15" />
        </el-form-item>
        <el-form-item label=" jiǎo sè xìng míng" prop="authorityName">
          <el-input v-model="form.authorityName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button type="primary" @click="enterDialog"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>

    <el-drawer v-if="drawer" v-model="drawer" custom-class="auth-drawer" :with-header="false" size="40%" title=" jiǎo sè pèi zhì">
      <el-tabs :before-leave="autoEnter" type="border-card">
        <el-tab-pane label=" jiǎo sè cài dān">
          <Menus ref="menus" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane>
        <el-tab-pane label=" jiǎo sèapi">
          <Apis ref="apis" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane>
        <el-tab-pane label=" zī yuán quán xiàn">
          <Datas ref="datas" :authority="tableData" :row="activeRow" @changeRow="changeRow" />
        </el-tab-pane>
      </el-tabs>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  getAuthorityList,
  deleteAuthority,
  createAuthority,
  updateAuthority,
  copyAuthority
} from '@/api/authority'

import Menus from '@/view/superAdmin/authority/components/menus.vue'
import Apis from '@/view/superAdmin/authority/components/apis.vue'
import Datas from '@/view/superAdmin/authority/components/datas.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const mustUint = (rule, value, callback) => {
  if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
    return callback(new Error(' qǐng shū rù zhèng zhěng shù'))
  }
  return callback()
}

const AuthorityOption = ref([
  {
    authorityId: 0,
    authorityName: ' gēn jiǎo sè'
  }
])
const drawer = ref(false)
const dialogType = ref('add')
const activeRow = ref({})

const dialogTitle = ref(' xīn zēng jiǎo sè')
const dialogFormVisible = ref(false)
const apiDialogFlag = ref(false)
const copyForm = ref({})

const form = ref({
  authorityId: 0,
  authorityName: '',
  parentId: 0
})
const rules = ref({
  authorityId: [
    { required: true, message: ' qǐng shū rù jiǎo sèID', trigger: 'blur' },
    { validator: mustUint, trigger: 'blur', message: ' bì xū wèi zhèng zhěng shù' }
  ],
  authorityName: [
    { required: true, message: ' qǐng shū rù jiǎo sè míng', trigger: 'blur' }
  ],
  parentId: [
    { required: true, message: ' qǐng xuǎn zé fù jiǎo sè', trigger: 'blur' },
  ]
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(999)
const tableData = ref([])
const searchInfo = ref({})

//  chá xún
const getTableData = async() => {
  const table = await getAuthorityList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

const changeRow = (key, value) => {
  activeRow.value[key] = value
}
const menus = ref(null)
const apis = ref(null)
const datas = ref(null)
const autoEnter = (activeName, oldActiveName) => {
  const paneArr = [menus, apis, datas]
  if (oldActiveName) {
    if (paneArr[oldActiveName].value.needConfirm) {
      paneArr[oldActiveName].value.enterAndNext()
      paneArr[oldActiveName].value.needConfirm = false
    }
  }
}
//  kǎo bèi jiǎo sè
const copyAuthorityFunc = (row) => {
  setOptions()
  dialogTitle.value = ' kǎo bèi jiǎo sè'
  dialogType.value = 'copy'
  for (const k in form.value) {
    form.value[k] = row[k]
  }
  copyForm.value = row
  dialogFormVisible.value = true
}
const opdendrawer = (row) => {
  drawer.value = true
  activeRow.value = row
}
//  shān chú jiǎo sè
const deleteAuth = (row) => {
  ElMessageBox.confirm(' cǐ cāo zuò jiāng yǒng jiǔ shān chú gāi jiǎo sè,  shì fǒu jì xù?', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning'
  })
    .then(async() => {
      const res = await deleteAuthority({ authorityId: row.authorityId })
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
    .catch(() => {
      ElMessage({
        type: 'info',
        message: ' yǐ qǔ xiāo shān chú'
      })
    })
}
//  chū shǐ huà biǎo dān
const authorityForm = ref(null)
const initForm = () => {
  if (authorityForm.value) {
    authorityForm.value.resetFields()
  }
  form.value = {
    authorityId: 0,
    authorityName: '',
    parentId: 0
  }
}
//  guān bì chuāng kǒu
const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
  apiDialogFlag.value = false
}
//  què dìng dàn chuāng

const enterDialog = () => {
  authorityForm.value.validate(async valid => {
    if (valid) {
      form.value.authorityId = Number(form.value.authorityId)
      switch (dialogType.value) {
        case 'add':
          {
            const res = await createAuthority(form.value)
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: ' tiān jiā chéng gōng!'
              })
              getTableData()
              closeDialog()
            }
          }
          break
        case 'edit':
          {
            const res = await updateAuthority(form.value)
            if (res.code === 0) {
              ElMessage({
                type: 'success',
                message: ' tiān jiā chéng gōng!'
              })
              getTableData()
              closeDialog()
            }
          }
          break
        case 'copy': {
          const data = {
            authority: {
              authorityId: 0,
              authorityName: '',
              datauthorityId: [],
              parentId: 0
            },
            oldAuthorityId: 0
          }
          data.authority.authorityId = form.value.authorityId
          data.authority.authorityName = form.value.authorityName
          data.authority.parentId = form.value.parentId
          data.authority.dataAuthorityId = copyForm.value.dataAuthorityId
          data.oldAuthorityId = copyForm.value.authorityId
          const res = await copyAuthority(data)
          if (res.code === 0) {
            ElMessage({
              type: 'success',
              message: ' fù zhì chéng gōng！'
            })
            getTableData()
          }
        }
      }

      initForm()
      dialogFormVisible.value = false
    }
  })
}
const setOptions = () => {
  AuthorityOption.value = [
    {
      authorityId: 0,
      authorityName: ' gēn jiǎo sè'
    }
  ]
  setAuthorityOptions(tableData.value, AuthorityOption.value, false)
}
const setAuthorityOptions = (AuthorityData, optionsData, disabled) => {
  form.value.authorityId = String(form.value.authorityId)
  AuthorityData &&
        AuthorityData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              disabled: disabled || item.authorityId === form.value.authorityId,
              children: []
            }
            setAuthorityOptions(
              item.children,
              option.children,
              disabled || item.authorityId === form.value.authorityId
            )
            optionsData.push(option)
          } else {
            const option = {
              authorityId: item.authorityId,
              authorityName: item.authorityName,
              disabled: disabled || item.authorityId === form.value.authorityId
            }
            optionsData.push(option)
          }
        })
}
//  zēng jiā jiǎo sè
const addAuthority = (parentId) => {
  initForm()
  dialogTitle.value = ' xīn zēng jiǎo sè'
  dialogType.value = 'add'
  form.value.parentId = parentId
  setOptions()
  dialogFormVisible.value = true
}
//  biān jí jiǎo sè
const editAuthority = (row) => {
  setOptions()
  dialogTitle.value = ' biān jí jiǎo sè'
  dialogType.value = 'edit'
  for (const key in form.value) {
    form.value[key] = row[key]
  }
  setOptions()
  dialogFormVisible.value = true
}

</script>

<script>

export default {
  name: 'Authority'
}
</script>

<style lang="scss">
.authority {
  .el-input-number {
    margin-left: 15px;
    span {
      display: none;
    }
  }
}
.tree-content{
  margin-top: 10px;
  height: calc(100vh - 148px);
  overflow: auto;
}

</style>
