<template>
  <div class="category">
    <nav-bar class="categoryNavBar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="categoryContent">
      <tab-menu :categorys="categorys" @tabMenuItemClick="tabMenuItemClick"/>
      <scroll id="tabContent" ref="scroll">
        <tab-content-category :subCategories="showSubCategories"></tab-content-category>
        <tab-control :titles="['综合', '新品','销量']" @tabClick="tabClick"/>
        <tab-content-detail :categoryDetail="showCategoryDetail"/>
      </scroll>
    </div>
  </div>
</template>

<script>
// 引入公共组件
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'

// 引入子组件
import TabMenu from './childComponents/TabMenu.vue'
import TabContentCategory from './childComponents/TabContentCategory.vue'
import TabContentDetail from './childComponents/TabContentDetail.vue'

// 引入API、方法
import {getCategory, getSubCategory, getCategoryDetail} from 'network/category.js'
import {POP, NEW, SELL} from 'common/const.js'

export default {
  name: "Category",
  components: {
    NavBar: NavBar,
    Scroll: Scroll,
    TabControl: TabControl,
    TabMenu: TabMenu,
    TabContentCategory: TabContentCategory,
    TabContentDetail: TabContentDetail
  },
  data() {
    return {
      categorys: [],
      categoryData: [],
      currentIndex: -1,
      currentType: POP
    }
  },
  // 组件创建完成后调用 created函数
  created() {
    // 1.请求分类菜单信息
    this._getCategory();
  },
  mounted() {
    this.$bus.$on("ItemImageLoad", ()=> {
      this.$refs.scroll.refresh();
    })
  },
  computed: {
    showSubCategories() {
      // 如果数据没有请求回来，则默认返回一个空对象，否则返回该类别的数据
      if(this.currentIndex === -1) {
        return {}
      }
      return this.categoryData[this.currentIndex].subCategories;
    },
    showCategoryDetail() {
      if(this.currentIndex === -1) {
        return []
      }
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    }
  },
  methods: {
    _getCategory() {
      getCategory().then(res=> {
        // 1.获取分类数据
        this.categorys = res.data.category.list;

        // 2.初始化每个类别的子数据
        for(let i = 0; i < this.categorys.length; i++) {
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              "pop": [],
              "new": [],
              "sell": []
            }
          }
        }

        // 3.请求第一个分类的数据
        this._getSubCategories(0);
      })
    },
    _getSubCategories(index) {
      this.currentIndex = index;
      const mailKey = this.categorys[index].maitKey;
      getSubCategory(mailKey).then(res => {
        // console.log(res);
        this.categoryData[index].subCategories = res.data;
        // 不知道这句话的意义 (这句话的意思是，把categoryData 数组，转换为对象进行存储)
        this.categoryData = {...this.categoryData};
        this._getCateGoryDetail(POP);
        this._getCateGoryDetail(SELL);
        this._getCateGoryDetail(NEW);
      })
    },
    _getCateGoryDetail(type) {
      //1.获取请求的miniWallkey
      const miniWallkey = this.categorys[this.currentIndex].miniWallkey;
      //2.发送请求，传入miniWallkey 和 type
      getCategoryDetail(miniWallkey, type).then(res => { 
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = {...this.categoryData};
      });
    },

    //监听tabControl组件发出的事件
    tabClick(index) {
      console.log(this.categoryData[0]);
      // console.log(index);
      switch(index) {
        case 0:
          this.currentType = POP;
        break;
        case 1:
          this.currentType = NEW;
        break;
        case 2:
          this.currentType = SELL;
        break;  
      }
      // console.log(this.currentType);
    },

    // 监听左侧menu菜单的点击，然后请求数据
    tabMenuItemClick(index) {
      this._getSubCategories(index);
      console.log(index);
    }
  }
}
</script>

<style>
/* npm install better-scroll@1.13.2 --save */

.category {
  height: 100vh;
}

.categoryNavBar {
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}

.categoryContent {
  display: flex;
  height: calc(100% - 44px - 49px);
}

#tabContent {
  flex: 1;
}

</style>