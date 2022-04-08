<template>
  <div class="cartList">
    <scroll class="content" ref="scroll"> 
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item" />
    </scroll>
    <cart-bottom-bar :isTotalChecked="isTotalChecked" @allClick="allClick"/>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem.vue'
import CartBottomBar from './CartBottomBar.vue'

import {mapGetters} from 'vuex';


export default {
  name: "CartList",
  components: {
    Scroll: Scroll,
    CartListItem: CartListItem,
    CartBottomBar: CartBottomBar
  },
  data(){
    return {
      isTotalChecked: false
    }
  },
  computed: {
    ...mapGetters(["cartList"])
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

  activated() {
    //=>当重新进入Cart页面后，调用refresh方法，刷新页面，让better-scroll重新计算可滚动的高度
    this.$refs.scroll.refresh();
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
  /* cartList区域的高度为：视口的高度减去 navBar的高度 和 tabBar的高度 、CartBottomBar的高度*/
  .cartList {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>