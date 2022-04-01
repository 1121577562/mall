<template>
    <div class="goods-list-item">
      <a :href="goodsItem.link">
        <div class="pic">
          <img :src="goodsItem.show.img" alt="">
        </div>
        <div class="goods-detail">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <i class="icon"></i>
          <span class="hobbise">{{goodsItem.cfav}}</span>
      </div>
      </a>
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

  .goods-list-item a {
    display: block;
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