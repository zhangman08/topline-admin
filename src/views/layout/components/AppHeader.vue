<template>
    <el-row>
  <el-col :span="12"><div class="grid-content bg-purple"><p>江苏传智播客教育科技股份有限公司</p></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light">
  <el-dropdown trigger="click">
  <span class="el-dropdown-link">
            <img width="30" :src="userInfo.photo">
    {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人信息</el-dropdown-item>
    <el-dropdown-item>git</el-dropdown-item>
    <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
  </el-dropdown-menu>
    </el-dropdown>
    </div>
      </el-col>
</el-row>
</template>
<script>
import { removeUser,getUser } from '@/utils/auth'
export default {
  name: 'AppHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  this.userInfo = getUser()
  },
  methods: {
    handleLogout () {
      this.$confirm('确定退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // window.localStorage.removeItem('user_info')
        removeUser()
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
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