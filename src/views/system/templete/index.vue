
<template>
  <div class="app-container">
    <el-table border :data="factorData">
      <el-table-column type="index" width="50" align="center" label="序号" />
      <el-table-column prop="className" align="center" label="一级分类" />
      <el-table-column prop="secdClassName" align="center" label="二级类别" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button type="text" @click="handleDetail(row)">属性列表</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
import * as tempServer from '@/api/temple'
export default {
  data() {
    return {
      factorData: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      tempServer.getAllFactorSecdClass().then(res => {
        if (res.code === 200) {
          this.factorData = res.result || []
        }
      })
    },
    handleDetail(row) {
      this.$router.push(`/sysManage/attrList/${row.secdClassId}`)
    }
  }
}
</script>
