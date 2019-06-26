<template>
    <el-menu default-active="2"
    background-color="#353B4E"
    text-color="#ADAF9E"
    active-text-color="#ADAF9E"
    :router="true"
    @open="handleOpen"
    @close="handleClose">
    <img src="./logo_admin.png" alt="">
      <el-menu-item index="/">
          <template slot="title">  首页</template>
        </el-menu-item>
      <el-submenu index="2">
        <el-menu-item slot="title">内容管理</el-menu-item>
          <el-menu-item slot="title" index="/publish">发布文章</el-menu-item>
        <el-menu-item-group index="2-2">
          <el-menu-item slot="title">内容列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group index="2-3">
          <el-menu-item slot="title">评论列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group index="2-4">
          <el-menu-item slot="title">素材管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <el-menu-item slot="title">粉丝管理</el-menu-item>
        <el-menu-item-group index="3-1">
          <el-menu-item slot="title">图文数据</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group index="3-2">
          <el-menu-item slot="title">粉丝概况</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group index="3-3">
          <el-menu-item slot="title">粉丝画像</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group index="3-4">
          <el-menu-item slot="title">粉丝列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-menu-item index="4">
          <el-menu-item slot="title">账户信息</el-menu-item>
        </el-menu-item>
    </el-menu>
</template>
<script>
export default {
    name: 'AppAside',
    data () {
        return {}
    },
    methods: {
        handleOpen (key, keyPath) {
            console.log(key,keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>
<style lang="less" scoped>

</style>

