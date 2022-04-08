<template>
    <div class="bottomBar">
      <div class="barItem bar-left">
        <div>
          <i class="icon service"></i>
          <span class="text">客服</span>
        </div>
        <div>
          <i class="icon shop"></i>
          <span class="text">店铺</span>
        </div>
        <div>
          <i class="icon select"></i>
          <span class="text">收藏</span>
        </div>
      </div>
      <div class="barItem bar-right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div>
    </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      console.log("加入到购物车")
      this.$emit("addCart")
    }
  }
}
</script>

<style scoped>
  .bottomBar {
    display: flex;

    height: 49px;
    background-color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /* 不能使用相对定位，否则会有bug，当滚动bottomBar组件时，也会滚上去 */
    /* position: relative; *
    /
    /* bottom: 49px; */

    box-shadow: 0 -1px 5px rgb(100 100 100 / 20%);
  }

  .barItem {
    flex: 1;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
  }

  .bar-left  {
    padding-bottom: 5px;
  }

  .bar-left div{
    display: flex;
    align-items: center;
    flex-direction: column;   
  }

  .icon {
    display: block;
    width: 25px;
    height: 24px;
    background: url('~assets/img/detail/detail_bottom.png') no-repeat;
    background-size: 100%;
    padding-bottom: 2px;
  }  

  .icon.service {
    background-position: 0 -60px;
  }

 .icon.shop {
    background-position: 0 -111px;
  }
   
 .icon.select {
    background-position: 0 1px;
 }

  .bar-right div {
    flex: 1;
    padding: 5px 0;
    line-height: 39px;
    text-align: center;
    font-size: 14px;
  }

  .bar-right .cart {
    background-color: #ffe611;
  }

  .bar-right .buy {
    background-color: #ff728c;
  }
</style>