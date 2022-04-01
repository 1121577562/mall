<template>
  <div class="tab-control">
      <div v-for="(item,index) in titles" 
           :key="item" 
           @click="handleChange(index)" 
           class="tab-item">
           <span :class="{active: index === currentIndex}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "tab-control",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods: {
    handleChange(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style>
    .tab-control {
        display: flex;
        width: 100%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        font-size: 15px;
        background-color: #fff;
    }

    .tab-control .tab-item {
      flex: 1;
    
    }
    .tab-item span {
      padding: 5px 5px;
    }
    .active {
      border-bottom: 2px solid var(--color-tint);
      color: var(--color-tint);
    }
</style>