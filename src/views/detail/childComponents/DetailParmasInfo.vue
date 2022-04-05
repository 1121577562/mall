<template>
  <div class="param" v-if="Object.keys(paramInfo).length !==0">
    <table class="infoSize" v-for="(itemOuter, index) in paramInfo.sizes" :key="index">
        <tr v-for="(itemInner, indexInner) in itemOuter" :key="indexInner">
            <td v-for="(td, indez) in itemInner" :key="indez">{{td}}</td>
        </tr>
    </table>
    <table class="infoParam">
      <tr v-for="(info, index) in paramInfo.infos" :key="index"> 
        <td class="infoParamKey">{{info.key}}</td>
        <td class="paramValue">{{info.value}}</td>
      </tr>
    </table>
    <table class="infoImg" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </table>
  </div>
</template>

<script>
export default {
  name: "DetailParmasInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {
          
        }
      }
    }
  }
}
</script>

<style scoped>
  .param {
    padding: 10px;
  }

  .infoSize {
    line-height: 10px;
  }


/* 
  .infoSize {
    
  } */

  .infoParam {
    padding: 20px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }

  .infoSize tr td{
    padding: 10px 15px;
    text-align: center;
  }


  .infoParam tr td {
    padding: 10px 15px;
    text-align: left;
  }

  .infoParamKey {
    white-space: nowrap;
  }

  .paramValue {
    color: #ec9ca5;
  }
</style>