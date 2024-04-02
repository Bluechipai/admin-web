<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="addMenu('0')"> xīn zēng gēn cài dān</el-button>
      </div>

      <!--  yóu yú cǐ chù cài dān gēn zuǒ cè liè biǎo yī yī duì yīng suǒ yǐ bù xū yào fēn yè pageSize mò rèn999 -->
      <el-table :data="tableData" row-key="ID">
        <el-table-column align="left" label="ID" min-width="100" prop="ID" />
        <el-table-column align="left" label=" zhǎn shì míng chēng" min-width="120" prop="authorityName">
          <template #default="scope">
            <span>{{ scope.row.meta.title }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" tú biāo" min-width="140" prop="authorityName">
          <template #default="scope">
            <div v-if="scope.row.meta.icon" class="icon-column">
              <el-icon>
                <component :is="scope.row.meta.icon" />
              </el-icon>
              <span>{{ scope.row.meta.icon }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" lù yóuName" show-overflow-tooltip min-width="160" prop="name" />
        <el-table-column align="left" label=" lù yóuPath" show-overflow-tooltip min-width="160" prop="path" />
        <el-table-column align="left" label=" shì fǒu yǐn cáng" min-width="100" prop="hidden">
          <template #default="scope">
            <span>{{ scope.row.hidden?" yǐn cáng":" xiǎn shì" }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" fù jié diǎn" min-width="90" prop="parentId" />
        <el-table-column align="left" label=" pái xù" min-width="70" prop="sort" />
        <el-table-column align="left" label=" wén jiàn lù jìng" min-width="360" prop="component" />
        <el-table-column align="left" fixed="right" label=" cāo zuò" width="300">
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="plus"
              @click="addMenu(scope.row.ID)"
            > tiān jiā zi cài dān</el-button>
            <el-button
              type="primary"
              link
              icon="edit"
              @click="editMenu(scope.row.ID)"
            > biān jí</el-button>
            <el-button

              type="primary"
              link
              icon="delete"
              @click="deleteMenu(scope.row.ID)"
            > shān chú</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogFormVisible" :before-close="handleClose" :title="dialogTitle">
      <warning-bar title=" xīn zēng cài dān， xū yào zài jiǎo sè guǎn lǐ nèi pèi zhì quán xiàn cái kě shǐ yòng" />
      <el-form
        v-if="dialogFormVisible"
        ref="menuForm"
        :inline="true"
        :model="form"
        :rules="rules"
        label-position="top"
        label-width="85px"
      >
        <el-form-item label=" lù yóuName" prop="path" style="width:30%">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder=" wéi yī yīng wén zì fú chuàn"
            @change="changeName"
          />
        </el-form-item>
        <el-form-item prop="path" style="width:30%">
          <template #label>
            <span style="display: inline-flex;align-items: center;">
              <span> lù yóuPath</span>
              <el-checkbox v-model="checkFlag" style="margin-left:12px;height: auto"> tiān jiā cān shù</el-checkbox>
            </span>
          </template>

          <el-input
            v-model="form.path"
            :disabled="!checkFlag"
            autocomplete="off"
            placeholder=" jiàn yì zhǐ zài hòu fāng pīn jiē cān shù"
          />
        </el-form-item>
        <el-form-item label=" shì fǒu yǐn cáng" style="width:30%">
          <el-select v-model="form.hidden" placeholder=" shì fǒu zài liè biǎo yǐn cáng">
            <el-option :value="false" label=" fǒu" />
            <el-option :value="true" label=" shì" />
          </el-select>
        </el-form-item>
        <el-form-item label=" fù jié diǎnID" style="width:30%">
          <el-cascader
            v-model="form.parentId"
            style="width:100%"
            :disabled="!isEdit"
            :options="menuOption"
            :props="{ checkStrictly: true,label:'title',value:'ID',disabled:'disabled',emitPath:false}"
            :show-all-levels="false"
            filterable
          />
        </el-form-item>
        <el-form-item label=" wén jiàn lù jìng" prop="component" style="width:60%">
          <el-input v-model="form.component" autocomplete="off" placeholder=" yè miàn:view/xxx/xx.vue  chā jiàn:plugin/xx/xx.vue" @blur="fmtComponent" />
          <span style="font-size:12px;margin-right:12px;"> rú guǒ cài dān bāo hán zi cài dān， qǐng chuàng jiànrouter-view èr jí lù yóu yè miàn huò zhě</span><el-button style="margin-top:4px" @click="form.component = 'view/routerHolder.vue'"> diǎn wǒ shè zhì</el-button>
        </el-form-item>
        <el-form-item label=" zhǎn shì míng chēng" prop="meta.title" style="width:30%">
          <el-input v-model="form.meta.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" tú biāo" prop="meta.icon" style="width:30%">
          <icon :meta="form.meta" style="width:100%" />
        </el-form-item>
        <el-form-item label=" pái xù biāo jì" prop="sort" style="width:30%">
          <el-input v-model.number="form.sort" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="meta.activeName" style="width:30%">
          <template #label>
            <div>
              <span>  gāo liàng cài dān </span>
              <el-tooltip content=" zhù： dāng dào dá cǐ lù yóu shí hòu， zhǐ dìng zuǒ cè cài dān zhǐ dìngname huì chù yú huó yuè zhuàng tài（ liàng qǐ）， kě wèi kōng， wèi kōng zé wèi běn lù yóuName。" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="form.meta.activeName" :placeholder="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="KeepAlive" prop="meta.keepAlive" style="width:30%">
          <el-select v-model="form.meta.keepAlive" style="width:100%" placeholder=" shì fǒukeepAlive huǎn cún yè miàn">
            <el-option :value="false" label=" fǒu" />
            <el-option :value="true" label=" shì" />
          </el-select>
        </el-form-item>
        <el-form-item label="CloseTab" prop="meta.closeTab" style="width:30%">
          <el-select v-model="form.meta.closeTab" style="width:100%" placeholder=" shì fǒu zì dòng guān bìtab">
            <el-option :value="false" label=" fǒu" />
            <el-option :value="true" label=" shì" />
          </el-select>
        </el-form-item>
        <el-form-item style="width:30%">
          <template #label>
            <div>
              <span>  shì fǒu wèi jī chǔ yè miàn </span>
              <el-tooltip content=" cǐ xiàng xuǎn zé wèi shì， zé bù huì zhǎn shì zuǒ cè cài dān yǐ jí dǐng bù xìn xī。" placement="top" effect="light">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>

          <el-select v-model="form.meta.defaultMenu" style="width:100%" placeholder=" shì fǒu wèi jī chǔ yè miàn">
            <el-option :value="false" label=" fǒu" />
            <el-option :value="true" label=" shì" />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button
          type="primary"
          icon="edit"
          @click="addParameter(form)"
        > xīn zēng cài dān cān shù</el-button>
        <el-table :data="form.parameters" style="width: 100%;margin-top: 12px;">
          <el-table-column align="left" prop="type" label=" cān shù lèi xíng" width="180">
            <template #default="scope">
              <el-select v-model="scope.row.type" placeholder=" qǐng xuǎn zé">
                <el-option key="query" value="query" label="query" />
                <el-option key="params" value="params" label="params" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="key" label=" cān shùkey" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.key" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="value" label=" cān shù zhí">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.value" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template #default="scope">
              <div>
                <el-button
                  type="danger"

                  icon="delete"
                  @click="deleteParameter(form.parameters,scope.$index)"
                > shān chú</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          style="margin-top:12px"
          type="primary"
          icon="edit"
          @click="addBtn(form)"
        > xīn zēng kě kòng àn niǔ</el-button>
        <el-table :data="form.menuBtn" style="width: 100%;margin-top: 12px;">
          <el-table-column align="left" prop="name" label=" àn niǔ míng chēng" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.name" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name" label=" bèi zhù" width="180">
            <template #default="scope">
              <div>
                <el-input v-model="scope.row.desc" />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left">
            <template #default="scope">
              <div>
                <el-button
                  type="danger"

                  icon="delete"
                  @click="deleteBtn(form.menuBtn,scope.$index)"
                > shān chú</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button type="primary" @click="enterDialog"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  updateBaseMenu,
  getMenuList,
  addBaseMenu,
  deleteBaseMenu,
  getBaseMenuById
} from '@/api/menu'
import icon from '@/view/superAdmin/menu/icon.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { canRemoveAuthorityBtnApi } from '@/api/authorityBtn'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const rules = reactive({
  path: [{ required: true, message: ' qǐng shū rù cài dānname', trigger: 'blur' }],
  component: [
    { required: true, message: ' qǐng shū rù wén jiàn lù jìng', trigger: 'blur' }
  ],
  'meta.title': [
    { required: true, message: ' qǐng shū rù cài dān zhǎn shì míng chēng', trigger: 'blur' }
  ]
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(999)
const tableData = ref([])
const searchInfo = ref({})
//  chá xún
const getTableData = async() => {
  const table = await getMenuList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

//  xīn zēng cān shù
const addParameter = (form) => {
  if (!form.parameters) {
    form.parameters = []
  }
  form.parameters.push({
    type: 'query',
    key: '',
    value: ''
  })
}

const fmtComponent = () => {
  form.value.component = form.value.component.replace(/\\/g, '/')
}

//  shān chú cān shù
const deleteParameter = (parameters, index) => {
  parameters.splice(index, 1)
}

//  xīn zēng kě kòng àn niǔ
const addBtn = (form) => {
  if (!form.menuBtn) {
    form.menuBtn = []
  }
  form.menuBtn.push({
    name: '',
    desc: '',
  })
}
//  shān chú kě kòng àn niǔ
const deleteBtn = async(btns, index) => {
  const btn = btns[index]
  if (btn.ID === 0) {
    btns.splice(index, 1)
    return
  }
  const res = await canRemoveAuthorityBtnApi({ id: btn.ID })
  if (res.code === 0) {
    btns.splice(index, 1)
  }
}

const form = ref({
  ID: 0,
  path: '',
  name: '',
  hidden: false,
  parentId: '',
  component: '',
  meta: {
    activeName: '',
    title: '',
    icon: '',
    defaultMenu: false,
    closeTab: false,
    keepAlive: false
  },
  parameters: [],
  menuBtn: []
})
const changeName = () => {
  form.value.path = form.value.name
}

const handleClose = (done) => {
  initForm()
  done()
}
//  shān chú cài dān
const deleteMenu = (ID) => {
  ElMessageBox.confirm(' cǐ cāo zuò jiāng yǒng jiǔ shān chú suǒ yǒu jiǎo sè xià gāi cài dān,  shì fǒu jì xù?', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning'
  })
    .then(async() => {
      const res = await deleteBaseMenu({ ID })
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
//  chū shǐ huà dàn chuāng nèi biǎo gé fāng fǎ
const menuForm = ref(null)
const checkFlag = ref(false)
const initForm = () => {
  checkFlag.value = false
  menuForm.value.resetFields()
  form.value = {
    ID: 0,
    path: '',
    name: '',
    hidden: false,
    parentId: '',
    component: '',
    meta: {
      title: '',
      icon: '',
      defaultMenu: false,
      closeTab: false,
      keepAlive: false
    }
  }
}
//  guān bì dàn chuāng

const dialogFormVisible = ref(false)
const closeDialog = () => {
  initForm()
  dialogFormVisible.value = false
}
//  tiān jiāmenu
const enterDialog = async() => {
  menuForm.value.validate(async valid => {
    if (valid) {
      let res
      if (isEdit.value) {
        res = await updateBaseMenu(form.value)
      } else {
        res = await addBaseMenu(form.value)
      }
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: isEdit.value ? ' biān jí chéng gōng' : ' tiān jiā chéng gōng!'
        })
        getTableData()
      }
      initForm()
      dialogFormVisible.value = false
    }
  })
}

const menuOption = ref([
  {
    ID: '0',
    title: ' gēn cài dān'
  }
])
const setOptions = () => {
  menuOption.value = [
    {
      ID: '0',
      title: ' gēn mù lù'
    }
  ]
  setMenuOptions(tableData.value, menuOption.value, false)
}
const setMenuOptions = (menuData, optionsData, disabled) => {
  menuData &&
        menuData.forEach(item => {
          if (item.children && item.children.length) {
            const option = {
              title: item.meta.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === form.value.ID,
              children: []
            }
            setMenuOptions(
              item.children,
              option.children,
              disabled || item.ID === form.value.ID
            )
            optionsData.push(option)
          } else {
            const option = {
              title: item.meta.title,
              ID: String(item.ID),
              disabled: disabled || item.ID === form.value.ID
            }
            optionsData.push(option)
          }
        })
}

//  tiān jiā cài dān fāng fǎ，id wèi 0 zé wèi tiān jiā gēn cài dān
const isEdit = ref(false)
const dialogTitle = ref(' xīn zēng cài dān')
const addMenu = (id) => {
  dialogTitle.value = ' xīn zēng cài dān'
  form.value.parentId = String(id)
  isEdit.value = false
  setOptions()
  dialogFormVisible.value = true
}
//  xiū gǎi cài dān fāng fǎ
const editMenu = async(id) => {
  dialogTitle.value = ' biān jí cài dān'
  const res = await getBaseMenuById({ id })
  form.value = res.data.menu
  isEdit.value = true
  setOptions()
  dialogFormVisible.value = true
}

</script>

<script>
export default {
  name: 'Menus',
}
</script>

<style scoped lang="scss">
.warning {
  color: #dc143c;
}
.icon-column{
  display: flex;
  align-items: center;
  .el-icon{
    margin-right: 8px;
  }
}
</style>
