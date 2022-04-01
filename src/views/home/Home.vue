<template>
  <div id="home"> 
    <nav-bar class="hom-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommend="recommends"/>
    <feature-view/>
    <tab-control  class="fixed" 
                  :titles="['流行','新款', '精选']" 
                  @tabClick="handleClick"/>

    <goods-list :goods="goods[currentType].list"/>




    <ul>
      <li>我是列表1</li>
    <li>我是列表2</li>
    <li>我是列表3</li>
    <li>我是列表4</li>
    <li>我是列表5</li>
    <li>我是列表6</li>
    <li>我是列表7</li>
    <li>我是列表8</li>
    <li>我是列表9</li>
    <li>我是列表10</li>
    <li>我是列表11</li>
    <li>我是列表12</li>
    <li>我是列表13</li>
    <li>我是列表14</li>
    <li>我是列表15</li>
    <li>我是列表16</li>
    <li>我是列表17</li>
    <li>我是列表18</li>
    <li>我是列表19</li>
    <li>我是列表20</li>
    <li>我是列表21</li>
    <li>我是列表22</li>
    <li>我是列表23</li>
    <li>我是列表24</li>
    <li>我是列表25</li>
    <li>我是列表26</li>
    <li>我是列表27</li>
    <li>我是列表28</li>
    <li>我是列表29</li>
    <li>我是列表30</li>
    <li>我是列表31</li>
    <li>我是列表32</li>
    <li>我是列表33</li>
    <li>我是列表34</li>
    <li>我是列表35</li>
    <li>我是列表36</li>
    <li>我是列表37</li>
    <li>我是列表38</li>
    <li>我是列表39</li>
    <li>我是列表40</li>
    <li>我是列表41</li>
    <li>我是列表42</li>
    <li>我是列表43</li>
    <li>我是列表44</li>
    <li>我是列表45</li>
    <li>我是列表46</li>
    <li>我是列表47</li>
    <li>我是列表48</li>
    <li>我是列表49</li>
    <li>我是列表50</li>
    <li>我是列表51</li>
    <li>我是列表52</li>
    <li>我是列表53</li>
    <li>我是列表54</li>
    <li>我是列表55</li>
    <li>我是列表56</li>
    <li>我是列表57</li>
    <li>我是列表58</li>
    <li>我是列表59</li>
    <li>我是列表60</li>
    <li>我是列表61</li>
    <li>我是列表62</li>
    <li>我是列表63</li>
    <li>我是列表64</li>
    <li>我是列表65</li>
    <li>我是列表66</li>
    <li>我是列表67</li>
    <li>我是列表68</li>
    <li>我是列表69</li>
    <li>我是列表70</li>
    <li>我是列表71</li>
    <li>我是列表72</li>
    <li>我是列表73</li>
    <li>我是列表74</li>
    <li>我是列表75</li>
    <li>我是列表76</li>
    <li>我是列表77</li>
    <li>我是列表78</li>
    <li>我是列表79</li>
    <li>我是列表80</li>
    <li>我是列表81</li>
    <li>我是列表82</li>
    <li>我是列表83</li>
    <li>我是列表84</li>
    <li>我是列表85</li>
    <li>我是列表86</li>
    <li>我是列表87</li>
    <li>我是列表88</li>
    <li>我是列表89</li>
    <li>我是列表90</li>
    <li>我是列表91</li>
    <li>我是列表92</li>
    <li>我是列表93</li>
    <li>我是列表94</li>
    <li>我是列表95</li>
    <li>我是列表96</li>
    <li>我是列表97</li>
    <li>我是列表98</li>
    <li>我是列表99</li>
    <li>我是列表100</li>
    </ul>

  </div>
</template>

<script>
//=> 公共组件
import NavBar from 'components/common/navbar/NavBar.vue';
import TabControl from 'components/content/tabControl/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

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
     currentType: 'pop'
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
    }
  }

}
</script>
  
<style>
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
</style>