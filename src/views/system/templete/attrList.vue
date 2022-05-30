<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
        <el-button type="primary" size="small" @click="goBack">返回</el-button>
      </el-col>
    </el-row>
    <el-table border :data="attrData" stripe style="margin-top: 10px;">
      <el-table-column type="index" label="序号" />
      <el-table-column prop="secdClassName" label="二级分类名称" />
      <el-table-column prop="pKey" label="属性键" />
      <el-table-column prop="pName" label="属性名" />
      <el-table-column prop="required" label="必填标记">
        <template slot-scope="{row}">
          {{ row.required?'必填':'非必填' }}
        </template>
      </el-table-column>
      <el-table-column prop="numericType" label="结果值类型">
        <template slot-scope="{row}">
          {{ LABEL_STATUS[row.numericType] }}
        </template>
      </el-table-column>
      <el-table-column prop="groupKey" label="分组key" />
      <el-table-column prop="groupName" label="分组名" />
      <el-table-column prop="sort" label="顺序号" />
    </el-table>
    <el-dialog title="属性添加" center :visible.sync="attrVisible">
      <el-form :model="attrForm" label-position="right" label-width="120px">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="属性键:">
              <el-input v-model="attrForm.key" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="属性名称:">
              <el-input v-model="attrForm.name" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否必填:">
              <el-radio v-model="attrForm.required" label="1">是</el-radio>
              <el-radio v-model="attrForm.required" label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标签类型:">
              <el-radio v-model="attrForm.labelType" label="0">下拉框</el-radio>
              <el-radio v-model="attrForm.labelType" label="1">输入框</el-radio>
              <el-radio v-model="attrForm.labelType" label="2">选择框</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结果类型:">
              <el-radio v-model="attrForm.numericType" label="0">数值型</el-radio>
              <el-radio v-model="attrForm.numericType" label="1">字符型</el-radio>
              <el-radio v-model="attrForm.numericType" label="2">对象</el-radio>
            </el-form-item>
          </el-col>
          <el-col v-if="attrForm.labelType == 0" :span="12">
            <el-form-item label="下拉类型数据源:">
              <el-radio v-model="attrForm.labelValue" label="0">采样依据</el-radio>
              <el-radio v-model="attrForm.labelValue" label="1">采样设备</el-radio>
            </el-form-item>
          </el-col>
          <el-col v-if="attrForm.labelType == 2" :span="12">
            <el-form-item label="选择框值:">
              <el-input v-model="attrForm.radioValue" placeholder="多数据源，逗号隔开" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组键值:">
              <el-input v-model="attrForm.groupKey" placeholder="分组键值" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分组名称:">
              <el-input v-model="attrForm.groupName" placeholder="分组名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="顺序号:">
              <el-input-number v-model="attrForm.sort" controls-position="right" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">保存</el-button>
        <el-button type="">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const LABEL_STATUS = {
  '0': '下拉框',
  '1': '输入框',
  '2': '选择框'
}
import * as tempServer from '@/api/temple'
export default {
  data() {
    return {
      LABEL_STATUS,
      secdClassId: '',
      attrData: [],
      attrForm: {
        secdClassId: '',
        secdClassName: '',
        key: '',
        name: '',
        required: '0',
        labelType: '0',
        numericType: '0',
        labelValue: '0',
        radioValue: '',
        showType: '',
        groupKey: '',
        groupName: '',
        sort: 0
      },
      attrVisible: false
    }
  },
  created() {
    if (this.$route.params.secdClassId) {
      this.secdClassId = this.$route.params.secdClassId
      this.handleSearch()
    }
  },
  methods: {
    handleSearch() {
      tempServer.getListBySecdClassId(this.secdClassId).then(res => {
        if (res.code === 200) {
          this.attrData = res.result || []
        }
      })
    },
    handleAdd() {
      this.attrVisible = true
    },
    confirm() {
      tempServer.templeAdd(this.attrForm).then(res => {
        this.msgSuccess('保存成功')
        this.attrVisible = false
        this.handleSearch()
      })
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>
