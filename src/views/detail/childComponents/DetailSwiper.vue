<template>
    <div class="detail-swiper">
      <swiper  class="swiper-item">
        <swiper-item v-for="item in topImages" :key="item">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
    </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'


export default {
  name: "DetailSwiper",
  components: {
    Swiper:Swiper,
    SwiperItem: SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  
}
</script>

<style>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }
</style>