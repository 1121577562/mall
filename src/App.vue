<template>
  <div id="app">
    <keep-alive exclude="Detail">
       <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>

import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue';



export default {
  name: 'App',
  components: {
    MainTabBar: MainTabBar
  }
}
</script>

<style>
  /* 引入初始化样式 */
  @import "assets/css/base.css";

</style>
