<template>
  <div v-if="Object.keys(goods).length !== 0" class="baseInfo">
    <div class="infoTitle">{{goods.title}}</div>
    <div class="infoPrice">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPrice">{{goods.oldPrice}}</span>
      <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
    </div>
    <div class="infoOther">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length -1].name}}</span>
    </div>
    <div class="infoService">
      <!-- 因为 v-for遍历的时候，索引从一开始 -->
      <span class="infoServiceItem" v-for="index in goods.services.length-1" :key="index">
        <img  v-if="goods.services[index -1].icon" :src="goods.services[index -1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style>
  .baseInfo {
    padding: 10px;
    font-size: 15px;
  }
  .infoTitle {
    line-height: 22px;
    font-weight: 700;
  }

  .infoPrice {
    margin-top: 10px;
  }
  .infoPrice .newPrice {
    font-size: 20px;
    color: var(--color-high-text);
    margin-right: 8px;
  } 

  .infoPrice .oldPrice {
    text-decoration: line-through;
    color: #b5afa6;
  }

  .infoPrice .discount {
    position: relative;
    bottom: 8px;
    left: 5px;
    padding: 3px;
    border-radius: 12px;
    color: #fff;
    background-color: #f75762;
  }
  .infoOther {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    font-size: 12px;
    color: #b5afa6;
  }

  .infoService {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px solid #eee;
  }   

  .infoService .infoServiceItem {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .infoService .infoServiceItem img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    margin-bottom: 2px;
    vertical-align: middle;
  }

</style>