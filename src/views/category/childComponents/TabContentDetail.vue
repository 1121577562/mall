<template>
  <div class="tabContentDetail">
    <goods-list-item v-for="(item,index) in categoryDetail" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem.vue'
export default {
  name: "TabContentDetail",
  props: {
    categoryDetail: {
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

<style scoped>
  .tabContentDetail {
    display: flex;
    flex-wrap: wrap;
  }
</style>