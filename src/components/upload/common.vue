<template>
  <div>
    <el-upload
      :action="`${path}/fileUploadAndDownload/upload`"
      :before-upload="checkFile"
      :headers="{ 'x-token': userStore.token }"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :show-file-list="false"
      class="upload-btn"
    >
      <el-button type="primary"> pǔ tōng shàng chuán</el-button>
    </el-upload>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'

const emit = defineEmits(['on-success'])
const path = ref(import.meta.env.VITE_BASE_API)

const userStore = useUserStore()
const fullscreenLoading = ref(false)

const checkFile = (file) => {
  fullscreenLoading.value = true
  const isJPG = file.type === 'image/jpeg'
  const isPng = file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 0.5
  if (!isJPG && !isPng) {
    ElMessage.error(' shàng chuán tú piàn zhǐ néng shì jpg huòpng  gé shì!')
    fullscreenLoading.value = false
  }
  if (!isLt2M) {
    ElMessage.error(' wèi yā suō de shàng chuán tú piàn dà xiǎo bù néng chāo guò 500KB， qǐng shǐ yòng yā suō shàng chuán')
    fullscreenLoading.value = false
  }
  return (isPng || isJPG) && isLt2M
}

const uploadSuccess = (res) => {
  const { data } = res
  if (data.file) {
    emit('on-success', data.file.url)
  }
}

const uploadError = () => {
  ElMessage({
    type: 'error',
    message: ' shàng chuán shī bài'
  })
  fullscreenLoading.value = false
}

</script>

<script>

export default {
  name: 'UploadCommon',
  methods: {

  }
}
</script>
