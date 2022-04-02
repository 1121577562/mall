<template>
  <div id="home"> 
    <nav-bar class="hom-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" 
            ref="scroll" 
            :probeType="3" 
            :pullUpLoad="true" 
            @scroll="scrollClick"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommend="recommends"/>
      <feature-view/>
      <tab-control  class="fixed" 
                    :titles="['流行','新款', '精选']" 
                    @tabClick="handleClick"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>


    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>



  </div>
</template>

<script>
//=> 公共组件
import NavBar from 'components/common/navbar/NavBar.vue';
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop.vue'

//=> home 模块中的子组件
import HomeSwiper from './childrenComponents/HomeSwiper.vue'
import RecommendView from './childrenComponents/RecommendView.vue'
import FeatureView from './childrenComponents/FeatureView.vue'

//=> 网络请求相关
import {getHomeMultidata,getHomeGoods} from 'network/home.js'


export default {
  name: "Home",
  components: {
    NavBar: NavBar,
    TabControl: TabControl,
    GoodsList: GoodsList,
    Scroll: Scroll,
    BackTop:BackTop,
    HomeSwiper: HomeSwiper,
    RecommendView: RecommendView,
    FeatureView: FeatureView
  },
  data(){
    return {
     banners: [],
     recommends: [],
     goods: {
       'pop': {
         page: 0,
         list: []
       },
       'new': {
         page: 0,
         list: []
       },
       'sell': {
         page: 0,
         list: []
       }
     },
     currentType: 'pop',
     isShowBackTop: false
    }
  },
  created() {
      // 1.请求多个数据
      this.getHomeData();

      // 2.请求商品数据
      Object.keys(this.goods).forEach(item => {
        this.getHomeGoods(item);
      });
      // this.getHomeGoods('pop');
      // this.getHomeGoods('new');
      // this.getHomeGoods('sell');
  },

  methods: {
    // 把网络请求的业务逻辑，放入 methods，在created回调函数中直接调取这些方法即可。
    getHomeData() {
       getHomeMultidata().then(res=> {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      //=>1.获page的初始值，动态计算 page的值。
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
      //=>2.存储数据 和  改变页码。
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //=>3.数据加载完成后，还要调用finishPullUp 返回，才能继续下一次上拉加载更多数据。
        this.$refs.scroll.finishPullUp();
      });
    },


    // 事件监听的方法：
    handleClick(index) {
       switch(index) {
        case 0:
          this.currentType = "pop"
          break;
        case 1:
          this.currentType = "new"
          break;
        case 2:
          this.currentType = "sell"
          break;    
      }
    },

    //=>监听回到顶部组件
    backClick() {
      //给组件绑定点击事件，那么不能监听原生的点击事件，如果需要监听，需要添加修饰符 .native, 才可以监听。
      this.$refs.scroll.scrollTo(0, 0, 500);
      // console.log("backClick", this.$refs);
    },
    // 监听滚动的位置
    scrollClick(position) {
      // console.log(position);
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    // 监听上拉加载更多事件
    loadMore() {
      this.getHomeGoods(this.currentType);
      console.log("上拉加载更多");
    }
  }
}
</script>
  
<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .hom-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    background-color: var(--color-tint);
    color: #fff; 
  }

  .fixed  {
    /* 当top值还没有达到 44px时，position的值为static，一旦达到44px，则就变成 fixed */
    position: sticky;
    top: 44px;
    left: 0;
    z-index: 10;
  }

  .content {
    /* 为什么这样定位之后，就可以让content的高度变为想要的需要去了解 */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 93px);
  } */
</style>