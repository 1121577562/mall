<template>
  <div class="detailComment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="infoHeader">
      <div class="headerTile">
        用户评论
      </div>
      <div class="headerMore">
        更多
      </div>
      <i class="arrowRight"></i>
    </div>
    <div class="infoUser">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="infoDetail">
      <p>{{commentInfo.content}}</p>
      <div class="DetailInfoOther">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="infoImgs">
        <img v-for="(item, index) in commentInfo.images" :key="index" :src="item" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils.js'

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {
          
        }
      }
    }
  },
  filters: {
    showDate(value) {
      // 1.将时间戳转成 Date对象
      const date = new Date(value * 1000).toLocaleDateString();

      // 2.将date 进行格式化
      return date.formatDate(`{0}-{1}-{2}`)
    }
  },
  created() {
    /**
     * 问题: 如何将服务器返回的时间戳 转成 时间格式化字符串
     *    时间戳：1537535915 (服务器返回的是秒)
     *    1. 将事件戳转成 Date对象
     *    const date = new Date(1537535915 * 1000); //=>因为 Date构造函数，接收的参数是毫秒，因此需要将时间戳乘于 1000
     *    2.将 date进行格式化，转成对应的字符串
     */
    console.log(new Date(this.commentInfo.created * 1000))
    // console.log(new Date(this.commentInfo.created * 1000).toLocaleDateString().formatDate(`{0}-{1}-{2}`));
  }
}
</script>

<style scoped>
  .detailComment {
    padding: 0 10px;
  }

  .infoHeader {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
  }

  .infoHeader .headerTile ,
  .infoHeader .headerMore{
    flex: 1;

  }

  .infoHeader .headerMore {
    text-align: right;
  }


  .infoUser {
    padding-top: 20px;
  }

  .infoUser img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .infoDetail {
    padding-top: 20px;
    font-size: 14px;
    line-height: 22px;
  }

  .DetailInfoOther {
    padding: 6px 0;
  }

  .DetailInfoOther span {
    padding-right:5px;
  }

  .infoImgs {
    display: flex;
  }

  .infoImgs img {
    width: 80px;
    height: 80px;
    padding-right: 5px;
  }

</style>