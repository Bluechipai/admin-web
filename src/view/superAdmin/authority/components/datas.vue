<template>
  <div>
    <warning-bar title=" cǐ gōng néng jǐn yòng yú chuàng jiàn jiǎo sè hé jiǎo sè demany2many guān xì biǎo， jù tǐ shǐ yòng hái xū zì jǐ jié hé biǎo shí xiàn yè wù， xiáng qíng cān kǎo shì lì dài mǎ（ kè hù shì lì）。 cǐ gōng néng bù jiàn yì shǐ yòng， jiàn yì shǐ yòng chā jiàn shì chǎng【 zǔ zhī guǎn lǐ gōng néng（ diǎn jī qián wǎng）】 lái guǎn lǐ zī yuán quán xiàn。" href="https://plugin.gin-vue-admin.com/#/layout/newPluginInfo?id=36" />
    <div class="clearfix sticky-button" style="margin: 18px">
      <el-button class="fl-right" type="primary" @click="authDataEnter"> què  dìng</el-button>
      <el-button class="fl-left" type="primary" @click="all"> quán xuǎn</el-button>
      <el-button class="fl-left" type="primary" @click="self"> běn jiǎo sè</el-button>
      <el-button class="fl-left" type="primary" @click="selfAndChildren"> běn jiǎo sè jí zi jiǎo sè</el-button>
    </div>
    <div class="tree-content">
      <el-checkbox-group v-model="dataAuthorityId" @change="selectAuthority">
        <el-checkbox v-for="(item,key) in authoritys" :key="key" :label="item">{{ item.authorityName }}</el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Datas'
}
</script>

<script setup>
import { setDataAuthority } from '@/api/authority'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  row: {
    default: function() {
      return {}
    },
    type: Object
  },
  authority: {
    default: function() {
      return []
    },
    type: Array
  }
})

const authoritys = ref([])
const needConfirm = ref(false)
//    píng pù jiǎo sè
const roundAuthority = (authoritysData) => {
  authoritysData && authoritysData.forEach(item => {
    const obj = {}
    obj.authorityId = item.authorityId
    obj.authorityName = item.authorityName
    authoritys.value.push(obj)
    if (item.children && item.children.length) {
      roundAuthority(item.children)
    }
  })
}

const dataAuthorityId = ref([])
const init = () => {
  roundAuthority(props.authority)
  props.row.dataAuthorityId && props.row.dataAuthorityId.forEach(item => {
    const obj = authoritys.value && authoritys.value.filter(au => au.authorityId === item.authorityId) && authoritys.value.filter(au => au.authorityId === item.authorityId)[0]
    dataAuthorityId.value.push(obj)
  })
}

init()

//  bào lù gěi wài céng shǐ yòng de qiè huàn lán jié tǒng yī fāng fǎ
const enterAndNext = () => {
  authDataEnter()
}

const emit = defineEmits(['changeRow'])
const all = () => {
  dataAuthorityId.value = [...authoritys.value]
  emit('changeRow', 'dataAuthorityId', dataAuthorityId.value)
  needConfirm.value = true
}
const self = () => {
  dataAuthorityId.value = authoritys.value.filter(item => item.authorityId === props.row.authorityId)
  emit('changeRow', 'dataAuthorityId', dataAuthorityId.value)
  needConfirm.value = true
}
const selfAndChildren = () => {
  const arrBox = []
  getChildrenId(props.row, arrBox)
  dataAuthorityId.value = authoritys.value.filter(item => arrBox.indexOf(item.authorityId) > -1)
  emit('changeRow', 'dataAuthorityId', dataAuthorityId.value)
  needConfirm.value = true
}
const getChildrenId = (row, arrBox) => {
  arrBox.push(row.authorityId)
  row.children && row.children.forEach(item => {
    getChildrenId(item, arrBox)
  })
}
//  tí jiāo
const authDataEnter = async() => {
  const res = await setDataAuthority(props.row)
  if (res.code === 0) {
    ElMessage({ type: 'success', message: ' zī yuán shè zhì chéng gōng' })
  }
}

//    xuǎn zé
const selectAuthority = () => {
  emit('changeRow', 'dataAuthorityId', dataAuthorityId.value)
  needConfirm.value = true
}

defineExpose({
  enterAndNext,
  needConfirm
})

</script>
