<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar  class="navBar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'


import CartList from './childComponents/CartList.vue'
import CartBottomBar from './childComponents/CartBottomBar.vue'

import {mapGetters} from 'vuex'



export default {
  name: "Cart",
  components: {
    NavBar: NavBar,
    CartList: CartList,
    CartBottomBar: CartBottomBar
  },
  data() {
    return {
    }
  },
  computed: {
    /**
     *  mapGetters 的作用：
     *    它可以把在 Vuex中 定义的 getters，拿过来作为某些组件的计算属性。
     *  两种用法:
     *    ...mapGetters(["cartLength"]) 此时 cartLength 和 getters对象中的 cartLength对应。
     *    ...mapGetters({
            length: "cartLength"
          });  相当于给 getters 起了一个别名
     *    
     */
    // ...mapGetters(["cartLength"]);
     ...mapGetters({
       length: "cartLength"
     })
  },
  methods: {
  },

  created() {
    // console.log(this.$store);
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .navBar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>