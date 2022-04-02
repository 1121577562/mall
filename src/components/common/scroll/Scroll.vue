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
      this.scroll.scrollTo(x, y, time);
    },
    // 2.当第一次上拉加载更多后，需要调用finishPullUp方法，才能进行下一次上拉加载更多数据
    finishPullUp() {
      this.scroll.finishPullUp();
    }
  }
}
</script>

<style>

</style>