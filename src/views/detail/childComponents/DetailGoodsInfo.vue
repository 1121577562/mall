<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goodsInfo">
      <div class="infoDec">
        <div class="start">
        </div>
        <div class="desc">{{detailInfo.desc}}</div>
        <div class="end"></div>
      </div>
      <div class="infoKey">{{detailInfo.detailImage[0].key}}</div>
      <div class="infoList">
        <img v-for="(item, index) in detailInfo.detailImage[0].list" 
             :key="index" 
             :src="item" 
             alt=""
             @load="imgLoad">
      </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      // 判断，所有的图片是否加载完成，那么进行一次回调就可以了
      this.counter++
      if(this.counter === this.imagesLength) {
        this.$emit("imageLoad");
      }
    }
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength= this.detailInfo.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
  .infoDec {
    padding: 10px;
  }

  .infoDec .start, .infoDec .end {
    width: 30%;
    border-bottom: 2px solid #cececd;
  }

  .infoDec .start::before {
    position: relative;
    right: 0;
    top: 6px;
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #000;
  }

  .infoDec .desc{
    padding: 10px;
  }


  .infoDec .end {
    position: relative;
    left: 249px;
  }

  .infoDec .end::after {
    position: relative;
    left: 90%;
    top: 6px;
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    background-color: #000;
  }


  .infoKey {
    padding: 0 20px;
    margin-bottom: 10px;
  }

  .infoList img {
    width: 100%;
  }

</style>