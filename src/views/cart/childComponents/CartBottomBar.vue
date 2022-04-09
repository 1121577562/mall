<template>
  <div class="cartBottomBar">
      <div class="checkArea" >
        <check-button 
            class="checkButton"
            :isChecked="isTotalChecked"
            @click.native="allClick"/>
        <span>全选</span>
      </div>
      
      <div class="CartPrice">
        合计: {{totalPrice}}
      </div>

      <div class="calculation" @click="calculationClick">
        去计算: ({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton: CheckButton
  },
  computed: {
    totalPrice() {
     return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item)=> {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    
    // 判断是否全部选中
    isTotalChecked() {
      let cartList = this.$store.state.cartList;
      if(cartList.length === 0) return false;
      return !cartList.find(item => !item.checked);
    },
  },
  methods: {
    //=> 1.监听全选按钮的点击 (当点击全选按钮后，实现全部选中，再次点击，实现全部取消)
    allClick() {
      let cartList = this.$store.state.cartList;
      if(this.isTotalChecked) { //=>全部选中
        cartList.forEach(item => {
          return item.checked = false;
        })
      } else { //=>部分 或者 全部不选中
        cartList.forEach(item => {
          return item.checked = true;
        })
      } 
    },
    //=> 2.监听去计算的按钮
    calculationClick() {
      // 如果没有选择商品，则提升用户去选择商品
      if(!this.isTotalChecked) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    }
  }
}
</script>

<style scoped>
  .cartBottomBar {
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    background-color: #eee;
  }

  .checkArea {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  .checkButton {
    width: 28px;
    height: 28px;
    margin-right: 5px;
    text-align: center;
    line-height: 28px;  
  }

  .CartPrice {
    flex: 1;
    margin-left: 20px;
  }

  .calculation {
    height: 40px;
    padding: 0 10px;
    text-align: center;
    line-height: 40px;
    background-color: #f94800;
    color: #fff;
  }
</style>