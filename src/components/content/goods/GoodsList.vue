<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>  
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem: GoodsListItem
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 5px;
  }

</style>