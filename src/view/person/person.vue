<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div class="fl-left avatar-box">
          <div class="user-card">
            <SelectImage v-model="userStore.userInfo.headerImg" />
            <div class="user-personality">
              <p v-if="!editFlag" class="nickName">
                {{ userStore.userInfo.nickName }}
                <el-icon class="pointer" color="#66b1ff" @click="openEdit">
                  <edit />
                </el-icon>
              </p>
              <p v-if="editFlag" class="nickName">
                <el-input v-model="nickName" />
                <el-icon class="pointer" color="#67c23a" @click="enterEdit">
                  <check />
                </el-icon>
                <el-icon class="pointer" color="#f23c3c" @click="closeEdit">
                  <close />
                </el-icon>
              </p>
              <p class="person-info"> zhè gè jiā huǒ hěn lǎn， shén me dōu méi yǒu liú xià</p>
            </div>
            <div class="user-information">
              <ul>
                <li>
                  <el-icon>
                    <user />
                  </el-icon>
                  {{ userStore.userInfo.nickName }}
                </li>
                <el-tooltip
                  class="item"
                  effect="light"
                  content=" běi jīng fǎn zhuǎn jí guāng kē jì yǒu xiàn gōng sī- jì shù bù- qián duān shì yè qún"
                  placement="top"
                >
                  <li>
                    <el-icon>
                      <data-analysis />
                    </el-icon>
                     běi jīng fǎn zhuǎn jí guāng kē jì yǒu xiàn gōng sī- jì shù bù- qián duān shì yè qún
                  </li>
                </el-tooltip>
                <li>
                  <el-icon>
                    <video-camera />
                  </el-icon>
                   zhōng guó· běi jīng shì· cháo yáng qū
                </li>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="GoLang/JavaScript/Vue/Gorm"
                  placement="top"
                >
                  <li>
                    <el-icon>
                      <medal />
                    </el-icon>
                    GoLang/JavaScript/Vue/Gorm
                  </li>
                </el-tooltip>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="user-addcount">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label=" zhàng hào bǎng dìng" name="second">
              <ul>
                <li>
                  <p class="title"> mì bǎo shǒu jī</p>
                  <p class="desc">
                     yǐ bǎng dìng shǒu jī:{{ userStore.userInfo.phone }}
                    <a href="javascript:void(0)" @click="changePhoneFlag = true"> lì jí xiū gǎi</a>
                  </p>
                </li>
                <li>
                  <p class="title"> mì bǎo yóu xiāng</p>
                  <p class="desc">
                     yǐ bǎng dìng yóu xiāng：{{ userStore.userInfo.email }}
                    <a href="javascript:void(0)" @click="changeEmailFlag = true"> lì jí xiū gǎi</a>
                  </p>
                </li>
                <li>
                  <p class="title"> mì bǎo wèn tí</p>
                  <p class="desc">
                     wèi shè zhì mì bǎo wèn tí
                    <a href="javascript:void(0)"> qù shè zhì</a>
                  </p>
                </li>
                <li>
                  <p class="title"> xiū gǎi mì mǎ</p>
                  <p class="desc">
                     xiū gǎi gè rén mì mǎ
                    <a
                      href="javascript:void(0)"
                      @click="showPassword = true"
                    > xiū gǎi mì mǎ</a>
                  </p>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <el-dialog
      v-model="showPassword"
      title=" xiū gǎi mì mǎ"
      width="360px"
      @close="clearPassword"
    >
      <el-form
        ref="modifyPwdForm"
        :model="pwdModify"
        :rules="rules"
        label-width="80px"
      >
        <el-form-item :minlength="6" label=" yuán mì mǎ" prop="password">
          <el-input v-model="pwdModify.password" show-password />
        </el-form-item>
        <el-form-item :minlength="6" label=" xīn mì mǎ" prop="newPassword">
          <el-input v-model="pwdModify.newPassword" show-password />
        </el-form-item>
        <el-form-item :minlength="6" label=" què rèn mì mǎ" prop="confirmPassword">
          <el-input v-model="pwdModify.confirmPassword" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button

            @click="showPassword = false"
          > qǔ  xiāo</el-button>
          <el-button

            type="primary"
            @click="savePassword"
          > què  dìng</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="changePhoneFlag" title=" bǎng dìng shǒu jī" width="600px">
      <el-form :model="phoneForm">
        <el-form-item label=" shǒu jī hào" label-width="120px">
          <el-input v-model="phoneForm.phone" placeholder=" qǐng shū rù shǒu jī hào" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" yàn zhèng mǎ" label-width="120px">
          <div class="code-box">
            <el-input v-model="phoneForm.code" autocomplete="off" placeholder=" qǐng zì xíng shè jì duǎn xìn fú wù， cǐ chù wèi mó nǐ suí biàn xiě" style="width:300px" />
            <el-button type="primary" :disabled="time>0" @click="getCode">{{ time>0?`(${time}s) hòu zhòng xīn huò qǔ`:' huò qǔ yàn zhèng mǎ' }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button

            @click="closeChangePhone"
          > qǔ xiāo</el-button>
          <el-button
            type="primary"

            @click="changePhone"
          > gèng gǎi</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="changeEmailFlag" title=" bǎng dìng yóu xiāng" width="600px">
      <el-form :model="emailForm">
        <el-form-item label=" yóu xiāng" label-width="120px">
          <el-input v-model="emailForm.email" placeholder=" qǐng shū rù yóu xiāng" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" yàn zhèng mǎ" label-width="120px">
          <div class="code-box">
            <el-input v-model="emailForm.code" placeholder=" qǐng zì xíng shè jì yóu jiàn fú wù， cǐ chù wèi mó nǐ suí biàn xiě" autocomplete="off" style="width:300px" />
            <el-button type="primary" :disabled="emailTime>0" @click="getEmailCode">{{ emailTime>0?`(${emailTime}s) hòu zhòng xīn huò qǔ`:' huò qǔ yàn zhèng mǎ' }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button

            @click="closeChangeEmail"
          > qǔ xiāo</el-button>
          <el-button
            type="primary"

            @click="changeEmail"
          > gèng gǎi</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Person',
}
</script>

<script setup>
import { setSelfInfo, changePassword } from '@/api/user.js'
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/pinia/modules/user'
import SelectImage from '@/components/selectImage/selectImage.vue'

const activeName = ref('second')
const rules = reactive({
  password: [
    { required: true, message: ' qǐng shū rù mì mǎ', trigger: 'blur' },
    { min: 6, message: ' zuì shǎo6 gè zì fú', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: ' qǐng shū rù xīn mì mǎ', trigger: 'blur' },
    { min: 6, message: ' zuì shǎo6 gè zì fú', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: ' qǐng shū rù què rèn mì mǎ', trigger: 'blur' },
    { min: 6, message: ' zuì shǎo6 gè zì fú', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== pwdModify.value.newPassword) {
          callback(new Error(' liǎng cì mì mǎ bù yī zhì'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

const userStore = useUserStore()
const modifyPwdForm = ref(null)
const showPassword = ref(false)
const pwdModify = ref({})
const nickName = ref('')
const editFlag = ref(false)
const savePassword = async() => {
  modifyPwdForm.value.validate((valid) => {
    if (valid) {
      changePassword({
        password: pwdModify.value.password,
        newPassword: pwdModify.value.newPassword,
      }).then((res) => {
        if (res.code === 0) {
          ElMessage.success(' xiū gǎi mì mǎ chéng gōng！')
        }
        showPassword.value = false
      })
    } else {
      return false
    }
  })
}

const clearPassword = () => {
  pwdModify.value = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  }
  modifyPwdForm.value.clearValidate()
}

watch(() => userStore.userInfo.headerImg, async(val) => {
  const res = await setSelfInfo({ headerImg: val })
  if (res.code === 0) {
    userStore.ResetUserInfo({ headerImg: val })
    ElMessage({
      type: 'success',
      message: ' shè zhì chéng gōng',
    })
  }
})

const openEdit = () => {
  nickName.value = userStore.userInfo.nickName
  editFlag.value = true
}

const closeEdit = () => {
  nickName.value = ''
  editFlag.value = false
}

const enterEdit = async() => {
  const res = await setSelfInfo({
    nickName: nickName.value
  })
  if (res.code === 0) {
    userStore.ResetUserInfo({ nickName: nickName.value })
    ElMessage({
      type: 'success',
      message: ' shè zhì chéng gōng',
    })
  }
  nickName.value = ''
  editFlag.value = false
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const changePhoneFlag = ref(false)
const time = ref(0)
const phoneForm = reactive({
  phone: '',
  code: ''
})

const getCode = async() => {
  time.value = 60
  let timer = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

const closeChangePhone = () => {
  changePhoneFlag.value = false
  phoneForm.phone = ''
  phoneForm.code = ''
}

const changePhone = async() => {
  const res = await setSelfInfo({ phone: phoneForm.phone })
  if (res.code === 0) {
    ElMessage.success(' xiū gǎi chéng gōng')
    userStore.ResetUserInfo({ phone: phoneForm.phone })
    closeChangePhone()
  }
}

const changeEmailFlag = ref(false)
const emailTime = ref(0)
const emailForm = reactive({
  email: '',
  code: ''
})

const getEmailCode = async() => {
  emailTime.value = 60
  let timer = setInterval(() => {
    emailTime.value--
    if (emailTime.value <= 0) {
      clearInterval(timer)
      timer = null
    }
  }, 1000)
}

const closeChangeEmail = () => {
  changeEmailFlag.value = false
  emailForm.email = ''
  emailForm.code = ''
}

const changeEmail = async() => {
  const res = await setSelfInfo({ email: emailForm.email })
  if (res.code === 0) {
    ElMessage.success(' xiū gǎi chéng gōng')
    userStore.ResetUserInfo({ email: emailForm.email })
    closeChangeEmail()
  }
}

</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-box {
  box-shadow: -2px 0 20px -16px;
  width: 80%;
  height: 100%;
  .user-card {
    min-height: calc(90vh - 200px);
    padding: 30px 20px;
    text-align: center;
    background-color: #fff;
    border-radius: 8px;
    flex-shrink: 0;
    .el-avatar {
      border-radius: 50%;
    }
    .user-personality {
      padding: 24px 0;
      text-align: center;
      p {
        font-size: 16px;
      }
      .nickName {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
      }
      .person-info {
        margin-top: 6px;
        font-size: 14px;
        color: #999;
      }
    }
    .user-information {
      width: 100%;
      height: 100%;
      text-align: left;
      ul {
        display: inline-block;
        height: 100%;
        width: 100%;
        li {
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          i {
            margin-right: 8px;
          }
          padding: 20px 0;
          font-size: 16px;
          font-weight: 400;
          color: #606266;
        }
      }
    }
  }
}
.user-addcount {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  ul {
    li {
      .title {
        padding: 10px;
        font-size: 18px;
        color: #696969;
      }
      .desc {
        font-size: 16px;
        padding: 0 10px 20px 10px;
        color: #a9a9a9;
        a {
          color: rgb(64, 158, 255);
          float: right;
        }
      }
      border-bottom: 2px solid #f0f2f5;
      &:last-child{
        border-bottom: none;
      }
    }
  }
}
.user-headpic-update {
  width: 120px;
  height: 120px;
  line-height: 120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border-radius: 20px;
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
.pointer {
  cursor: pointer;
}
.code-box{
  display: flex;
  justify-content: space-between;
}
</style>
