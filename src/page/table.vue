<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 14:02:44
 * @LastEditTime: 2019-08-12 09:03:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>表格</el-breadcrumb-item>
    </el-breadcrumb>
     <el-divider></el-divider>
    <!-- 输入框 -->
    <el-row type="flex" style="margin-bottom: 30px;">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="value" clearable v-focus v-color="'#409EFF'">
           <el-button slot="append" type="primary" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>

      <el-col :span="4" :offset="14">
        <el-button type="success" icon="el-icon-plus" @click="open()">添加</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table 
      :data="search()" 
      stripe
      :header-cell-style="{
          'background-color': 'rgb(233, 228, 228)',
          'border-bottom': '1px solid #409EFF'
      }"
      border>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="姓名" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="date" label="操作时间">
        <template slot-scope="scope">
          <span>{{timestampToTime(scope.row.date)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <el-button @click="open(item.row)" type="text">编辑</el-button>
          <el-button @click="del(item.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination 
        background 
        layout="prev, pager, next" 
        :page-count="Math.ceil(list.length / 10)">
    </el-pagination>

    <!-- 弹出框 -->
    <el-dialog title="人员信息" :visible.sync="modelFormVisble" width="400px">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onOk()">确 定</el-button>
        <el-button @click="modelFormVisble = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      value: '', // 查询条件
      modelFormVisble: false, // 弹出框的状态 false：关，true：开
      formLabelWidth: "60px",
      form: {  // 弹出框的数据
        id: "",
        name: "",
        address: ""
      }
    };
  },
  created: function(){
    console.log('问号传值',this.$route.query.id, this.$route.query.name);
  },
  mounted: function(){
    this.getUserList();
  },
  computed:{ // 通过计算属性获取
    list(){
      return this.$store.getters.user;
    }
  },
  methods: {
    getUserList: function(){
      this.$store.dispatch('getUserAction')
    },
    del: function(id) {
      this.$store.dispatch('deleteUserAction', id).then(() => {
          this.getUserList();
      });
    },
    search: function() {
      let value = this.value;
      if (!value) return this.list;
      var newList = [];
      this.list.forEach(item => {
        if (item.name.indexOf(value) != -1) {
          newList.push(item);
        }
      });
      return newList;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
      var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
      var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    open: function(value) {
      this.modelFormVisble = true;
      if(!value){
        this.form.id = this.form.name = this.form.address = "";
        return;
      }
      let form = {
        id: value.id,
        name: value.name,
        address: value.address
      }
      this.form = form
    },
    onOk(){
      if (!this.form.name) {
          this.$message({
            message: "名字不能为空！",
            type: "warning"
          });
          return;
      }
      this.modelFormVisble = false;
      var user = {
          id: this.form.id,
          name: this.form.name,
          address: this.form.address,
          date: new Date()
      }
      if(this.form.id){ // 修改
          this.$store.dispatch('updateUserAction' ,user).then(() => {
              this.getUserList();
          });
      }else{ // 新增
          let len = this.list.length;
          let id = 1;
          if(len > 0){
            id = this.list[len - 1].id + 1;
          }
          user.id = id;
          this.$store.dispatch('addUserAction' ,user).then(() => {
              this.getUserList();
          });
      }
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.children[0].focus()
      }
    },
    color: {
      bind: function(el, binding){
        el.children[0].style.color = binding.value
      }
    }
  }
};
</script>

<style>
.el-pagination {
  margin-top: 30px;
  float: right;
}
</style>

