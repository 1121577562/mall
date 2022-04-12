<template>
  <div class="tabContentCategory">
    <div class="contentItem" v-for="(item, index) in subCategories.list" :key="index">
      <img :src="item.image" alt="">
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subCategories: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .tabContentCategory {
    flex: 1;
    padding: 20px 8px;
    display: flex;
    flex-wrap: wrap;
  }

  .tabContentCategory .contentItem{
    width: 81px;
    margin-right: 8px;
    text-align: center;
  }

  .tabContentCategory .contentItem:nth-child(3n) {
    margin-right: 0;
  }

  .tabContentCategory .contentItem:nth-child(n+4) {
    margin-top: 15px;
  }

  .tabContentCategory .contentItem p {
    margin-top: 15px;
  }

  .contentItem img{
    width: 100%;
  }
</style>