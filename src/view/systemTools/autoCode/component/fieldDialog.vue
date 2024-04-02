<template>
  <div>
    <warning-bar title="id , created_at , updated_at , deleted_at  huì zì dòng shēng chéng qǐng wù zhòng fù chuàng jiàn。 sōu suǒ shí rú guǒ tiáo jiàn wèiLIKE zhǐ zhī chí zì fú chuàn" />
    <el-form
      ref="fieldDialogFrom"
      :model="middleDate"
      label-width="120px"
      label-position="right"
      :rules="rules"
      class="grid-form"
    >
      <el-form-item label=" zì duàn míng chēng" prop="fieldName">
        <el-input v-model="middleDate.fieldName" autocomplete="off" style="width:80%" />
        <el-button style="width:18%;margin-left:2%" @click="autoFill">
          <span style="font-size: 12px"> zì dòng tián chōng</span>
        </el-button>
      </el-form-item>
      <el-form-item label=" zì duàn zhōng wén míng" prop="fieldDesc">
        <el-input v-model="middleDate.fieldDesc" autocomplete="off" />
      </el-form-item>
      <el-form-item label=" zì duànJSON" prop="fieldJson">
        <el-input v-model="middleDate.fieldJson" autocomplete="off" />
      </el-form-item>
      <el-form-item label=" shù jù kù zì duàn míng" prop="columnName">
        <el-input v-model="middleDate.columnName" autocomplete="off" />
      </el-form-item>
      <el-form-item label=" shù jù kù zì duàn miáo shù" prop="comment">
        <el-input v-model="middleDate.comment" autocomplete="off" />
      </el-form-item>
      <el-form-item label=" zì duàn lèi xíng" prop="fieldType">
        <el-select
          v-model="middleDate.fieldType"
          style="width:100%"
          placeholder=" qǐng xuǎn zé zì duàn lèi xíng"
          clearable
          @change="clearOther"
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="middleDate.fieldType === 'enum' ? ' méi jǔ zhí' : ' lèi xíng zhǎng dù'" prop="dataTypeLong">
        <el-input v-model="middleDate.dataTypeLong" :placeholder="middleDate.fieldType === 'enum'?` lì:' běi jīng',' tiān jīn'`:' shù jù kù lèi xíng zhǎng dù'" />
      </el-form-item>
      <el-form-item label=" zì duàn chá xún tiáo jiàn" prop="fieldSearchType">
        <el-select
          v-model="middleDate.fieldSearchType"
          style="width:100%"
          placeholder=" qǐng xuǎn zé zì duàn chá xún tiáo jiàn"
          clearable
        >
          <el-option
            v-for="item in typeSearchOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="canSelect(item.value)"
          />
        </el-select>
      </el-form-item>
      <el-form-item label=" guān lián zì diǎn" prop="dictType">
        <el-select
          v-model="middleDate.dictType"
          style="width:100%"
          :disabled="middleDate.fieldType!=='int'"
          placeholder=" qǐng xuǎn zé zì diǎn"
          clearable
        >
          <el-option
            v-for="item in dictOptions"
            :key="item.type"
            :label="`${item.type}(${item.name})`"
            :value="item.type"
          />
        </el-select>
      </el-form-item>
      <el-form-item label=" shì fǒu pái xù">
        <el-switch v-model="middleDate.sort" />
      </el-form-item>
      <el-form-item label=" shì fǒu bì tián">
        <el-switch v-model="middleDate.require" />
      </el-form-item>
      <el-form-item label=" shì fǒu kě qīng kōng">
        <el-switch v-model="middleDate.clearable" />
      </el-form-item>
      <el-form-item label=" xiào yàn shī bài wén àn">
        <el-input v-model="middleDate.errorText" />
      </el-form-item>

    </el-form>
  </div>
</template>

<script setup>
import { toLowerCase, toSQLLine } from '@/utils/stringFun'
import { getSysDictionaryList } from '@/api/sysDictionary'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'

const props = defineProps({
  dialogMiddle: {
    type: Object,
    default: function() {
      return {}
    }
  },
  typeOptions: {
    type: Array,
    default: function() {
      return []
    }
  },
  typeSearchOptions: {
    type: Array,
    default: function() {
      return []
    }
  },
})

const middleDate = ref({})
const dictOptions = ref([])


const rules = ref({
  fieldName: [
    { required: true, message: ' qǐng shū rù zì duàn yīng wén míng', trigger: 'blur' }
  ],
  fieldDesc: [
    { required: true, message: ' qǐng shū rù zì duàn zhōng wén míng', trigger: 'blur' }
  ],
  fieldJson: [
    { required: true, message: ' qǐng shū rù zì duàn gé shì huàjson', trigger: 'blur' }
  ],
  columnName: [
    { required: true, message: ' qǐng shū rù shù jù kù zì duàn', trigger: 'blur' }
  ],
  fieldType: [
    { required: true, message: ' qǐng xuǎn zé zì duàn lèi xíng', trigger: 'blur' }
  ]
})

const init = async() => {
  middleDate.value = props.dialogMiddle
  const dictRes = await getSysDictionaryList({
    page: 1,
    pageSize: 999999
  })

  dictOptions.value = dictRes.data.list
}
init()

const autoFill = () => {
  middleDate.value.fieldJson = toLowerCase(middleDate.value.fieldName)
  middleDate.value.columnName = toSQLLine(middleDate.value.fieldJson)
}

const canSelect = (item) => {
  const fieldType = middleDate.value.fieldType
  if (fieldType !== 'string' && item === 'LIKE') {
    return true
  }

  if ((fieldType !== 'int' && fieldType !== 'time.Time' && fieldType !== 'float64') && (item === 'BETWEEN' || item === 'NOT BETWEEN')) {
    return true
  }
  return false
}

const clearOther = () => {
  middleDate.value.fieldSearchType = ''
  middleDate.value.dictType = ''
}

const fieldDialogFrom = ref(null)
defineExpose({ fieldDialogFrom })
</script>

<script>

export default {
  name: 'FieldDialog'
}
</script>
<style scoped>
.grid-form{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
