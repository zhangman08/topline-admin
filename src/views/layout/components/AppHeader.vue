<template>
    <el-row>
  <el-col :span="12"><div class="grid-content bg-purple"><p>江苏传智播客教育科技股份有限公司</p></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
        <el-dropdown>
            <img width="30" :src="userInfo.photo">
  <span class="el-dropdown-link">
    {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人信息</el-dropdown-item>
    <el-dropdown-item>git</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </div>
      </el-col>
</el-row>
</template>
<script>
// import { userInfo } from 'os';
export default {
    name: 'AppHeader',
    data () {
         return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  }
}
</script>
<style lang="less" scoped>
.bg-purple-light {
    float: right;
}
.el-row {
    line-height: 60px;
    .el-dropdown-link {
        cursor: pointer;
    }
}
</style>

