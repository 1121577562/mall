<template>
  <div id="detail">
    <detail-nav-bar class="detailNavBar"/>
    <!-- 加入滚动效果 -->
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-parmas-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
// 导入detail 的子组件
import DetailNavBar from './childComponents/DetailNavBar.vue'
import DetailSwiper from './childComponents/DetailSwiper.vue'
import DetailBaseInfo from './childComponents/DetailBaseInfo.vue'
import DetailShopInfo from './childComponents/DetailShopInfo.vue'
import DetailGoodsInfo from './childComponents/DetailGoodsInfo.vue'
import DetailParmasInfo from './childComponents/DetailParmasInfo.vue'
import DetailCommentInfo from './childComponents/DetailCommentInfo.vue'

// 导入公共组件
import Scroll from 'components/common/scroll/Scroll.vue'


// 导入detail模块的网络请求
import {getDetail, Goods, Shop, GoodsParam} from 'network/detail.js'


export default {
  name: "Detail",
  components: {
    DetailNavBar: DetailNavBar,
    DetailSwiper: DetailSwiper,
    DetailBaseInfo: DetailBaseInfo,
    DetailShopInfo: DetailShopInfo,
    DetailGoodsInfo: DetailGoodsInfo,
    DetailParmasInfo: DetailParmasInfo,
    DetailCommentInfo: DetailCommentInfo,
    Scroll: Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid =  this.$route.params.id;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);

      // 1. 获取数据
      const data = res.result;

      // 2.取出轮播图的数据
      this.topImages = res.result.itemInfo.topImages;
     
      // 3.获取商品数据(使用面向对象的思想对数据进行整合)
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 4.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 5.保存商品的详情数据
      this.detailInfo = data.detailInfo;


      // 6.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 7.取出评论的信息
      if(data.rate.cRate !== 0) {
        // 如果评论信息存在，则在取出list中的一条信息
        this.commentInfo = data.rate.list[0];
      }
    });
  },

  methods: {
    // 监听详情页面图片是否加载完成，手动调用 refresh方法 (防止better-scroll计算高度的问题)
    imageLoad() {
      this.$refs.scroll.refresh();
    }
  }
}
</script>z

<style scoped>
 #detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  /* 把detail页面的高度，设置为视口的高度 */
  height: 100vh;
 }

  /* 给detailNavBar设置定位，提高它的层级 */
  .detailNavBar {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  /* 使用 calc函数，动态计算 content内容的高度 */
 .content {
   height: calc(100% - 44px);
 }


</style>