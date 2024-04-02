<template>
  <div>
    <div class="clearfix sticky-button">
      <el-input v-model="filterText" class="fitler" placeholder=" shāi xuǎn" />
      <el-button class="fl-right" type="primary" @click="relation"> què  dìng</el-button>
    </div>
    <div class="tree-content">
      <el-tree
        ref="menuTree"
        :data="menuTreeData"
        :default-checked-keys="menuTreeIds"
        :props="menuDefaultProps"
        default-expand-all
        highlight-current
        node-key="ID"
        show-checkbox
        :filter-node-method="filterNode"
        @check="nodeChange"
      >
        <template #default="{ node , data }">
          <span class="custom-tree-node">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="primary"
                link

                :style="{color:row.defaultRouter === data.name?'#E6A23C':'#85ce61'}"
                :disabled="!node.checked"
                @click="() => setDefault(data)"
              >
                {{ row.defaultRouter === data.name?" shǒu yè":" shè wèi shǒu yè" }}
              </el-button>
            </span>
            <span v-if="data.menuBtn.length">
              <el-button
                type="primary"
                link

                @click="() => OpenBtn(data)"
              >
                 fēn pèi àn niǔ
              </el-button>
            </span>
          </span>
        </template>
      </el-tree>
    </div>
    <el-dialog v-model="btnVisible" title=" fēn pèi àn niǔ" destroy-on-close>
      <el-table
        ref="btnTableRef"
        :data="btnData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label=" àn niǔ míng chēng" prop="name" />
        <el-table-column label=" àn niǔ bèi zhù" prop="desc" />
      </el-table>
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
import { getBaseMenuTree, getMenuAuthority, addMenuAuthority } from '@/api/menu'
import {
  updateAuthority
} from '@/api/authority'
import { getAuthorityBtnApi, setAuthorityBtnApi } from '@/api/authorityBtn'
import { nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  row: {
    default: function() {
      return {}
    },
    type: Object
  }
})

const emit = defineEmits(['changeRow'])
const filterText = ref('')
const menuTreeData = ref([])
const menuTreeIds = ref([])
const needConfirm = ref(false)
const menuDefaultProps = ref({
  children: 'children',
  label: function(data) {
    return data.meta.title
  }
})

const init = async() => {
  //  huò qǔ suǒ yǒu cài dān shù
  const res = await getBaseMenuTree()
  menuTreeData.value = res.data.menus
  const res1 = await getMenuAuthority({ authorityId: props.row.authorityId })
  const menus = res1.data.menus
  const arr = []
  menus.forEach(item => {
    //  fáng zhǐ zhí jiē xuǎn zhōng fù jí zào chéng quán xuǎn
    if (!menus.some(same => same.parentId === item.menuId)) {
      arr.push(Number(item.menuId))
    }
  })
  menuTreeIds.value = arr
}

init()

const setDefault = async(data) => {
  const res = await updateAuthority({ authorityId: props.row.authorityId, AuthorityName: props.row.authorityName, parentId: props.row.parentId, defaultRouter: data.name })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: ' shè zhì chéng gōng' })
    emit('changeRow', 'defaultRouter', res.data.authority.defaultRouter)
  }
}
const nodeChange = () => {
  needConfirm.value = true
}
//  bào lù gěi wài céng shǐ yòng de qiè huàn lán jié tǒng yī fāng fǎ
const enterAndNext = () => {
  relation()
}
//  guān lián shù  què rèn fāng fǎ
const menuTree = ref(null)
const relation = async() => {
  const checkArr = menuTree.value.getCheckedNodes(false, true)
  const res = await addMenuAuthority({
    menus: checkArr,
    authorityId: props.row.authorityId
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' cài dān shè zhì chéng gōng!'
    })
  }
}

defineExpose({ enterAndNext, needConfirm })

const btnVisible = ref(false)

const btnData = ref([])
const multipleSelection = ref([])
const btnTableRef = ref()
let menuID = ''
const OpenBtn = async(data) => {
  menuID = data.ID
  const res = await getAuthorityBtnApi({ menuID: menuID, authorityId: props.row.authorityId })
  if (res.code === 0) {
    openDialog(data)
    await nextTick()
    if (res.data.selected) {
      res.data.selected.forEach(id => {
        btnData.value.some(item => {
          if (item.ID === id) {
            btnTableRef.value.toggleRowSelection(item, true)
          }
        })
      })
    }
  }
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

const openDialog = (data) => {
  btnVisible.value = true
  btnData.value = data.menuBtn
}

const closeDialog = () => {
  btnVisible.value = false
}
const enterDialog = async() => {
  const selected = multipleSelection.value.map(item => item.ID)
  const res = await setAuthorityBtnApi({
    menuID,
    selected,
    authorityId: props.row.authorityId
  })
  if (res.code === 0) {
    ElMessage({ type: 'success', message: ' shè zhì chéng gōng' })
    btnVisible.value = false
  }
}

const filterNode = (value, data) => {
  if (!value) return true
  // console.log(data.mate.title)
  return data.meta.title.indexOf(value) !== -1
}

watch(filterText, (val) => {
  menuTree.value.filter(val)
})

</script>

<script>

export default {
  name: 'Menus'
}
</script>

<style lang="scss" scoped>
@import "@/style/button.scss";
.custom-tree-node{
  span+span{
    margin-left: 12px;
  }
}
</style>
