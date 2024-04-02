<template>
  <div>
    <warning-bar href="https://www.bilibili.com/video/BV1kv4y1g7nT?p=3" title=" cǐ gōng néng wèi kāi fā huán jìng shǐ yòng， bù jiàn yì fā bù dào shēng chǎn， jù tǐ shǐ yòng xiào guǒ qǐng kàn shì pínhttps://www.bilibili.com/video/BV1kv4y1g7nT?p=3" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog('addApi')"> xīn zēng</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column align="left" label="id" width="60" prop="ID" />
        <el-table-column align="left" label=" bāo míng" width="150" prop="packageName" />
        <el-table-column align="left" label=" zhǎn shì míng" width="150" prop="label" />
        <el-table-column align="left" label=" miáo shù" min-width="150" prop="desc" />

        <el-table-column align="left" label=" cāo zuò" width="200">
          <template #default="scope">
            <el-button
              icon="delete"

              type="primary"
              link
              @click="deleteApiFunc(scope.row)"
            > shān chú</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>

    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title=" chuàng jiànPackage">
      <warning-bar title=" xīn zēngPkg yòng yú zì dòng huà dài mǎ shǐ yòng" />
      <el-form ref="pkgForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label=" bāo míng" prop="packageName">
          <el-input v-model="form.packageName" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" zhǎn shì míng" prop="label">
          <el-input v-model="form.label" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" miáo shù" prop="desc">
          <el-input v-model="form.desc" autocomplete="off" />
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
  name: 'AutoPkg',
}
</script>

<script setup>
import {
  createPackageApi,
  getPackageApi,
  deletePackageApi,
} from '@/api/autoCode'
import { ref } from 'vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const form = ref({
  packageName: '',
  label: '',
  desc: '',
})

const validateNum = (rule, value, callback) => {
  if ((/^\d+$/.test(value[0]))) {
    callback(new Error(' bù néng gòu yǐ shù zì kāi tóu'))
  } else {
    callback()
  }
}

const rules = ref({
  packageName: [
    { required: true, message: ' qǐng shū rù bāo míng', trigger: 'blur' },
    { validator: validateNum, trigger: 'blur' }
  ],
})

const dialogFormVisible = ref(false)
const openDialog = () => {
  dialogFormVisible.value = true
}

const closeDialog = () => {
  dialogFormVisible.value = false
  form.value = {
    packageName: '',
    label: '',
    desc: '',
  }
}

const pkgForm = ref(null)
const enterDialog = async() => {
  pkgForm.value.validate(async valid => {
    if (valid) {
      const res = await createPackageApi(form.value)
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
  })
}

const tableData = ref([])
const getTableData = async() => {
  const table = await getPackageApi()
  if (table.code === 0) {
    tableData.value = table.data.pkgs
  }
}

const deleteApiFunc = async(row) => {
  ElMessageBox.confirm(' cǐ cāo zuò jǐn shān chú shù jù kù zhōng depkg cún chǔ， hòu duān xiāng yīng mù lù jié gòu qǐng zì xíng shān chú yǔ shù jù kù bǎo chí yī zhì！', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning'
  })
    .then(async() => {
      const res = await deletePackageApi(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: ' shān chú chéng gōng!'
        })
        getTableData()
      }
    })
}

getTableData()
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
