<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
// 导入detail 的子组件
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'


// 导入detail模块的网络请求
import {getDetail, Goods} from 'network/detail.js'

export default {
  name: "Detail",
  components: {
    DetailNavBar: DetailNavBar,
    DetailSwiper: DetailSwiper,
    DetailBaseInfo: DetailBaseInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid =  this.$route.params.id;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1.获取轮播数据
      console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;
     
      // 2.获取商品数据(使用面向对象的思想对数据进行整合)
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    
    });
  },

  methods: {

  }
}
</script>

<style>

</style>