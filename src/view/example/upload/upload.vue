<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
    <div class="gva-table-box">
      <warning-bar
        title=" diǎn jī“ wén jiàn míng/ bèi zhù” kě yǐ biān jí wén jiàn míng huò zhě bèi zhù nèi róng。"
      />
      <div class="gva-btn-list">
        <upload-common
          v-model:imageCommon="imageCommon"
          class="upload-btn"
          @on-success="getTableData"
        />
        <upload-image
          v-model:imageUrl="imageUrl"
          :file-size="512"
          :max-w-h="1080"
          class="upload-btn"
          @on-success="getTableData"
        />

        <el-form ref="searchForm" :inline="true" :model="search">
          <el-form-item label="">
            <el-input v-model="search.keyword" class="keyword" placeholder=" qǐng shū rù wén jiàn míng huò bèi zhù" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="search" @click="getTableData"> chá xún</el-button>
          </el-form-item>
        </el-form>

      </div>

      <el-table :data="tableData">
        <el-table-column align="left" label=" yù lǎn" width="100">
          <template #default="scope">
            <CustomPic pic-type="file" :pic-src="scope.row.url" />
          </template>
        </el-table-column>
        <el-table-column align="left" label=" rì qī" prop="UpdatedAt" width="180">
          <template #default="scope">
            <div>{{ formatDate(scope.row.UpdatedAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" wén jiàn míng/ bèi zhù" prop="name" width="180">
          <template #default="scope">
            <div class="name" @click="editFileNameFunc(scope.row)">{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" liàn jiē" prop="url" min-width="300" />
        <el-table-column align="left" label=" biāo qiān" prop="tag" width="100">
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'jpg' ? 'primary' : 'success'"
              disable-transitions
            >{{ scope.row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" cāo zuò" width="160">
          <template #default="scope">
            <el-button icon="download" type="primary" link @click="downloadFile(scope.row)"> xià zài</el-button>
            <el-button icon="delete" type="primary" link @click="deleteFileFunc(scope.row)"> shān chú</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :style="{ float: 'right', padding: '20px' }"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFileList, deleteFile, editFileName } from '@/api/fileUploadAndDownload'
import { downloadImage } from '@/utils/downloadImg'
import CustomPic from '@/components/customPic/index.vue'
import UploadImage from '@/components/upload/image.vue'
import UploadCommon from '@/components/upload/common.vue'
import { formatDate } from '@/utils/format'
import WarningBar from '@/components/warningBar/warningBar.vue'

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const path = ref(import.meta.env.VITE_BASE_API)

const imageUrl = ref('')
const imageCommon = ref('')

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const search = ref({})
const tableData = ref([])

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
  const table = await getFileList({ page: page.value, pageSize: pageSize.value, ...search.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}
getTableData()

const deleteFileFunc = async(row) => {
  ElMessageBox.confirm(' cǐ cāo zuò jiāng yǒng jiǔ shān chú wén jiàn,  shì fǒu jì xù?', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning',
  })
    .then(async() => {
      const res = await deleteFile(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: ' shān chú chéng gōng!',
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
        message: ' yǐ qǔ xiāo shān chú',
      })
    })
}

const downloadFile = (row) => {
  if (row.url.indexOf('http://') > -1 || row.url.indexOf('https://') > -1) {
    downloadImage(row.url, row.name)
  } else {
    debugger
    downloadImage(path.value + '/' + row.url, row.name)
  }
}

/**
 *  biān jí wén jiàn míng huò zhě bèi zhù
 * @param row
 * @returns {Promise<void>}
 */
const editFileNameFunc = async(row) => {
  ElMessageBox.prompt(' qǐng shū rù wén jiàn míng huò zhě bèi zhù', ' biān jí', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    inputPattern: /\S/,
    inputErrorMessage: ' bù néng wèi kōng',
    inputValue: row.name
  }).then(async({ value }) => {
    row.name = value
    // console.log(row)
    const res = await editFileName(row)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: ' biān jí chéng gōng!',
      })
      getTableData()
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: ' qǔ xiāo xiū gǎi'
    })
  })
}
</script>

<script>

export default {
  name: 'Upload',
}
</script>
<style scoped>
.name {
  cursor: pointer;
}

.upload-btn + .upload-btn {
  margin-left: 12px;
}
</style>
