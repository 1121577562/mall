<template>
  <div id="detail">
    <detail-nav-bar class="detailNavBar" @titleClick="titleClick" ref="nav"/>
    <!-- 加入滚动效果 -->
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-parmas-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from './childComponents/DetailBottomBar.vue'

// 导入公共组件
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


// 导入detail模块的网络请求
import {getDetail,getRecommend, Goods, Shop, GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'

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
    DetailBottomBar: DetailBottomBar,
    Scroll: Scroll,
    GoodsList: GoodsList
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      itemImgListener: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: null
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

      // 获取参数、评论、推荐的 offsetTop的值(但是在这个地方获取的不正确)
      // 1.第一次获取，值不对
      // 原因：this.$refs.params.$el 压根没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      // console.log(this.themeTopYs);
      
      // // 当DOM结构渲染完成后，会调用传递给 $nextTick的回调函数。
      // this.$nextTick(()=> {
      //   // 2.第二次获取：值不对
      //   // 原因：图片没有计算在类
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
      //   // offsetTop值不对的时候，都是因为图片的问题。
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

      //   console.log(this.themeTopYs);
      // })

    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(res);
    });

    // 4.给getThemeTopY 赋值(对this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(()=> {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      console.log(this.themeTopYs);
    }, 200);
  },

  methods: {
    // 监听详情页面图片是否加载完成，手动调用 refresh方法 (防止better-scroll计算高度的问题)
    imageLoad() {
      this.$refs.scroll.refresh();
      // 图片加载完成后，获取参数、评论、推荐模块的 offsetTop 值。
      this.getThemeTopY();
    },

    // 监听标题的点击，并且拿到点击的索引值
    titleClick(index) {
      // console.log(index);
      // 调用 this.$refs.scroll.scrollTo 方法，实现点击标题滚动到对应的区域。
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },

    // 监听页面的滚动，实现标题联动效果
    contentScroll(position) {
        //=>1.获取y的值
        //获取的y 值为负数，因此加一个负号，转换为正数
        let positionY = -position.y;
       
        //=>2.positionY 和 主题中值进行对比
        //[0, 6491, 7238, 7548, Number.MAX_VALUE]
        // positionY 在 0 和 6491 之间，index = 0
        // positionY 在 6491 和 7238 之间，index = 1
        // positionY 在 7238 和 7548 之间，index = 2
    
        // positionY 超过 7548，index = 3
        let length = this.themeTopYs.length;
        
        // for(let i = 0; i < length; i++) {
        //   if(this.currentIndex !== i && ((i < length -1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])||(i === length -1 && positionY >= this.themeTopYs[i]))) {
        //     this.currentIndex = i;
        //     this.$refs.nav.currentIndex = this.currentIndex;
        //     console.log(i);
        //   }
        // }

        //=> 对判断条件进行简写 (主要是在themeTopYs 的最后添加一个最大的数，然后就不需要判断区间了，但是在遍历这个数组的时候，不需要取出最大值,因此length 需要减1)
        for(let i = 0; i < length -1; i++) {
          if((this.currentIndex !== i) && (positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex;
            console.log(i);
          }
      }

      // 3.是否显示回到顶部按钮
      this.listenShowBackTop(positionY);
    },

    addToCart() {
      //=>1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price =this.goods.realPrice;
      product.iid = this.iid;

      //=>2.将商品添加到购物车里面
      // this.$store.commit('addCart', product);
      this.$store.dispatch('addCart', product)
      // console.log(product)
    }

  },
  mounted() {
    // 监听推荐的图片是否加载完成，并且做防抖操作,然后调用 refresh方法，重新计算高度。
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () =>{
      refresh();
    }
    this.$bus.$on("ItemImageLoad",this.itemImgListener);

    // 获取参数、评论、推荐的 offsetTop的值(但是在这个地方获取的不正确)
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

    // console.log(this.themeTopYs);
  },
  destroyed() {
    // 在当前组件销毁的时候，取消ItemImageLoad 事件的监听 (应该Detail组件，没有被keep-alive包裹，因此不能监听到 deactivated 事件)
    this.$bus.$off("ItemImageLoad",this.itemImgListener)
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
   height: calc(100% - 44px - 49px);
 }


</style>