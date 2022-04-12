<template>
  <scroll id="tabScroll">
     <div class="tabMenu">
      <div class="tabMenuItem" 
        v-for="(item, index) in categorys" 
        :key="index"
        @click="tabItemClick(index)"
        :class="{actived: index === currentIndex}">
        {{item.title}}
      </div>
    </div>   
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'
export default {
  name: "TabMenu",
  props: {
    categorys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Scroll: Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabItemClick(index) {
      this.currentIndex = index;
      this.$emit("tabMenuItemClick", index);
      console.log(index);
    }
  }
}
</script>

<style scoped>
  #tabScroll {
    height: 100%;
    width: 100px;
    box-sizing: border-box;
  }

  .tabMenuItem {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    background-color: #f6f6f6;
  }

  .actived {
    color: var(--color-high-text);
    font-weight: 700;
    border-left: 5px solid var(--color-high-text);
    background-color: #fff;
  }
</style>