<template>
  <div class="app-container">
    <el-form :model="searchForm" :inline="true">
      <el-row>
        <el-col :span="20">
          <el-form-item label="机构编号:">
            <el-input v-model="searchForm.organId" style="width:155px" placeholder="机构编号" />
          </el-form-item>
          <el-form-item label="机构名称:">
            <el-input v-model="searchForm.organName" style="width:155px" placeholder="机构名称" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" class="iconfont icon-chaxun1" @click="handleSearch"> 查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="4" class="search-right">
          <el-button type="text" icon="el-icon-plus" @click="handleCreate">新增</el-button>
          <el-button type="text" icon="el-icon-refresh" @click="handleSearch">刷新</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      stripe
      :data="orderData"
      highlight-current-row
      :header-cell-style="{background:'#ECF3FC'}"
      style="width: 100%"
    >
      <template slot="empty">
        <div class="table_empty">
          <div class="empty_tips">
            <span>
              暂无审批信息
            </span>
          </div>
        </div>
      </template>
      <el-table-column type="index" width="55" label="序号" fixed="left" align="center" />
      <el-table-column prop="organId" label="机构编号" align="center" />
      <el-table-column prop="organName" label="机构名称" align="center" />
      <el-table-column prop="organPhone" label="机构联系方式" align="center" />
      <el-table-column prop="organJurPerson" label="机构法人" align="center" />
      <el-table-column prop="username" label="机构登陆账号" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" />

      <el-table-column fixed="right" align="center" label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdatePwd(scope.row)"> 查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right">
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="searchForm.pageNumber"
        :limit.sync="searchForm.pageSize"
        @pagination="handleSearch"
      />
    </div>

    <el-dialog title="机构创建" :visible.sync="organVisible" center>
      <div style="width: 450px;margin:0 auto">
        <el-form ref="organForm" :model="organForm" :rules="organRules" label-width="120px">
          <el-form-item prop="organId" label="机构编号:">
            <el-input v-model="organForm.organId" placeholder="机构编号" />
          </el-form-item>
          <el-form-item prop="organName" label="机构名称:">
            <el-input v-model="organForm.organName" placeholder="机构名称" />
          </el-form-item>
          <el-form-item prop="organPhone" label="机构联系方式:">
            <el-input v-model="organForm.organPhone" placeholder="机构联系方式" />
          </el-form-item>
          <el-form-item prop="organJurPerson" label="机构法人:">
            <el-input v-model="organForm.organJurPerson" placeholder="机构法人" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="organVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmDialog">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as organServer from '@/api/organ'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      searchForm: {
        organId: '',
        organName: '',
        pageNumber: 1,
        pageSize: 20
      },
      total: 0,
      organForm: {
        organId: '',
        organName: '',
        organPhone: '',
        organJurPerson: ''
      },
      organRules: {
        organId: [{ required: true, message: '机构代号不能为空', trigger: 'blur' }],
        organName: [{ required: true, message: '机构名称不能为空', trigger: 'blur' }],
        organPhone: [{ required: true, message: '联系方式不能为空', trigger: 'blur' }],
        organJurPerson: [{ required: true, message: '法人不能为空', trigger: 'blur' }]
      },
      organVisible: false,
      orderData: []
    }
  },
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      organServer.findPageByCondition(this.searchForm).then(res => {
        if (res.code === 200) {
          this.orderData = res.result.records
          this.total = res.result.total
        }
      })
    },
    handleCreate() {
      this.organForm = {
        organId: '',
        organName: '',
        organPhone: '',
        organJurPerson: ''
      }
      this.organVisible = true
    },
    handleUpdatePwd(row) {
      this.organForm = {
        organId: row.organId,
        organName: row.organName,
        organPhone: row.organPhone,
        organJurPerson: row.organJurPerson
      }
    },
    confirmDialog() {
      this.$refs.organForm.validate(valid => {
        if (valid) {
          organServer.registOrigan(this.organForm).then(result => {
            if (result.code === 200) {
              this.$notify({
                title: '成功',
                message: result.message,
                type: 'success'
              })
              this.handleSearch()
              this.organVisible = false
            } else {
              this.$notify({
                title: '失败',
                message: result.message,
                type: 'error'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
  .search_div {
    >div {
      &:nth-child(1){
        margin-right: 10px;
      }
      display: inline-block;
    }
  }

  .search_input {
    width: 200px;
    margin-bottom: 5px;
  }
  .search-right {
    text-align: right;
    padding-right: 25px;
  }
  .item {
    font-size: 16px;
  }
  ::v-deep .el-card .el-card__header {
    padding: 5px 20px;
    background: #F3F2F2;
  }
  .block-flex {
    position: relative;
    display: flex;
    &>div{
      border: 1px solid #B7B7B7;
      width: 100px;
      margin: 0;
      line-height: 30px;
      text-align: center;
    }
    &>div:first-child {
      background: #B7B7B7;
    }
  }
  .card-left {
    width: 100%;
    height: 600px;
  }
  .card-right {
    width: 100%;
    min-height: 600px;
  }
</style>
