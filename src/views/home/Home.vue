<template>
  <div id="home"> 
    <nav-bar class="hom-nav">
      <div slot="center">购物街</div>
    </nav-bar>

    <home-swiper :banners="banners"/>
    <recommend-view :recommend="recommends"/>
   
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import HomeSwiper from './childrenComponents/HomeSwiper.vue'
import RecommendView from './childrenComponents/RecommendView.vue'


import {getHomeMultidata} from 'network/home.js'


export default {
  name: "Home",
  components: {
    NavBar: NavBar,
    HomeSwiper: HomeSwiper,
    RecommendView: RecommendView
  },
  data(){
    return {
     banners: [],
     recommends: [],
    }
  },
  methods: {
    
  },
  created() {
      // 1.请求多个数据
      getHomeMultidata().then(res=> {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
  }
}
</script>
  
<style>
  .hom-nav {
    background-color: var(--color-tint);
    color: #fff; 
  }
</style>