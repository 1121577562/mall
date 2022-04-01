<template>
    <div class="recommend">
        <div v-for="item in recommend" :key="item.id" class="recommendItem">
          <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
          </a>
        </div>
    </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .recommend  {
    display: flex;
    width: 100%;
    padding: 15px 0 30px;
    border-bottom: 8px solid #eee;
    text-align: center;
    font-size: 12px;
  }

  .recommendItem {
    flex: 1;
  }

  .recommendItem img {
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>