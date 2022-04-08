<template>
  <div class="cartBottomBar">
      <div class="checkArea" @click="allClick">
        <check-button class="checkButton" :isChecked="isTotalChecked"/>
        <span>全选</span>
      </div>
      
      <div class="CartPrice">
        合计: {{totalPrice}}
      </div>

      <div class="calculation">
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
  props: {
    isTotalChecked: {
      type: Boolean,
      default: false
    }
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
    }
  },
  methods: {
    allClick() {
      this.$emit("allClick");
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