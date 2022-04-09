<template>
    <div class="goods-list-item" @click="itemClick">
        <div class="pic">
          <!-- :key="showImage" 动态绑定key，是为了防止Vue对组件的复用，造成图片不变  -->
          <img v-lazy="showImage" alt="" :key="showImage" @load="imgLoad">
        </div>
        <div class="goods-detail">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <i class="icon"></i>
          <span class="hobbise">{{goodsItem.cfav}}</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  computed: {
    showImage() {
      // 如果存在 image，则使用image，否则再往show中取img
      return this.goodsItem.image || this.goodsItem.show.img;
    }
  },
  methods: {
    // 1. 监听图片是否加载完成
    /**
     *  遇到的问题：
     *     在Home.vue 文件监听ItemImageLoad 事件时是可以的，但是又在 Detail.vue 文件中使用到该组件了，因此在Detail.vue 文件中，当图片加载完成后，也会触发ItemImageLoad事件，但是Detail.vue 文件中的图片加载完成后，不应该在 Home.vue 文件中监听 ItemImageLoad 事件，而是在 Detail.vue 文件中监听。
     *  解决方法：
     *     1.在这个地方监听 this.$route.path 是否等 "/home" 或者 "/detail"， 然后发出不同的事件。
     *     2.使用vue 中的混入方法 (暂时没有使用 混入技术，而是在每个组件中写重复的代码)
     *           分为：
     *               全局混入 Vue.mixins
     *               局部混入 mixins: [mixin对象]
     */
    imgLoad() {
      // console.log("图片已经加载完成");
      this.$bus.$emit("ItemImageLoad")
    },
    // 2. 监听goodsItem的点击，并且跳转到详情页面
    itemClick() {
      console.log("详情页面监听成功!!!!");
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style>
  .goods-list-item {
    box-sizing: border-box;
    position: relative;
    width: 50%;
    margin-bottom: 55px;
  }


  .goods-list-item:nth-child(2n+1) {
    padding-right: 5px;
  }


  .goods-list-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-detail {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -44px;
    text-align: center;
  }

  .goods-detail p{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-detail .price {
    color: var(--color-high-text);
  }

  .goods-detail .hobbise::before {
    content: "";
    display: inline-block;
    width: 22px;
    height: 22px;
    background: url('assets/img/detail/detail_bottom.png') no-repeat center;
    background-position: 2px 6px;
    background-size: 80%;
  }


</style>