<template>
  <div class="gva-plugin-pub">
    <WarningBar title=" mù qián zhǐ zhī chí biāo zhǔn chā jiàn（ tōng guò chā jiàn mó bǎn shēng chéng de biāo zhǔn mù lù chā jiàn）， fēi biāo zhǔn chā jiàn qǐng zì xíng dǎ bāo" />
    <div class="plugin-pub-btn-list">
      <el-input v-model="plugName" placeholder=" chā jiàn mó bǎn chù tián xiě de【 chā jiàn míng】" />
      <el-button type="primary" @click="pubPlugin"> dǎ bāo chā jiàn</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { pubPlug } from '@/api/autoCode.js'
import { ElMessage } from 'element-plus'
const plugName = ref('')

const pubPlugin = async() => {
  const res = await pubPlug({ plugName: plugName.value })
  if (res.code === 0) {
    ElMessage.success(res.msg)
  }
}

</script>

<style lang="scss" scope>
.gva-plugin-pub {
  background-color: white;
  padding: 20px;
}
.plugin-pub-btn-list{
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
