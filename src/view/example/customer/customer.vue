<template>
  <div>
    <warning-bar title=" zài zī yuán quán xiàn zhōng jiāng cǐ jiǎo sè de zī yuán quán xiàn qīng kōng  huò zhě bù bāo hán chuàng jiàn zhě de jiǎo sè  jí kě píng bì cǐ kè hù zī yuán de xiǎn shì" />
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button type="primary" icon="plus" @click="openDialog"> xīn zēng</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        tooltip-effect="dark"
        row-key="ID"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column align="left" label=" jiē rù rì qī" width="180">
          <template #default="scope">
            <span>{{ formatDate(scope.row.CreatedAt) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" label=" xìng míng" prop="customerName" width="120" />
        <el-table-column align="left" label=" diàn huà" prop="customerPhoneData" width="120" />
        <el-table-column align="left" label=" jiē rù rénID" prop="sysUserId" width="120" />
        <el-table-column align="left" label=" cāo zuò" min-width="160">
          <template #default="scope">
            <el-button type="primary" link icon="edit" @click="updateCustomer(scope.row)"> biàn gèng</el-button>
            <el-popover v-model="scope.row.visible" placement="top" width="160">
              <p> què dìng yào shān chú ma？</p>
              <div style="text-align: right; margin-top: 8px;">
                <el-button type="primary" link @click="scope.row.visible = false"> qǔ xiāo</el-button>
                <el-button type="primary" @click="deleteCustomer(scope.row)"> què dìng</el-button>
              </div>
              <template #reference>
                <el-button type="primary" link icon="delete" @click="scope.row.visible = true"> shān chú</el-button>
              </template>
            </el-popover>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title=" kè hù">
      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label=" kè hù míng">
          <el-input v-model="form.customerName" autocomplete="off" />
        </el-form-item>
        <el-form-item label=" kè hù diàn huà">
          <el-input v-model="form.customerPhoneData" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog"> qǔ  xiāo</el-button>
          <el-button type="primary" @click="enterDialog"> què  dìng</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createExaCustomer,
  updateExaCustomer,
  deleteExaCustomer,
  getExaCustomer,
  getExaCustomerList
} from '@/api/customer'
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { formatDate } from '@/utils/format'

const form = ref({
  customerName: '',
  customerPhoneData: ''
})

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
  const table = await getExaCustomerList({ page: page.value, pageSize: pageSize.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

const dialogFormVisible = ref(false)
const type = ref('')
const updateCustomer = async(row) => {
  const res = await getExaCustomer({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    form.value = res.data.customer
    dialogFormVisible.value = true
  }
}
const closeDialog = () => {
  dialogFormVisible.value = false
  form.value = {
    customerName: '',
    customerPhoneData: ''
  }
}
const deleteCustomer = async(row) => {
  row.visible = false
  const res = await deleteExaCustomer({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: ' shān chú chéng gōng'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}
const enterDialog = async() => {
  let res
  switch (type.value) {
    case 'create':
      res = await createExaCustomer(form.value)
      break
    case 'update':
      res = await updateExaCustomer(form.value)
      break
    default:
      res = await createExaCustomer(form.value)
      break
  }

  if (res.code === 0) {
    closeDialog()
    getTableData()
  }
}
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

</script>

<script>

export default {
  name: 'Customer'
}
</script>

<style></style>
