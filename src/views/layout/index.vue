<template>
    <el-container>
  <el-aside width="200px">
      <AppAside/>
  </el-aside>
  <el-container>
    <el-header>
        <AppHeader/>
    </el-header>
    <el-main>
        <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import AppAside from './components/AppAside'
import AppHeader from './components/AppHeader'
export default {
 name: 'AppLayout',
 components: {
 AppAside,
 AppHeader
 },
 data () {
 return {}
        }
}
</script>
<style lang="less" scoped>
.el-container {
    height: 100%;
}
.el-aside {
    background-color: #323745;
}
.el-header {
    background-color: #fff;
}
.el-main {
    background-color: #F2F3F5;
}
</style>

