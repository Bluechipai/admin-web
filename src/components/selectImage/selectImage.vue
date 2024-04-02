<template>
  <div
    class="update-image"
    :style="{
      'background-image': `url(${getUrl(modelValue)})`,
    }"
  >
    <span class="update" @click="openChooseImg">
      <el-icon>
        <edit />
      </el-icon>
       zhòng xīn shàng chuán</span>
  </div>

  <el-drawer v-model="drawer" title=" méi tǐ kù" size="650px">
    <warning-bar
      title=" diǎn jī“ wén jiàn míng/ bèi zhù” kě yǐ biān jí wén jiàn míng huò zhě bèi zhù nèi róng。"
    />
    <div class="gva-btn-list">
      <upload-common
        v-model:imageCommon="imageCommon"
        class="upload-btn-media-library"
        @on-success="getImageList"
      />
      <upload-image
        v-model:imageUrl="imageUrl"
        :file-size="512"
        :max-w-h="1080"
        class="upload-btn-media-library"
        @on-success="getImageList"
      />
      <el-form ref="searchForm" :inline="true" :model="search">
        <el-form-item label="">
          <el-input v-model="search.keyword" class="keyword" placeholder=" qǐng shū rù wén jiàn míng huò bèi zhù" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" @click="getImageList"> chá xún</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="media">
      <div v-for="(item,key) in picList" :key="key" class="media-box">
        <div class="header-img-box-list">
          <el-image
            :key="key"
            :src="getUrl(item.url)"
            @click="chooseImg(item.url)"
          >
            <template #error>
              <div class="header-img-box-list">
                <el-icon>
                  <picture />
                </el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="img-title" @click="editFileNameFunc(item)">{{ item.name }}</div>
      </div>
    </div>
    <el-pagination
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      :style="{'justify-content':'center'}"
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </el-drawer>
</template>

<script setup>

import { getUrl } from '@/utils/image'
import { ref } from 'vue'
import { getFileList, editFileName } from '@/api/fileUploadAndDownload'
import UploadImage from '@/components/upload/image.vue'
import UploadCommon from '@/components/upload/common.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const imageUrl = ref('')
const imageCommon = ref('')

const search = ref({})
const page = ref(1)
const total = ref(0)
const pageSize = ref(20)

defineProps({
  modelValue: {
    type: String,
    default: ''
  },
})

const emits = defineEmits(['update:modelValue'])

//  fēn yè
const handleSizeChange = (val) => {
  pageSize.value = val
  getImageList()
}

const handleCurrentChange = (val) => {
  page.value = val
  getImageList()
}
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
      getImageList()
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: ' qǔ xiāo xiū gǎi'
    })
  })
}

const drawer = ref(false)
const picList = ref([])

const chooseImg = (url) => {
  emits('update:modelValue', url)
  drawer.value = false
}
const openChooseImg = async() => {
  await getImageList()
  drawer.value = true
}

const getImageList = async() => {
  const res = await getFileList({ page: page.value, pageSize: pageSize.value, ...search.value })
  if (res.code === 0) {
    picList.value = res.data.list
    total.value = res.data.total
    page.value = res.data.page
    pageSize.value = res.data.pageSize
  }
}

</script>

<style scoped lang="scss">
.update-image {
  width: 120px;
  height: 120px;
  line-height: 120px;
  display: flex;
  justify-content: center;
  border-radius: 20px;
  border: 1px dashed #ccc;
   background-repeat: no-repeat;
   background-size: cover;
  &:hover {
    color: #fff;

    background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(0, 0, 0, 0.15) 100%
    ),
    radial-gradient(
            at top center,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(0, 0, 0, 0.4) 120%
    )
    #989898;
    background-blend-mode: multiply, multiply;
    background-size: cover;
    .update {
      color: #fff;
    }
  }
  .update {
    height: 120px;
    width: 120px;
    text-align: center;
    color: transparent;
  }
}

.upload-btn-media-library {
  margin-left: 20px;
}

.media {
  display: flex;
  flex-wrap: wrap;

  .media-box {
    width: 120px;
    margin-left: 20px;

    .img-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
    }

    .header-img-box-list {
      width: 120px;
      height: 120px;
      border: 1px dashed #ccc;
      border-radius: 8px;
      text-align: center;
      line-height: 120px;
      cursor: pointer;
      overflow: hidden;
      .el-image__inner {
        max-width: 120px;
        max-height: 120px;
        vertical-align: middle;
        width: unset;
        height: unset;
      }
    }
  }
}
</style>
