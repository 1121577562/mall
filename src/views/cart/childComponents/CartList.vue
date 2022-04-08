<template>
  <div class="cartList">
    <scroll class="content" ref="scroll"> 
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'

import {mapGetters} from 'vuex';


export default {
  name: "CartList",
  components: {
    Scroll: Scroll,
    CartListItem: CartListItem
  },
  data(){
    return {
      // isTotalChecked: false
    }
  },
  computed: {
    ...mapGetters(["cartList"])
  },

  activated() {
    //=>当重新进入Cart页面后，调用refresh方法，刷新页面，让better-scroll重新计算可滚动的高度
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  /* cartList区域的高度为：视口的高度减去 navBar的高度 和 tabBar的高度 、CartBottomBar的高度*/
  .cartList {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>