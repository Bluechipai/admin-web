<template>
  <div>
    <warning-bar title=" xū yào tí qián pèi zhìemail pèi zhì wén jiàn， wèi fáng zhǐ bù bì yào de lā jī yóu jiàn， zài xiàn tǐ yàn gōng néng bù kāi fàng cǐ gōng néng tǐ yàn。" />
    <div class="gva-form-box">
      <el-form ref="emailForm" label-position="right" label-width="80px" :model="form">
        <el-form-item label=" mù biāo yóu xiāng">
          <el-input v-model="form.to" />
        </el-form-item>
        <el-form-item label=" yóu jiàn">
          <el-input v-model="form.subject" />
        </el-form-item>
        <el-form-item label=" yóu jiàn nèi róng">
          <el-input v-model="form.body" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button @click="sendTestEmail"> fā sòng cè shì yóu jiàn</el-button>
          <el-button @click="sendEmail"> fā sòng yóu jiàn</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Email',
}
</script>

<script setup>
import WarningBar from '@/components/warningBar/warningBar.vue'
import { emailTest } from '@/plugin/email/api/email.js'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
const emailForm = ref(null)
const form = reactive({
  to: '',
  subject: '',
  body: '',
})
const sendTestEmail = async() => {
  const res = await emailTest()
  if (res.code === 0) {
    ElMessage.success(' fā sòng chéng gōng')
  }
}

const sendEmail = async() => {
  const res = await emailTest()
  if (res.code === 0) {
    ElMessage.success(' fā sòng chéng gōng, qǐng chá shōu')
  }
}
</script>

