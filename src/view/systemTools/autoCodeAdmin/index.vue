<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="goAutoCode(null)"> xīn zēng</el-button>
      </div>
      <el-table :data="tableData">
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="left" label="id" width="60" prop="ID" />
        <el-table-column align="left" label=" rì qī" width="180">
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column align="left" label=" jié gòu tǐ míng" min-width="150" prop="structName" />
        <el-table-column align="left" label=" jié gòu tǐ miáo shù" min-width="150" prop="structCNName" />
        <el-table-column align="left" label=" biǎo míng chēng" min-width="150" prop="tableName" />
        <el-table-column align="left" label=" huí gǔn biāo jì" min-width="150" prop="flag">
          <template #default="scope">
            <el-tag
              v-if="scope.row.flag"
              type="danger"

              effect="dark"
            >
               yǐ huí gǔn
            </el-tag>
            <el-tag
              v-else

              type="success"
              effect="dark"
            >
               wèi huí gǔn
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" cāo zuò" min-width="240">
          <template #default="scope">
            <div>
              <el-button type="primary" link :disabled="scope.row.flag === 1" @click="rollbackFunc(scope.row,true)"> huí gǔn( shān biǎo)</el-button>
              <el-button type="primary" link :disabled="scope.row.flag === 1" @click="rollbackFunc(scope.row,false)"> huí gǔn( bù shān biǎo)</el-button>
              <el-button type="primary" link @click="goAutoCode(scope.row)"> fù yòng</el-button>
              <el-button type="primary" link @click="deleteRow(scope.row)"> shān chú</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AutoCodeAdmin',
}
</script>

<script setup>
import { getSysHistory, rollback, delSysHistory } from '@/api/autoCode.js'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { formatDate } from '@/utils/format'
const router = useRouter()

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
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
  const table = await getSysHistory({
    page: page.value,
    pageSize: pageSize.value
  })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

const deleteRow = async(row) => {
  ElMessageBox.confirm(' cǐ cāo zuò jiāng shān chú běn lì shǐ,  shì fǒu jì xù?', ' tí shì', {
    confirmButtonText: ' què dìng',
    cancelButtonText: ' qǔ xiāo',
    type: 'warning'
  }).then(async() => {
    const res = await delSysHistory({ id: Number(row.ID) })
    if (res.code === 0) {
      ElMessage.success(' shān chú chéng gōng')
      getTableData()
    }
  })
}
const rollbackFunc = async(row, flag) => {
  if (flag) {
    ElMessageBox.confirm(` cǐ cāo zuò jiāng shān chú zì dòng chuàng jiàn de wén jiàn héapi（ huì shān chú biǎo！！！）,  shì fǒu jì xù?`, ' tí shì', {
      confirmButtonText: ' què dìng',
      cancelButtonText: ' qǔ xiāo',
      type: 'warning'
    }).then(async() => {
      ElMessageBox.confirm(` cǐ cāo zuò jiāng shān chú zì dòng chuàng jiàn de wén jiàn héapi（ huì shān chú biǎo！！！）,  qǐng jì xù què rèn！！！`, ' huì shān chú biǎo', {
        confirmButtonText: ' què dìng',
        cancelButtonText: ' qǔ xiāo',
        type: 'warning'
      }).then(async() => {
        ElMessageBox.confirm(` cǐ cāo zuò jiāng shān chú zì dòng chuàng jiàn de wén jiàn héapi（ huì shān chú biǎo！！！）,  qǐng jì xù què rèn！！！`, ' huì shān chú biǎo', {
          confirmButtonText: ' què dìng',
          cancelButtonText: ' qǔ xiāo',
          type: 'warning'
        }).then(async() => {
          const res = await rollback({ id: Number(row.ID), deleteTable: flag })
          if (res.code === 0) {
            ElMessage.success(' huí gǔn chéng gōng')
            getTableData()
          }
        })
      })
    })
  } else {
    ElMessageBox.confirm(` cǐ cāo zuò jiāng shān chú zì dòng chuàng jiàn de wén jiàn héapi,  shì fǒu jì xù?`, ' tí shì', {
      confirmButtonText: ' què dìng',
      cancelButtonText: ' qǔ xiāo',
      type: 'warning'
    }).then(async() => {
      const res = await rollback({ id: Number(row.ID), deleteTable: flag })
      if (res.code === 0) {
        ElMessage.success(' huí gǔn chéng gōng')
        getTableData()
      }
    })
  }
}
const goAutoCode = (row) => {
  if (row) {
    router.push({ name: 'autoCodeEdit', params: {
      id: row.ID
    }})
  } else {
    router.push({ name: 'autoCode' })
  }
}

</script>

<style scoped lang="scss">
.button-box {
  padding: 10px 20px;
  .el-button {
    float: right;
  }
}
.el-tag--mini {
  margin-left: 5px;
}
.warning {
  color: #dc143c;
}
</style>
