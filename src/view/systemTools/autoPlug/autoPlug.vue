<template>
  <div>
    <div class="gva-table-box">
      <el-form label-width="140px" class="plug-form">
        <el-form-item label=" chā jiàn míng">
          <el-input v-model="form.plugName" placeholder=" bì tián（ yīng wén dà xiě zì mǔ kāi tóu）" @blur="titleCase" />
        </el-form-item>
        <el-form-item label=" lù yóu zǔ">
          <el-input v-model="form.routerGroup" placeholder=" jiāng huì zuò wèi chā jiàn lù yóu zǔ shǐ yòng" />
        </el-form-item>
        <el-form-item label=" shǐ yòng quán jú shǔ xìng">
          <el-checkbox v-model="form.hasGlobal" />
        </el-form-item>
        <el-form-item v-if="form.hasGlobal" label=" quán jú shǔ xìng">
          <div v-for="(i,k) in form.global" :key="k" class="plug-row">
            <span>
              <el-input v-model="i.key" placeholder="key  bì tián" />
            </span>
            <span>
              <el-select v-model="i.type" placeholder="type  bì tián">
                <el-option label="string" value="string" />
                <el-option label="int" value="int" />
                <el-option label="float32" value="float32" />
                <el-option label="float64" value="float64" />
                <el-option label="bool" value="bool" />
              </el-select>
            </span>
            <span>
              <el-input v-model="i.desc" placeholder=" bèi zhù  bì tián" />
            </span>
            <span>
              <el-button :icon="Plus" circle @click="addkv(form.global)" />
            </span>
            <span>
              <el-button :icon="Minus" circle @click="minkv(form.global,k)" />
            </span>
          </div>
        </el-form-item>
        <el-form-item label=" shǐ yòngRequest">
          <el-checkbox v-model="form.hasRequest" />
        </el-form-item>
        <el-form-item v-if="form.hasRequest" label="Request">
          <div v-for="(i,k) in form.request" :key="k" class="plug-row">
            <span>
              <el-input v-model="i.key" placeholder="key  bì tián" />
            </span>
            <span>
              <el-select v-model="i.type" placeholder="type  bì tián">
                <el-option label="string" value="string" />
                <el-option label="int" value="int" />
                <el-option label="float32" value="float32" />
                <el-option label="float64" value="float64" />
                <el-option label="bool" value="bool" />
              </el-select>
            </span>
            <span>
              <el-input v-model="i.desc" placeholder=" bèi zhù  bì tián" />
            </span>
            <span>
              <el-button :icon="Plus" circle @click="addkv(form.request)" />
            </span>
            <span>
              <el-button :icon="Minus" circle @click="minkv(form.request,k)" />
            </span>
          </div>
        </el-form-item>
        <el-form-item label=" shǐ yòngResponse">
          <el-checkbox v-model="form.hasResponse" />
        </el-form-item>
        <el-form-item v-if="form.hasResponse" label="Response">
          <div v-for="(i,k) in form.response" :key="k" class="plug-row">
            <span>
              <el-input v-model="i.key" placeholder="key  bì tián" />
            </span>
            <span>
              <el-select v-model="i.type" placeholder="type  bì tián">
                <el-option label="string" value="string" />
                <el-option label="int" value="int" />
                <el-option label="float32" value="float32" />
                <el-option label="float64" value="float64" />
                <el-option label="bool" value="bool" />
              </el-select>
            </span>
            <span>
              <el-input v-model="i.desc" placeholder=" bèi zhù  bì tián" />
            </span>
            <span>
              <el-button :icon="Plus" circle @click="addkv(form.response)" />
            </span>
            <span>
              <el-button :icon="Minus" circle @click="minkv(form.response,k)" />
            </span>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createPlug"> chuàng jiàn</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script setup>
import { toUpperCase } from '@/utils/stringFun'

import {
  Plus,
  Minus
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import { createPlugApi } from '@/api/autoCode.js'

import { reactive } from 'vue'

const form = reactive({
  plugName: '',
  routerGroup: '',
  hasGlobal: true,
  hasRequest: true,
  hasResponse: true,
  global: [{
    key: '',
    type: '',
    desc: '',
  }],
  request: [{
    key: '',
    type: '',
    desc: '',
  }],
  response: [{
    key: '',
    type: '',
    desc: '',
  }]
})

const titleCase = () => {
  form.plugName = toUpperCase(form.plugName)
}

const createPlug = async() => {
  if (!form.plugName || !form.routerGroup) {
    ElMessage.error(' chā jiàn míng chēng hé chā jiàn lù yóu zǔ wèi bì tián xiàng')
    return
  }
  if (form.hasGlobal) {
    const intercept = form.global.some(i => {
      if (!i.key || !i.type) {
        return true
      }
    })
    if (intercept) {
      ElMessage.error(' quán jú shǔ xìng dekey hétype wèi bì tián xiàng')
      return
    }
  }
  if (form.hasRequest) {
    const intercept = form.request.some(i => {
      if (!i.key || !i.type) {
        return true
      }
    })
    if (intercept) {
      ElMessage.error(' qǐng qiú shǔ xìng dekey hétype wèi bì tián xiàng')
      return
    }
  }
  if (form.hasResponse) {
    const intercept = form.response.some(i => {
      if (!i.key || !i.type) {
        return true
      }
    })
    if (intercept) {
      ElMessage.error(' xiǎng yīng shǔ xìng dekey hétype wèi bì tián xiàng')
      return
    }
  }
  const res = await createPlugApi(form)
  if (res.code === 0) {
    ElMessageBox(' chuàng jiàn chéng gōng， chā jiàn yǐ zì dòng xiě rù hòu duānplugin mù lù xià， qǐng àn zhào zì jǐ de luó jí jìn xíng chuàng zào')
  }
}

const addkv = (arr) => {
  arr.push({
    key: '',
    value: '',
  })
}

const minkv = (arr, key) => {
  if (arr.length === 1) {
    ElMessage.warning(' zhì shǎo yǒu yī gè quán jú shǔ xìng')
    return
  }
  arr.splice(key, 1)
}

</script>

<style lang="scss" scoped>
        .plug-form{
            width: 680px;
        }
    .plug-row{
        display: flex;
        align-items: center;
        width: 100%;
        &+&{
            margin-top: 12px;
        }
        &>span{
            margin-left: 8px;
        }
    }
</style>
