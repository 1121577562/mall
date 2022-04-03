<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // console.log(this.$refs.wrapper);
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // console.log(this.scroll);

    //2.监听滚动的位置
    this.scroll.on("scroll", (position)=> {
        // console.log(position);
        this.$emit("scroll", position)
    });

    //3.监听是否滚动到底部，实现下拉加载更多数据
    this.scroll.on("pullingUp", ()=> {
        this.$emit("pullingUp")
        // console.log("上拉加载更多的数据");
      
    });
  },
  methods: {
    // 1.实现回到顶部的方法
    scrollTo(x, y, time = 300) {
      // 防止better-scroll还没有初始化完成，调用 scrollTo 方法报错。
      this.scroll &&  this.scroll.scrollTo(x, y, time);
    },
    // 2.当第一次上拉加载更多后，需要调用finishPullUp方法，才能进行下一次上拉加载更多数据
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },

    // 3.当图片加载完成后，调用refresh函数，让better-scroll重新计算高度
    refresh() {
      // console.log("++++");
      this.scroll && this.scroll.refresh();
    },

    // 4.获取滚动区域y轴的坐标
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style>

</style>