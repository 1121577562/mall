<template>
  <div class="shopInfo">
      <div class="shopTop">
          <img :src="shop.logo" alt="">
          <span class="title">{{shop.name}}</span>
      </div>
      <div class="shopMiddle">
          <div class="shopMiddleItem shopMiddleLeft">
            <div class="infoSells">
              <div class="sellScount">
                {{shop.sells | sellCountFilter}}
              </div>
              <div class="sellsText">总销量</div>
            </div>
            <div>
              <div class="infoGoods">
                {{shop.goodsCount}}
              </div>
              <div class="goodsText">
                全部宝贝
              </div>
            </div>
          </div>
          <div class="shopMiddleItem shopMiddleRight">
              <table>
                <tr v-for="(item, index) in shop.score" :key="index"> 
                  <td>{{item.name}}</td>
                  <td class="score" :class="{'scoreBetter': item.isBetter}">{{item.score}}</td>
                  <td class="better" :class="{'betterMore': item.isBetter}">{{item.isBetter ? "高" : "低"}}</td>
                </tr>
              </table>
          </div>
      </div>
      <div class="shopBottom">
        <div class="enterShop">
          进店逛逛
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
  filters: {
    sellCountFilter: function(value) {
      if(value < 10000) {
        return value;
      }
      return (value / 10000).toFixed(1) + '万';
    }
  }
}
</script>

<style scoped>
  .shopInfo {
    padding: 10px;
    font-size: 15px;
  }


  .shopTop img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
    border: 1px solid #eee;
    border-radius: 50%;
    vertical-align: middle;
  }

  .shopMiddle {
    display: flex;
    padding-top: 20px;
  }


  .shopMiddleItem {
    flex: 1;
  }

  .shopMiddleLeft {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-right: 1px solid #eee;
    line-height: 25px;
  }

  .infoSells, .infoGoods {
    text-align: center;
  }

  .shopMiddleRight {
    padding-left: 20px;
    line-height: 25px;
  }
  .score {
    padding: 0 5px;
  }

  .scoreBetter {
    color: #6ea949;
  }

  .betterMore {
    color: #c92918;
  }

  .shopBottom {
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid #eee;
  }

  .shopBottom .enterShop {
    position: relative;
    right: 10px;
  }


 </style>