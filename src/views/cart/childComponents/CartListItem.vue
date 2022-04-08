<template>
  <div class="cartListItem">
    <div class="itemSelector">
      <check-button :isChecked="product.checked" @click.native="checkClick"/>
    </div>
    <div class="itemImg">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="itemInfo">
      <div class="itemTile">{{product.title}}</div>
      <div class="itemDesc">{{product.desc}}</div>
      <div class="infoBottom">
        <div class="itemPrice">￥{{product.price}}</div>
        <div class="itemCount">X{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'

export default {
  name: "CartListItem",
  components: {
    CheckButton: CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  methods: {
    // 点击选中按钮，实现选中 和 不选中效果。(默认情况下是选中的)
    checkClick() {
      this.product.checked = !this.product.checked; 

      // 点击选中按钮后，往外发出一个事件
      this.$bus.$emit("cancelSelect")
    }
  }
}
</script>

<style scoped>
  .cartListItem {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #aaa;
  }

  .cartListItem .itemSelector {
    width: 28px;
    height: 28px;
    padding-right: 5px;
    text-align: center;
  }

  .cartListItem .itemImg img {
    width: 100px;
    height: 120px;
    border-radius: 5px;
  }

  .cartListItem .itemInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding-left: 10px;
    font-size: 14px;
  }

  .itemInfo .itemTile, .itemInfo .itemDesc {
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }


 .itemInfo .itemTile {
   font-size: 18px;
   font-weight: 700;
 }

 .infoBottom {
   display: flex;
   justify-content: space-between;
 }
 
 .infoBottom .itemPrice{
    font-size: 19px;
    color: #c66d30;
 }

 .infoBottom .itemCount {
   font-size: 18px;
 }

</style>