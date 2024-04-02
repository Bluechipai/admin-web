<template>
  <div class="system">
    <el-form ref="form" :model="config" label-width="240px">
      <!--  System start  -->
      <el-collapse v-model="activeNames">
        <el-collapse-item title=" xì tǒng pèi zhì" name="1">
          <el-form-item label=" huán jìng zhí">
            <!-- <el-input v-model="config.system.env" />-->
            <el-select v-model="config.system.env" style="width:100%">
              <el-option value="public" />
              <el-option value="develop" />
            </el-select>
          </el-form-item>
          <el-form-item label=" duān kǒu zhí">
            <el-input v-model.number="config.system.addr" />
          </el-form-item>
          <el-form-item label=" shù jù kù lèi xíng">
            <el-select v-model="config.system['db-type']" style="width:100%">
              <el-option value="mysql" />
              <el-option value="pgsql" />
            </el-select>
          </el-form-item>
          <el-form-item label="Oss lèi xíng">
            <el-select v-model="config.system['oss-type']" style="width:100%">
              <el-option value="local" />
              <el-option value="qiniu" />
              <el-option value="tencent-cos" />
              <el-option value="aliyun-oss" />
              <el-option value="huawei-obs" />
            </el-select>
          </el-form-item>
          <el-form-item label=" duō diǎn dēng lù lán jié">
            <el-checkbox v-model="config.system['use-multipoint']"> kāi qǐ</el-checkbox>
          </el-form-item>
          <el-form-item label=" kāi qǐredis">
            <el-checkbox v-model="config.system['use-redis']"> kāi qǐ</el-checkbox>
          </el-form-item>
          <el-form-item label=" xiàn liú cì shù">
            <el-input-number v-model.number="config.system['iplimit-count']" />
          </el-form-item>
          <el-form-item label=" xiàn liú shí jiān">
            <el-input-number v-model.number="config.system['iplimit-time']" />
          </el-form-item>
          <el-tooltip
            content=" qǐng xiū gǎi wán chéng hòu， zhù yì yī bìng xiū gǎi qián duānenv huán jìng xià deVITE_BASE_PATH"
            placement="top-start"
          >
            <el-form-item label=" quán jú lù yóu qián zhuì">
              <el-input v-model="config.system['router-prefix']" />
            </el-form-item>
          </el-tooltip>
        </el-collapse-item>
        <el-collapse-item title="jwt qiān míng" name="2">
          <el-form-item label="jwt qiān míng">
            <el-input v-model="config.jwt['signing-key']" />
          </el-form-item>
          <el-form-item label=" yǒu xiào qī">
            <el-input v-model="config.jwt['expires-time']" />
          </el-form-item>
          <el-form-item label=" huǎn chōng qī">
            <el-input v-model="config.jwt['buffer-time']" />
          </el-form-item>
          <el-form-item label=" qiān fā zhě">
            <el-input v-model="config.jwt.issuer" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Zap rì zhì pèi zhì" name="3">
          <el-form-item label=" jí bié">
            <el-input v-model.number="config.zap.level" />
          </el-form-item>
          <el-form-item label=" shū chū">
            <el-input v-model="config.zap.format" />
          </el-form-item>
          <el-form-item label=" rì zhì qián zhuì">
            <el-input v-model="config.zap.prefix" />
          </el-form-item>
          <el-form-item label=" rì zhì wén jiàn jiā">
            <el-input v-model="config.zap.director" />
          </el-form-item>
          <el-form-item label=" biān mǎ jí">
            <el-input v-model="config.zap['encode-level']" />
          </el-form-item>
          <el-form-item label=" zhàn míng">
            <el-input v-model="config.zap['stacktrace-key']" />
          </el-form-item>
          <el-form-item label=" rì zhì liú cún shí jiān( mò rèn yǐ tiān wèi dān wèi)">
            <el-input v-model.number="config.zap['max-age']" />
          </el-form-item>
          <el-form-item label=" xiǎn shì xíng">
            <el-checkbox v-model="config.zap['show-line']" />
          </el-form-item>
          <el-form-item label=" shū chū kòng zhì tái">
            <el-checkbox v-model="config.zap['log-in-console']" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Redis admin shù jù kù pèi zhì" name="4">
          <el-form-item label=" kù">
            <el-input v-model.number="config.redis.db" />
          </el-form-item>
          <el-form-item label=" dì zhǐ">
            <el-input v-model="config.redis.addr" />
          </el-form-item>
          <el-form-item label=" mì mǎ">
            <el-input v-model="config.redis.password" />
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title=" yóu xiāng pèi zhì" name="5">
          <el-form-item label=" jiē shōu zhě yóu xiāng">
            <el-input v-model="config.email.to" placeholder=" kě duō gè， yǐ dòu hào fēn gé" />
          </el-form-item>
          <el-form-item label=" duān kǒu">
            <el-input v-model.number="config.email.port" />
          </el-form-item>
          <el-form-item label=" fā sòng zhě yóu xiāng">
            <el-input v-model="config.email.from" />
          </el-form-item>
          <el-form-item label="host">
            <el-input v-model="config.email.host" />
          </el-form-item>
          <el-form-item label=" shì fǒu wèissl">
            <el-checkbox v-model="config.email['is-ssl']" />
          </el-form-item>
          <el-form-item label="secret">
            <el-input v-model="config.email.secret" />
          </el-form-item>
          <el-form-item label=" cè shì yóu jiàn">
            <el-button @click="email"> cè shì yóu jiàn</el-button>
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title=" yàn zhèng mǎ pèi zhì" name="7">
          <el-form-item label=" zì fú zhǎng dù">
            <el-input v-model.number="config.captcha['key-long']" />
          </el-form-item>
          <el-form-item label=" píng tái kuān dù">
            <el-input v-model.number="config.captcha['img-width']" />
          </el-form-item>
          <el-form-item label=" tú piàn gāo dù">
            <el-input v-model.number="config.captcha['img-height']" />
          </el-form-item>
        </el-collapse-item>
        <el-collapse-item title=" shù jù kù pèi zhì" name="9">
          <template v-if="config.system['db-type'] === 'mysql'">
            <el-form-item label=" yòng hù míng">
              <el-input v-model="config.mysql.username" />
            </el-form-item>
            <el-form-item label=" mì mǎ">
              <el-input v-model="config.mysql.password" />
            </el-form-item>
            <el-form-item label=" dì zhǐ">
              <el-input v-model="config.mysql.path" />
            </el-form-item>
            <el-form-item label=" shù jù kù">
              <el-input v-model="config.mysql['db-name']" />
            </el-form-item>
            <el-form-item label=" qián zhuì">
              <el-input v-model="config.mysql['refix']" />
            </el-form-item>
            <el-form-item label=" fù shù biǎo">
              <el-switch v-model="config.mysql['singular']" />
            </el-form-item>
            <el-form-item label=" yǐn qíng">
              <el-input v-model="config.mysql['engine']" />
            </el-form-item>
            <el-form-item label="maxIdleConns">
              <el-input v-model.number="config.mysql['max-idle-conns']" />
            </el-form-item>
            <el-form-item label="maxOpenConns">
              <el-input v-model.number="config.mysql['max-open-conns']" />
            </el-form-item>
            <el-form-item label=" xiě rù rì zhì">
              <el-checkbox v-model="config.mysql['log-zap']" />
            </el-form-item>
            <el-form-item label=" rì zhì mó shì">
              <el-input v-model="config.mysql['log-mode']" />
            </el-form-item>
          </template>
          <template v-if="config.system['db-type'] === 'pgsql'">
            <el-form-item label=" yòng hù míng">
              <el-input v-model="config.pgsql.username" />
            </el-form-item>
            <el-form-item label=" mì mǎ">
              <el-input v-model="config.pgsql.password" />
            </el-form-item>
            <el-form-item label=" dì zhǐ">
              <el-input v-model="config.pgsql.path" />
            </el-form-item>
            <el-form-item label=" shù jù kù">
              <el-input v-model="config.pgsql.dbname" />
            </el-form-item>
            <el-form-item label=" qián zhuì">
              <el-input v-model="config.pgsql['refix']" />
            </el-form-item>
            <el-form-item label=" fù shù biǎo">
              <el-switch v-model="config.pgsql['singular']" />
            </el-form-item>
            <el-form-item label=" yǐn qíng">
              <el-input v-model="config.pgsql['engine']" />
            </el-form-item>
            <el-form-item label="maxIdleConns">
              <el-input v-model.number="config.pgsql['max-idle-conns']" />
            </el-form-item>
            <el-form-item label="maxOpenConns">
              <el-input v-model.number="config.pgsql['max-open-conns']" />
            </el-form-item>
            <el-form-item label=" xiě rù rì zhì">
              <el-checkbox v-model="config.pgsql['log-zap']" />
            </el-form-item>
            <el-form-item label=" rì zhì mó shì">
              <el-input v-model="config.pgsql['log-mode']" />
            </el-form-item>
          </template>
        </el-collapse-item>

        <el-collapse-item title="oss pèi zhì" name="10">
          <template v-if="config.system['oss-type'] === 'local'">
            <h2> běn dì wén jiàn pèi zhì</h2>
            <el-form-item label=" běn dì wén jiàn fǎng wèn lù jìng">
              <el-input v-model="config.local.path" />
            </el-form-item>
            <el-form-item label=" běn dì wén jiàn cún chǔ lù jìng">
              <el-input v-model="config.local['store-path']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'qiniu'">
            <h2>qiniu shàng chuán pèi zhì</h2>
            <el-form-item label=" cún chǔ qū yù">
              <el-input v-model="config.qiniu.zone" />
            </el-form-item>
            <el-form-item label=" kōng jiān míng chēng">
              <el-input v-model="config.qiniu.bucket" />
            </el-form-item>
            <el-form-item label="CDN jiā sù yù míng">
              <el-input v-model="config.qiniu['img-path']" />
            </el-form-item>
            <el-form-item label=" shì fǒu shǐ yònghttps">
              <el-checkbox v-model="config.qiniu['use-https']"> kāi qǐ</el-checkbox>
            </el-form-item>
            <el-form-item label="accessKey">
              <el-input v-model="config.qiniu['access-key']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config.qiniu['secret-key']" />
            </el-form-item>
            <el-form-item label=" shàng chuán shì fǒu shǐ yòngCDN shàng chuán jiā sù">
              <el-checkbox v-model="config.qiniu['use-cdn-domains']"> kāi qǐ</el-checkbox>
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'tencent-cos'">
            <h2> téng xùn yúnCOS shàng chuán pèi zhì</h2>
            <el-form-item label=" cún chǔ tǒng míng chēng">
              <el-input v-model="config['tencent-cos']['bucket']" />
            </el-form-item>
            <el-form-item label=" suǒ shǔ dì yù">
              <el-input v-model="config['tencent-cos'].region" />
            </el-form-item>
            <el-form-item label="secretID">
              <el-input v-model="config['tencent-cos']['secret-id']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config['tencent-cos']['secret-key']" />
            </el-form-item>
            <el-form-item label=" lù jìng qián zhuì">
              <el-input v-model="config['tencent-cos']['path-prefix']" />
            </el-form-item>
            <el-form-item label=" fǎng wèn yù míng">
              <el-input v-model="config['tencent-cos']['base-url']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'aliyun-oss'">
            <h2> ā lǐ yúnOSS shàng chuán pèi zhì</h2>
            <el-form-item label=" qū yù">
              <el-input v-model="config['aliyun-oss'].endpoint" />
            </el-form-item>
            <el-form-item label="accessKeyId">
              <el-input v-model="config['aliyun-oss']['access-key-id']" />
            </el-form-item>
            <el-form-item label="accessKeySecret">
              <el-input v-model="config['aliyun-oss']['access-key-secret']" />
            </el-form-item>
            <el-form-item label=" cún chǔ tǒng míng chēng">
              <el-input v-model="config['aliyun-oss']['bucket-name']" />
            </el-form-item>
            <el-form-item label=" fǎng wèn yù míng">
              <el-input v-model="config['aliyun-oss']['bucket-url']" />
            </el-form-item>
          </template>
          <template v-if="config.system['oss-type'] === 'huawei-obs'">
            <h2> huá wèi yúnObs shàng chuán pèi zhì</h2>
            <el-form-item label=" lù jìng">
              <el-input v-model="config['hua-wei-obs'].path" />
            </el-form-item>
            <el-form-item label=" cún chǔ tǒng míng chēng">
              <el-input v-model="config['hua-wei-obs'].bucket" />
            </el-form-item>
            <el-form-item label=" qū yù">
              <el-input v-model="config['hua-wei-obs'].endpoint" />
            </el-form-item>
            <el-form-item label="accessKey">
              <el-input v-model="config['hua-wei-obs']['access-key']" />
            </el-form-item>
            <el-form-item label="secretKey">
              <el-input v-model="config['hua-wei-obs']['secret-key']" />
            </el-form-item>
          </template>

        </el-collapse-item>

        <el-collapse-item title="Excel shàng chuán pèi zhì" name="11">
          <el-form-item label=" hé chéng mù biāo dì zhǐ">
            <el-input v-model="config.excel.dir" />
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title=" zì dòng huà dài mǎ pèi zhì" name="12">
          <el-form-item label=" shì fǒu zì dòng zhòng qǐ(linux)">
            <el-checkbox v-model="config.autocode['transfer-restart']" />
          </el-form-item>
          <el-form-item label="root( xiàng mù gēn lù jìng)">
            <el-input v-model="config.autocode.root" disabled />
          </el-form-item>
          <el-form-item label="Server( hòu duān dài mǎ dì zhǐ)">
            <el-input v-model="config.autocode['transfer-restart']" />
          </el-form-item>
          <el-form-item label="SApi( hòu duānapi wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['server-api']" />
          </el-form-item>
          <el-form-item label="SInitialize( hòu duānInitialize wén jiàn jiā)">
            <el-input v-model="config.autocode['server-initialize']" />
          </el-form-item>
          <el-form-item label="SModel( hòu duānModel wén jiàn dì zhǐ)">
            <el-input v-model="config.autocode['server-model']" />
          </el-form-item>
          <el-form-item label="SRequest( hòu duānRequest wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['server-request']" />
          </el-form-item>
          <el-form-item label="SRouter( hòu duānRouter wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['server-router']" />
          </el-form-item>
          <el-form-item label="SService( hòu duānService wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['server-service']" />
          </el-form-item>
          <el-form-item label="Web( qián duān wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode.web" />
          </el-form-item>
          <el-form-item label="WApi( hòu duānWApi wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['web-api']" />
          </el-form-item>
          <el-form-item label="WForm( hòu duānWForm wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['web-form']" />
          </el-form-item>
          <el-form-item label="WTable( hòu duānWTable wén jiàn jiā dì zhǐ)">
            <el-input v-model="config.autocode['web-table']" />
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="Timer( dìng shí rèn wù)" name="13">
          <el-form-item label="Start（ shì fǒu qǐ yòng）">
            <el-checkbox v-model="config.timer['start']" />
          </el-form-item>
          <el-form-item label="Spec(CRON biǎo dá shì)">
            <el-input v-model="config.timer.spec" />
          </el-form-item>
          <template v-for="(item,k) in config.timer.detail">
            <div v-for="(_,k2) in item" :key="k2">
              <el-form-item :key="k+k2" :label="k2">
                <el-input v-model="item[k2]" />
              </el-form-item>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <div class="gva-btn-list">
      <el-button type="primary" @click="update"> lì jí gèng xīn</el-button>
      <el-button type="primary" @click="reload"> zhòng qǐ fú wù（ kāi fā zhōng）</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Config'
}
</script>
<script setup>
import { getSystemConfig, setSystemConfig } from '@/api/system'
import { emailTest } from '@/api/email'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const activeNames = reactive([])
const config = ref({
  system: {
    'iplimit-count': 0,
    'iplimit-time': 0
  },
  jwt: {},
  mysql: {},
  pgsql: {},
  excel: {},
  autocode: {},
  redis: {},
  qiniu: {},
  'tencent-cos': {},
  'aliyun-oss': {},
  'hua-wei-obs': {},
  captcha: {},
  zap: {},
  local: {},
  email: {},
  timer: {
    detail: {}
  }
})

const initForm = async() => {
  const res = await getSystemConfig()
  if (res.code === 0) {
    config.value = res.data.config
  }
}
initForm()
const reload = () => {}
const update = async() => {
  const res = await setSystemConfig({ config: config.value })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' pèi zhì wén jiàn shè zhì chéng gōng'
    })
    await initForm()
  }
}
const email = async() => {
  const res = await emailTest()
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' yóu jiàn fā sòng chéng gōng'
    })
    await initForm()
  } else {
    ElMessage({
      type: 'error',
      message: ' yóu jiàn fā sòng shī bài'
    })
  }
}

</script>

<style lang="scss">
.system {
  background: #fff;
  padding:36px;
  border-radius: 2px;
  h2 {
    padding: 10px;
    margin: 10px 0;
    font-size: 16px;
    box-shadow: -4px 0px 0px 0px #e7e8e8;
  }
  ::v-deep(.el-input-number__increase){
    top:5px !important;
  }
  .gva-btn-list{
    margin-top:16px;
  }
}
</style>
