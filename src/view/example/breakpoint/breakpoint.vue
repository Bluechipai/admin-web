<template>
  <div class="break-point">
    <div class="gva-table-box">
      <el-divider content-position="left"> dà wén jiàn shàng chuán</el-divider>
      <form id="fromCont" method="post">
        <div class="fileUpload" @click="inputChange">
           xuǎn zé wén jiàn
          <input v-show="false" id="file" ref="FileInput" multiple="multiple" type="file" @change="choseFile">
        </div>
      </form>
      <el-button :disabled="limitFileSize" type="primary" class="uploadBtn" @click="getFile"> shàng chuán wén jiàn</el-button>
      <div class="el-upload__tip"> qǐng shàng chuán bù chāo guò5MB de wén jiàn</div>
      <div class="list">
        <transition name="list" tag="p">
          <div v-if="file" class="list-item">
            <el-icon>
              <document />
            </el-icon>
            <span>{{ file.name }}</span>
            <span class="percentage">{{ percentage }}%</span>
            <el-progress :show-text="false" :text-inside="false" :stroke-width="2" :percentage="percentage" />
          </div>
        </transition>
      </div>
      <div class="tips"> cǐ bǎn běn wèi xiān xíng tǐ yàn gōng néng cè shì bǎn， yàng shì měi huà hé xìng néng yōu huà zhèng zài jìn xíng zhōng， shàng chuán qiè piàn wén jiàn hé hé chéng de wán zhěng wén jiàn fēn bié zàiQMPlusserver mù lù debreakpointDir wén jiàn jiā héfileDir wén jiàn jiā</div>
    </div>
  </div>

</template>

<script setup>
import SparkMD5 from 'spark-md5'
import {
  findFile,
  breakpointContinueFinish,
  removeChunk,
  breakpointContinue
} from '@/api/breakpoint'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const file = ref(null)
const fileMd5 = ref('')
const formDataList = ref([])
const waitUpLoad = ref([])
const waitNum = ref(NaN)
const limitFileSize = ref(false)
const percentage = ref(0)
const percentageFlage = ref(true)

//  xuǎn zhōng wén jiàn de hán shù
const choseFile = async(e) => {
  const fileR = new FileReader() //  chuàng jiàn yī gèreader yòng lái dú qǔ wén jiàn liú
  const fileInput = e.target.files[0] //  huò qǔ dāng qián wén jiàn
  const maxSize = 5 * 1024 * 1024
  file.value = fileInput // file  diū quán jú fāng biàn hòu miàn yòng  kě yǐ gǎi jìn wèifunc chuán cān xíng shì
  percentage.value = 0
  if (file.value.size < maxSize) {
    fileR.readAsArrayBuffer(file.value) //  bǎ wén jiàn dú chéngArrayBuffer   zhǔ yào wèi le bǎo chí gēn hòu duān de liú yī zhì
    fileR.onload = async e => {
      //  dú chéngarrayBuffer de huí diào e  wèi fāng fǎ zì dài cān shù  xiāng dāng yú dom dee  liú cún zàie.target.result  zhōng
      const blob = e.target.result
      const spark = new SparkMD5.ArrayBuffer() //  chuàng jiànmd5 zhì zào gōng jù （md5 yòng yú jiǎn cè wén jiàn yī zhì xìng  zhè lǐ bù dǒng jiù dǎ diàn huà wèn wǒ）
      spark.append(blob) //  wén jiàn liú diū jìn gōng jù
      fileMd5.value = spark.end() //  gōng jù jié shù  chǎn shēng yī gèa  zǒng wén jiàn demd5
      const FileSliceCap = 1 * 1024 * 1024 //  fēn piàn zì jié shù
      let start = 0 //  dìng yì fēn piàn kāi shǐ qiè de dì fāng
      let end = 0 //  měi piàn jié shù qiè de dì fānga
      let i = 0 //  dì jǐ piàn
      formDataList.value = [] //  fēn piàn cún chǔ de yī gè chí zi  diū quán jú
      while (end < file.value.size) {
        //  dāng jié wěi shù zì dà yú wén jiàn zǒngsize de shí hòu  jié shù qiè piàn
        start = i * FileSliceCap //  jì suàn měi piàn kāi shǐ wèi zhì
        end = (i + 1) * FileSliceCap //  jì suàn měi piàn jié shù wèi zhì
        var fileSlice = file.value.slice(start, end) //  kāi shǐ qiè  file.slice  wèi h5 fāng fǎ  duì wén jiàn qiè piàn  cān shù wèi  qǐ zhǐ zì jié shù
        const formData = new window.FormData() //  chuàng jiànFormData yòng yú cún chǔ chuán gěi hòu duān de xìn xī
        formData.append('fileMd5', fileMd5.value) //  cún chǔ zǒng wén jiàn deMd5  ràng hòu duān zhī dào zì jǐ shì shuí de qiè piàn
        formData.append('file', fileSlice) //  dāng qián de qiè piàn
        formData.append('chunkNumber', i) //  dāng qián shì dì jǐ piàn
        formData.append('fileName', file.value.name) //  dāng qián wén jiàn de wén jiàn míng  yòng yú hòu duān wén jiàn qiè piàn de mìng míng  formData.appen  wèi formData duì xiàng tiān jiā cān shù de fāng fǎ
        formDataList.value.push({ key: i, formData }) //  bǎ dāng qián qiè piàn xìn xī  zì jǐ shì dì jǐ piàn  cún rù wǒ men fāng cái zhǔn bèi hǎo de chí zi
        i++
      }
      const params = {
        fileName: file.value.name,
        fileMd5: fileMd5.value,
        chunkTotal: formDataList.value.length
      }
      const res = await findFile(params)
      //  quán bù qiè wán yǐ hòu  fā yī gè qǐng qiú gěi hòu duān  lā dāng qián wén jiàn hòu tái cún chǔ de qiè piàn xìn xī  yòng yú jiǎn cè yǒu duō shǎo shàng chuán chéng gōng de qiè piàn
      const finishList = res.data.file.ExaFileChunk //  shàng chuán chéng gōng de qiè piàn
      const IsFinish = res.data.file.IsFinish //  shì fǒu shì tóng wén jiàn bù tóng mìng （ wén jiànmd5 xiāng tóng  wén jiàn míng bù tóng  zé mò rèn shì tóng yī gè wén jiàn dàn shì bù tóng wén jiàn míng  cǐ shí hòu tái shù jù kù zhǐ xū yào kǎo bèi yī xià shù jù kù wén jiàn jí kě  bù xū yào shàng chuán wén jiàn  jí miǎo chuán gōng néng）
      if (!IsFinish) {
        //  dāng shì duàn diǎn xù chuán shí hòu
        waitUpLoad.value = formDataList.value.filter(all => {
          return !(
            finishList &&
              finishList.some(fi => fi.FileChunkNumber === all.key)
          ) //  zhǎo chū xū yào shàng chuán de qiè piàn
        })
      } else {
        waitUpLoad.value = [] //  miǎo chuán zé méi yǒu xū yào shàng chuán de qiè piàn
        ElMessage.success(' wén jiàn yǐ miǎo chuán')
      }
      waitNum.value = waitUpLoad.value.length //  jì lù zhǎng dù yòng yú bǎi fēn bǐ zhǎn shì
      console.log(waitNum.value)
    }
  } else {
    limitFileSize.value = true
    ElMessage(' qǐng shàng chuán xiǎo yú5M wén jiàn')
  }
}

const getFile = () => {
  //  què dìng àn niǔ
  if (file.value === null) {
    ElMessage(' qǐng xiān shàng chuán wén jiàn')
    return
  }
  if (percentage.value === 100) {
    percentageFlage.value = false
  }
  sliceFile() //  shàng chuán qiè piàn
}

const sliceFile = () => {
  waitUpLoad.value &&
        waitUpLoad.value.forEach(item => {
          //  xū yào shàng chuán de qiè piàn
          item.formData.append('chunkTotal', formDataList.value.length) //  qiè piàn zǒng shù xié dài gěi hòu tái  zǒng yǒu yòng de
          const fileR = new FileReader() //  gōng néng tóng shàng
          const fileF = item.formData.get('file')
          fileR.readAsArrayBuffer(fileF)
          fileR.onload = e => {
            const spark = new SparkMD5.ArrayBuffer()
            spark.append(e.target.result)
            item.formData.append('chunkMd5', spark.end()) //  huò qǔ dāng qián qiè piànmd5  hòu duān yòng yú yàn zhèng qiè piàn wán zhěng xìng
            upLoadFileSlice(item)
          }
        })
}

watch(() => waitNum.value, () => { percentage.value = Math.floor(((formDataList.value.length - waitNum.value) / formDataList.value.length) * 100) })

const upLoadFileSlice = async(item) => {
  //  qiè piàn shàng chuán
  const fileRe = await breakpointContinue(item.formData)
  if (fileRe.code !== 0) {
    return
  }
  waitNum.value-- //  bǎi fēn shù zēng jiā
  if (waitNum.value === 0) {
    //  qiè piàn chuán wán yǐ hòu  hé chéng wén jiàn
    const params = {
      fileName: file.value.name,
      fileMd5: fileMd5.value
    }
    const res = await breakpointContinueFinish(params)
    if (res.code === 0) {
      //  hé chéng wén jiàn guò hòu  shān chú huǎn cún qiè piàn
      const params = {
        fileName: file.value.name,
        fileMd5: fileMd5.value,
        filePath: res.data.filePath,
      }
      ElMessage.success(' shàng chuán chéng gōng')
      await removeChunk(params)
    }
  }
}

const FileInput = ref(null)
const inputChange = () => {
  FileInput.value.dispatchEvent(new MouseEvent('click'))
}
</script>

<script>

export default {
  name: 'BreakPoint'
}
</script>

<style lang='scss' scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#fromCont{
  display: inline-block;
}
.fileUpload{
    padding: 3px 10px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #000;
    border: 1px solid #c1c1c1;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    input{
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
}
 .fileName{
    display: inline-block;
    vertical-align: top;
    margin: 6px 15px 0 15px;
  }
  .uploadBtn{
    position: relative;
    top: -10px;
    margin-left: 15px;
  }
  .tips{
    margin-top: 30px;
    font-size: 14px;
    font-weight: 400;
    color: #606266;
  }
  .el-divider{
    margin: 0 0 30px 0;
  }

 .list{
   margin-top:15px;
 }
 .list-item {
  display: block;
  margin-right: 10px;
  color: #606266;
  line-height: 25px;
  margin-bottom: 5px;
  width: 40%;
   .percentage{
          float: right;
        }
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
