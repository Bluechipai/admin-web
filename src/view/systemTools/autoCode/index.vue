<template>
  <div>
    <warning-bar href="https://www.bilibili.com/video/BV1kv4y1g7nT?p=3" title=" cǐ gōng néng wèi kāi fā huán jìng shǐ yòng， bù jiàn yì fā bù dào shēng chǎn， jù tǐ shǐ yòng xiào guǒ qǐng kàn shì pínhttps://www.bilibili.com/video/BV1kv4y1g7nT?p=3" />
    <!--  cóng shù jù kù zhí jiē huò qǔ zì duàn -->
    <div class="gva-search-box">
      <el-collapse v-model="activeNames" style="margin-bottom:12px">
        <el-collapse-item name="1">
          <template #title>
            <div :style="{fontSize:'16px',paddingLeft:'20px'}">
               diǎn zhè lǐ cóng xiàn yǒu shù jù kù chuàng jiàn dài mǎ
              <el-icon class="header-icon ">
                <pointer />
              </el-icon>
            </div>
          </template>
          <el-form ref="getTableForm" style="margin-top:24px" :inline="true" :model="dbform" label-width="120px">
            <el-form-item label=" yè wù kù" prop="selectDBtype">
              <template #label>
                <el-tooltip content=" zhù： xū yào tí qián dàodb-list zì xíng pèi zhì duō shù jù kù， rú wèi pèi zhì xū pèi zhì hòu zhòng qǐ fú wù fāng kě shǐ yòng。（ cǐ chù kě xuǎn zé duì yīng kù biǎo， kě lǐ jiě wèi cóng nǎ gè kù xuǎn zé biǎo）" placement="bottom" effect="light">
                  <div>  yè wù kù <el-icon><QuestionFilled /></el-icon> </div>
                </el-tooltip>
              </template>
              <el-select v-model="dbform.businessDB" clearable style="width:194px" placeholder=" xuǎn zé yè wù kù" @change="getDbFunc">
                <el-option
                  v-for="item in dbList"
                  :key="item.aliasName"
                  :value="item.aliasName"
                  :label="item.aliasName"
                  :disabled="item.disable"
                >
                  <div>
                    <span>{{ item.aliasName }}</span>
                    <span style="float:right;color:#8492a6;font-size:13px">{{ item.dbName }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label=" shù jù kù míng" prop="structName">
              <el-select v-model="dbform.dbName" clearable filterable placeholder=" qǐng xuǎn zé shù jù kù" @change="getTableFunc">
                <el-option
                  v-for="item in dbOptions"
                  :key="item.database"
                  :label="item.database"
                  :value="item.database"
                />
              </el-select>
            </el-form-item>
            <el-form-item label=" biǎo míng" prop="structName">
              <el-select
                v-model="dbform.tableName"
                :disabled="!dbform.dbName"
                filterable
                placeholder=" qǐng xuǎn zé biǎo"
              >
                <el-option
                  v-for="item in tableOptions"
                  :key="item.tableName"
                  :label="item.tableName"
                  :value="item.tableName"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getColumnFunc"> shǐ yòng cǐ biǎo chuàng jiàn</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="gva-search-box">
      <!--  chū shǐ bǎn běn zì dòng huà dài mǎ gōng jù -->
      <el-form ref="autoCodeForm" :rules="rules" :model="form" label-width="120px" :inline="true">
        <el-form-item label="Struct míng chēng" prop="structName">
          <el-input v-model="form.structName" placeholder=" shǒu zì mǔ zì dòng zhuǎn huàn dà xiě" />
        </el-form-item>
        <el-form-item label="TableName" prop="tableName">
          <el-input v-model="form.tableName" placeholder=" zhǐ dìng biǎo míng（ fēi bì tián）" />
        </el-form-item>
        <el-form-item label="Struct jiǎn chēng" prop="abbreviation">
          <el-input v-model="form.abbreviation" placeholder=" jiǎn chēng huì zuò wèi rù cān duì xiàng míng hé lù yóugroup" />
        </el-form-item>
        <el-form-item label="Struct zhōng wén míng chēng" prop="description">
          <el-input v-model="form.description" placeholder=" zhōng wén miáo shù zuò wèi zì dòngapi miáo shù" />
        </el-form-item>
        <el-form-item label=" wén jiàn míng chēng" prop="packageName">
          <el-input v-model="form.packageName" placeholder=" shēng chéng wén jiàn de mò rèn míng chēng( jiàn yì wèi tuó fēng gé shì, shǒu zì mǔ xiǎo xiě, rúsysXxxXxxx)" @blur="toLowerCaseFunc(form,'packageName')" />
        </el-form-item>
        <el-form-item label="Package（ bāo）" prop="package">
          <el-select v-model="form.package" style="width:194px">
            <el-option v-for="item in pkgs" :key="item.ID" :value="item.packageName" :label="item.packageName" />
          </el-select>
          <el-icon class="auto-icon" @click="getPkgs"><refresh /></el-icon>
          <el-icon class="auto-icon" @click="goPkgs"><document-add /></el-icon>
        </el-form-item>
        <el-form-item label=" yè wù kù" prop="businessDB">
          <template #label>
            <el-tooltip content=" zhù： xū yào tí qián dàodb-list zì xíng pèi zhì duō shù jù kù， cǐ xiàng wèi kōng zé huì shǐ yònggva běn kù chuàng jiàn zì dòng huà dài mǎ(global.GVA_DB), tián xiě hòu zé huì chuàng jiàn zhǐ dìng kù de dài mǎ(global.MustGetGlobalDBByDBName(dbname))" placement="bottom" effect="light">
              <div>  yè wù kù <el-icon><QuestionFilled /></el-icon> </div>
            </el-tooltip>
          </template>
          <el-select
            v-model="form.businessDB"
            style="width:194px"
            placeholder=" xuǎn zé yè wù kù"
          >
            <el-option
              v-for="item in dbList"
              :key="item.aliasName"
              :value="item.aliasName"
              :label="item.aliasName"
              :disabled="item.disable"
            >
              <div>
                <span>{{ item.aliasName }}</span>
                <span style="float:right;color:#8492a6;font-size:13px">{{ item.dbName }}</span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-tooltip content=" zhù： huì zì dòng zài jié gòu tǐ tiān jiā created_by updated_by deleted_by， fāng biàn yòng hù jìn xíng zī yuán quán xiàn kòng zhì" placement="bottom" effect="light">
              <div>  chuàng jiàn zī yuán biāo shí <el-icon><QuestionFilled /></el-icon> </div>
            </el-tooltip>
          </template>
          <el-checkbox v-model="form.autoCreateResource" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-tooltip content=" zhù： bǎ zì dòng shēng chéng deAPI zhù cè jìn shù jù kù" placement="bottom" effect="light">
              <div>  zì dòng chuàng jiànAPI </div>
            </el-tooltip>
          </template>
          <el-checkbox v-model="form.autoCreateApiToSql" />
        </el-form-item>
        <el-form-item>
          <template #label>
            <el-tooltip content=" zhù： zì dòng qiān yí shēng chéng de wén jiàn dàoyaml pèi zhì de duì yīng wèi zhì" placement="bottom" effect="light">
              <div>  zì dòng yí dòng wén jiàn </div>
            </el-tooltip>
          </template>
          <el-checkbox v-model="form.autoMoveFile" />
        </el-form-item>
      </el-form>
    </div>
    <!--  zǔ jiàn liè biǎo -->
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" @click="editAndAddField()"> xīn zēng zì duàn</el-button>
      </div>
      <el-table :data="form.fields">
        <el-table-column align="left" type="index" label=" xù liè" width="60" />
        <el-table-column align="left" prop="fieldName" label=" zì duàn míng chēng" width="160">
          <template #default="{row}">
            <el-input v-model="row.fieldName" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="fieldDesc" label=" zhōng wén míng" width="160">
          <template #default="{row}">
            <el-input v-model="row.fieldDesc" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="require" label=" bì tián">
          <template #default="{row}"> <el-checkbox v-model="row.require" /></template>
        </el-table-column>
        <el-table-column align="left" prop="sort" label=" pái xù">
          <template #default="{row}"> <el-checkbox v-model="row.sort" /> </template>
        </el-table-column>
        <el-table-column align="left" prop="fieldJson" width="160px" label=" zì duànJson">
          <template #default="{row}">
            <el-input v-model="row.fieldJson" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="fieldType" label=" zì duàn lèi xíng" width="160">
          <template #default="{row}">
            <el-select
              v-model="row.fieldType"
              style="width:100%"
              placeholder=" qǐng xuǎn zé zì duàn lèi xíng"
              clearable
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="left" prop="dataTypeLong" label=" shù jù kù zì duàn zhǎng dù" width="160">
          <template #default="{row}">
            <el-input v-model="row.dataTypeLong" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="columnName" label=" shù jù kù zì duàn" width="160">
          <template #default="{row}">
            <el-input v-model="row.columnName" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="comment" label=" shù jù kù zì duàn miáo shù" width="160">
          <template #default="{row}">
            <el-input v-model="row.columnName" />
          </template>
        </el-table-column>
        <el-table-column align="left" prop="fieldSearchType" label=" sōu suǒ tiáo jiàn" width="130">
          <template #default="{row}">
            <el-select
              v-model="row.fieldSearchType"
              style="width:100%"
              placeholder=" qǐng xuǎn zé zì duàn chá xún tiáo jiàn"
              clearable
            >
              <el-option
                v-for="item in typeSearchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="
                  (row.fieldType!=='string'&&item.value==='LIKE')||
                    ((row.fieldType!=='int'&&row.fieldType!=='time.Time'&&row.fieldType!=='float64')&&(item.value==='BETWEEN' || item.value==='NOT BETWEEN'))
                "
              />
            </el-select>
          </template>

        </el-table-column>
        <el-table-column align="left" label=" cāo zuò" width="300" fixed="right">
          <template #default="scope">
            <el-button

              type="primary"
              link
              icon="edit"
              @click="editAndAddField(scope.row)"
            > gāo jí biān jí</el-button>
            <el-button

              type="primary"
              link
              :disabled="scope.$index === 0"
              @click="moveUpField(scope.$index)"
            > shàng yí</el-button>
            <el-button

              type="primary"
              link
              :disabled="(scope.$index + 1) === form.fields.length"
              @click="moveDownField(scope.$index)"
            > xià yí</el-button>
            <el-popover v-model="scope.row.visible" placement="top">
              <p> què dìng shān chú ma？</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false"> qǔ xiāo</el-button>
                <el-button type="primary" @click="deleteField(scope.$index)"> què dìng</el-button>
              </div>
              <template #reference>
                <el-button type="primary" link icon="delete" @click="scope.row.visible = true"> shān chú</el-button>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <!--  zǔ jiàn liè biǎo -->
      <div class="gva-btn-list justify-content-flex-end auto-btn-list">
        <el-button type="primary" @click="enterForm(true)"> yù lǎn dài mǎ</el-button>
        <el-button type="primary" @click="enterForm(false)"> shēng chéng dài mǎ</el-button>
      </div>
    </div>
    <!--  zǔ jiàn dàn chuāng -->
    <el-dialog v-model="dialogFlag" width="70%" title=" zǔ jiàn nèi róng">
      <FieldDialog v-if="dialogFlag" ref="fieldDialogNode" :dialog-middle="dialogMiddle" :typeOptions="typeOptions"/>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button type="primary" @click="enterDialog"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="previewFlag">
      <template #header>
        <div class="previewCodeTool">
          <p> cāo zuò lán：</p>
          <el-button type="primary" @click="selectText"> quán xuǎn</el-button>
          <el-button type="primary" @click="copy"> fù zhì</el-button>
        </div>
      </template>
      <PreviewCodeDialog v-if="previewFlag" ref="previewNode" :typeSearchOptions="typeSearchOptions" :preview-code="preViewCode" />
      <template #footer>
        <div class="dialog-footer" style="padding-top:14px;padding-right:14px">
          <el-button type="primary" @click="previewFlag = false"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

import FieldDialog from '@/view/systemTools/autoCode/component/fieldDialog.vue'
import PreviewCodeDialog from '@/view/systemTools/autoCode/component/previewCodeDialg.vue'
import { toUpperCase, toHump, toSQLLine, toLowerCase } from '@/utils/stringFun'
import { createTemp, getDB, getTable, getColumn, preview, getMeta, getPackageApi } from '@/api/autoCode'
import { getDict } from '@/utils/dictionary'
import { ref, getCurrentInstance, reactive, watch, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import WarningBar from '@/components/warningBar/warningBar.vue'

const typeOptions = ref([
  {
    label: ' zì fú chuàn',
    value: 'string'
  },
  {
    label: ' zhěng xíng',
    value: 'int'
  },
  {
    label: ' bù ěr zhí',
    value: 'bool'
  },
  {
    label: ' fú diǎn xíng',
    value: 'float64'
  },
  {
    label: ' shí jiān',
    value: 'time.Time'
  },
  {
    label: ' méi jǔ',
    value: 'enum'
  },
  {
    label: ' dān tú piàn（ zì fú chuàn）',
    value: 'picture',
  },
  {
    label: ' wén jiàn（json zì fú chuàn）',
    value: 'file',
  },
  {
    label: ' duō tú piàn（ kāi fā zhōng）',
    value: 'pictures',
    disabled: true
  }
])

const typeSearchOptions = ref([
  {
    label: '=',
    value: '='
  },
  {
    label: '<>',
    value: '<>'
  },
  {
    label: '>',
    value: '>'
  },
  {
    label: '<',
    value: '<'
  },
  {
    label: 'LIKE',
    value: 'LIKE'
  },
  {
    label: 'BETWEEN',
    value: 'BETWEEN'
  },
  {
    label: 'NOT BETWEEN',
    value: 'NOT BETWEEN'
  }
])

const fieldTemplate = {
  fieldName: '',
  fieldDesc: '',
  fieldType: '',
  dataType: '',
  fieldJson: '',
  columnName: '',
  dataTypeLong: '',
  comment: '',
  require: false,
  sort: false,
  errorText: '',
  clearable: true,
  fieldSearchType: '',
  dictType: ''
}
const route = useRoute()
const router = useRouter()
const activeNames = reactive([])
const preViewCode = ref({})
const dbform = ref({
  businessDB: '',
  dbName: '',
  tableName: ''
})
const tableOptions = ref([])
const addFlag = ref('')
const fdMap = ref({})
const form = ref({
  structName: '',
  tableName: '',
  packageName: '',
  package: '',
  abbreviation: '',
  description: '',
  businessDB: '',
  autoCreateApiToSql: true,
  autoMoveFile: true,
  autoCreateResource: false,
  fields: []
})
const rules = ref({
  structName: [
    { required: true, message: ' qǐng shū rù jié gòu tǐ míng chēng', trigger: 'blur' }
  ],
  abbreviation: [
    { required: true, message: ' qǐng shū rù jié gòu tǐ jiǎn chēng', trigger: 'blur' }
  ],
  description: [
    { required: true, message: ' qǐng shū rù jié gòu tǐ miáo shù', trigger: 'blur' }
  ],
  packageName: [
    {
      required: true,
      message: ' wén jiàn míng chēng：sysXxxxXxxx',
      trigger: 'blur'
    }
  ],
  package: [
    { required: true, message: ' qǐng xuǎn zépackage', trigger: 'blur' }
  ]
})
const dialogMiddle = ref({})
const bk = ref({})
const dialogFlag = ref(false)
const previewFlag = ref(false)

const toLowerCaseFunc = (form, key) => {
  form[key] = toLowerCase(form[key])
}
const previewNode = ref(null)
const selectText = () => {
  previewNode.value.selectText()
}
const copy = () => {
  previewNode.value.copy()
}
const editAndAddField = (item) => {
  dialogFlag.value = true
  if (item) {
    addFlag.value = 'edit'
    bk.value = JSON.parse(JSON.stringify(item))
    dialogMiddle.value = item
  } else {
    addFlag.value = 'add'
    dialogMiddle.value = JSON.parse(JSON.stringify(fieldTemplate))
  }
}
const moveUpField = (index) => {
  if (index === 0) {
    return
  }
  const oldUpField = form.value.fields[index - 1]
  form.value.fields.splice(index - 1, 1)
  form.value.fields.splice(index, 0, oldUpField)
}
const moveDownField = (index) => {
  const fCount = form.value.fields.length
  if (index === fCount - 1) {
    return
  }
  const oldDownField = form.value.fields[index + 1]
  form.value.fields.splice(index + 1, 1)
  form.value.fields.splice(index, 0, oldDownField)
}

const currentInstance = getCurrentInstance()
const enterDialog = () => {
  currentInstance.refs.fieldDialogNode.fieldDialogFrom.validate(valid => {
    if (valid) {
      dialogMiddle.value.fieldName = toUpperCase(
        dialogMiddle.value.fieldName
      )
      if (addFlag.value === 'add') {
        form.value.fields.push(dialogMiddle.value)
      }
      dialogFlag.value = false
    } else {
      return false
    }
  })
}
const closeDialog = () => {
  if (addFlag.value === 'edit') {
    dialogMiddle.value = bk.value
  }
  dialogFlag.value = false
}
const deleteField = (index) => {
  form.value.fields.splice(index, 1)
}
const autoCodeForm = ref(null)
const enterForm = async(isPreview) => {
  if (form.value.fields.length <= 0) {
    ElMessage({
      type: 'error',
      message: ' qǐng tián xiě zhì shǎo yī gèfield'
    })
    return false
  }
  if (
    form.value.fields.some(item => item.fieldName === form.value.structName)
  ) {
    ElMessage({
      type: 'error',
      message: ' cún zài yǔ jié gòu tǐ tóng míng de zì duàn'
    })
    return false
  }

  if (form.value.package === form.value.abbreviation) {
    ElMessage({
      type: 'error',
      message: 'package hé jié gòu tǐ jiǎn chēng bù kě tóng míng'
    })
    return false
  }

  autoCodeForm.value.validate(async valid => {
    if (valid) {
      for (const key in form.value) {
        if (typeof form.value[key] === 'string') {
          form.value[key] = form.value[key].trim()
        }
      }
      form.value.structName = toUpperCase(form.value.structName)
      form.value.tableName = form.value.tableName.replace(' ', '')
      if (!form.value.tableName) {
        form.value.tableName = toSQLLine(toLowerCase(form.value.structName))
      }
      if (form.value.structName === form.value.abbreviation) {
        ElMessage({
          type: 'error',
          message: 'structName héstruct jiǎn chēng bù néng xiāng tóng'
        })
        return false
      }
      form.value.humpPackageName = toSQLLine(form.value.packageName)
      if (isPreview) {
        const data = await preview(form.value)
        preViewCode.value = data.data.autoCode
        previewFlag.value = true
      } else {
        const data = await createTemp(form.value)
        if (data.headers?.success === 'false') {
          return
        } else {
          if (form.value.autoMoveFile) {
            ElMessage({
              type: 'success',
              message: ' zì dòng huà dài mǎ chuàng jiàn chéng gōng， zì dòng yí dòng chéng gōng'
            })
            return
          }
          ElMessage({
            type: 'success',
            message: ' zì dòng huà dài mǎ chuàng jiàn chéng gōng， zhèng zài xià zài'
          })
        }
        const blob = new Blob([data])
        const fileName = 'ginvueadmin.zip'
        if ('download' in document.createElement('a')) {
          //  bù shìIE liú lǎn qì
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', fileName)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link) //  xià zài wán chéng yí chú yuán sù
          window.URL.revokeObjectURL(url) //  shì fàng diàoblob duì xiàng
        } else {
          // IE 10+
          window.navigator.msSaveBlob(blob, fileName)
        }
      }
    } else {
      return false
    }
  })
}

const dbList = ref([])
const dbOptions = ref([])

const getDbFunc = async() => {
  dbform.value.dbName = ''
  dbform.value.tableName = ''
  const res = await getDB({ businessDB: dbform.value.businessDB })
  if (res.code === 0) {
    dbOptions.value = res.data.dbs
    dbList.value = res.data.dbList
  }
}
const getTableFunc = async() => {
  const res = await getTable({ businessDB: dbform.value.businessDB, dbName: dbform.value.dbName })
  if (res.code === 0) {
    tableOptions.value = res.data.tables
  }
  dbform.value.tableName = ''
}

const getColumnFunc = async() => {
  const gormModelList = ['id', 'created_at', 'updated_at', 'deleted_at']
  const res = await getColumn(dbform.value)
  if (res.code === 0) {
    let dbtype = ''
    if (dbform.value.businessDB !== '') {
      const dbtmp = dbList.value.find(item => item.aliasName === dbform.value.businessDB)
      const dbraw = toRaw(dbtmp)
      dbtype = dbraw.dbtype
    }
    const tbHump = toHump(dbform.value.tableName)
    form.value.structName = toUpperCase(tbHump)
    form.value.tableName = dbform.value.tableName
    form.value.packageName = tbHump
    form.value.abbreviation = tbHump
    form.value.description = tbHump + ' biǎo'
    form.value.autoCreateApiToSql = true
    form.value.autoMoveFile = true
    form.value.fields = []
    res.data.columns &&
          res.data.columns.forEach(item => {
            if (!gormModelList.some(gormfd => gormfd === item.columnName)) {
              const fbHump = toHump(item.columnName)
              form.value.fields.push({
                fieldName: toUpperCase(fbHump),
                fieldDesc: item.columnComment || fbHump + ' zì duàn',
                fieldType: fdMap.value[item.dataType],
                dataType: item.dataType,
                fieldJson: fbHump,
                dataTypeLong: item.dataTypeLong && item.dataTypeLong.split(',')[0],
                columnName: dbtype === 'oracle' ? item.columnName.toUpperCase() : item.columnName,
                comment: item.columnComment,
                require: false,
                errorText: '',
                clearable: true,
                fieldSearchType: '',
                dictType: ''
              })
            }
          })
  }
}
const setFdMap = async() => {
  const fdTypes = ['string', 'int', 'bool', 'float64', 'time.Time']
  fdTypes.forEach(async fdtype => {
    const res = await getDict(fdtype)
    res && res.forEach(item => {
      fdMap.value[item.label] = fdtype
    })
  })
}
const getAutoCodeJson = async(id) => {
  const res = await getMeta({ id: Number(id) })
  if (res.code === 0) {
    form.value = JSON.parse(res.data.meta)
  }
}

const pkgs = ref([])
const getPkgs = async() => {
  const res = await getPackageApi()
  if (res.code === 0) {
    pkgs.value = res.data.pkgs
  }
}

const goPkgs = () => {
  router.push({ name: 'autoPkg' })
}

const init = () => {
  getDbFunc()
  setFdMap()
  getPkgs()
  const id = route.params.id
  if (id) {
    getAutoCodeJson(id)
  }
}
init()

watch(() => route.params.id, () => {
  if (route.name === 'autoCodeEdit') {
    init()
  }
})

</script>

<script>

export default {
  name: 'AutoCode'
}
</script>

<style scoped lang="scss">
  .previewCodeTool {
    display: flex;
    align-items: center;
    padding: 5px 0;
  }
.button-box {
  padding: 10px 20px;
  .el-button {
    margin-right: 20px;
    float: right;
  }
}
.auto-btn-list{
  margin-top: 16px;
}
.auto-icon{
  margin-left: 6px;
  color: #666;
  cursor: pointer;
}

</style>
