<template>
  <div class="profile">
    <nav-bar class="navBar">
      <div slot="left" class="arrow"></div>
      <div slot="center">我的购物街</div>
      <div slot="right" class="dot">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <header-content />
      <listGroup class="listGroup1"> 
      <list-group-item>
        <div class="listGroupItem">
          <img src="~assets/img/profile/jd/pay.png" alt="">
          <p class="desc">代付款</p>
        </div>
        <div class="listGroupItem">
          <img src="~assets/img/profile/jd/receiver.png" alt="">
          <p class="desc">待收货</p>
        </div>  
        <div class="listGroupItem">
          <img src="~assets/img/profile/jd/regoods.png" alt="">
          <p class="desc">退换 / 售后</p>
        </div>  
        <div class="listGroupItem">
          <img src="~assets/img/profile/jd/indent.png" alt="">
          <p class="desc">全部订单</p>
        </div>    
      </list-group-item>
      </listGroup>
      <listGroup class="listGroup2">
      <list-group-item>
        <div class="listGroupItem">
          <span>0</span>
          <p class="desc">优惠券</p>
        </div>
        <div class="listGroupItem">
          <span>开通有礼</span>
          <p class="desc">白条</p>
        </div>  
        <div class="listGroupItem">
          <span>239</span>
          <p class="desc">京豆</p>
        </div>  
        <div class="listGroupItem">
          <span>0</span>
          <p class="desc">红包</p>
        </div>    
        <div class="listGroupItem">
          <img src="~assets/img/profile/jd/assets.png" alt="">
          <p class="desc">我的资产</p>
        </div>    
      </list-group-item>
      </listGroup>
      <activity/>
      <goods-list :goods="recommends"/>
    </scroll>
  </div>
</template>

<script>
// 导入公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

// 导入子组件
import HeaderContent from './childComponents/HeaderContent.vue'
import ListGroup from './childComponents/ListGroup.vue'
import ListGroupItem from './childComponents/ListGroupItem.vue'
import Activity from './childComponents/Activity.vue'

// 导入 API、方法
import {getRecommend} from 'network/detail.js'
import {debounce} from 'common/utils.js'


export default {
  name: "Profile",
  components: {
    NavBar: NavBar,
    GoodsList: GoodsList,
    Scroll:Scroll,
    HeaderContent: HeaderContent,
    ListGroup: ListGroup,
    ListGroupItem: ListGroupItem,
    Activity: Activity,
    Scroll
  },
  data() {
    return {
      recommends: [],
    }
  },
  created() {
    // 1.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(res);
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 2000);
    this.$bus.$on("ItemImageLoad", refresh)
  }
}
</script>

<style scoped>
  .profile {
    height: 100vh;
    background-color: #f7f7f7;
  }

  .navBar {
    position: relative;
    z-index: 1;
    font-size: 14px;
    color: #333;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .arrow::before {
    content: "";
    display: block;
    width: 15px;
    height: 15px;
    border-left: 2px solid #5d5f6a;
    border-bottom: 2px solid #5d5f6a;
    transform: rotate(45deg);
    margin-left: 10px;
  }

  .dot span {
    display: inline-block;
    width: 5px;
    height: 5px;
    background-color: #5d5f6a;
    border-radius: 50%;
    margin: 0 3px;
  }

  .listGroup1 {
    position: relative;
    top: -16px;
  }

  

</style>