<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar  class="navBar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar :isTotalChecked="isTotalChecked" @allClick="allClick"/>
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
        isTotalChecked: false
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
    // 判断是否全部选中
    allSelect() {
      let cartList = this.$store.state.cartList;
      if (cartList.length !== 0) {
          this.isTotalChecked =cartList.every(item=> {
            return item.checked === true;
          })
      }
    },
    // 监听全选按钮的点击 (当点击全选按钮后，实现全部选中，再次点击，实现全部取消)
    allClick() {
      let cartList = this.$store.state.cartList,
          flag = this.isTotalChecked;
      if (cartList.length !== 0) {
          if(flag) {
            cartList.map(item=> {
              return item.checked = false;
            });
          } else {
            cartList.map(item=> {
              return item.checked = true;
            });
          }
          this.allSelect();
      }
    }
  },

  created() {
    // console.log(this.$store);
  },

  activated() {
    console.log(this.$store.state.cartList);
    // 当页面处于活跃状态时，调用 allSelect 方法，判断是否全部选中
    this.allSelect();
  },
  mounted() {
    // 监听取消选中的事件
    this.$bus.$on("cancelSelect", ()=> {
      this.allSelect();
    })
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