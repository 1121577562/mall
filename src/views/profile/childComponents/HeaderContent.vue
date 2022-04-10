<template>
  <div class="headerContent">
    <div class="userInfo">
      <div class="userAvater">
        <img src="~assets/img/profile/jd/avatar.png" alt="">
      </div>
      <div class="userDetail">
        <p class="userName">
          jd_156235eub
        </p>
        <div class="userAuthority">
          <span>京享值</span>
          <span>开启小白守约特权 &gt;</span>
        </div>
      </div>
      <div class="select">
        <img src="~assets/img/profile/jd/set.png" alt="">
      </div>
    </div>
    <div class="accountWrap">
        <div class="accountItem">
          <span class="count">0</span>
          <p class="title">商品收藏</p>
        </div>
        <div class="accountItem">
          <span class="count">2</span>
          <p class="title">店铺收藏</p>
        </div>
        <div class="accountItem">
          <span class="count">6</span>
          <p class="title">我的足迹</p>
        </div>
    </div>
    <div class="plus_black_wrap">
      <div class="plusTitle">
        免费试用 立领1张运费券
      </div>
      <div class="plusSubTitle">
        0元试用 &gt;
      </div>
    </div>
  </div>
</template> 

<script>
export default {
  name: "HeaderContent"
}
</script>

<style scoped>
  .headerContent {
    width: 100%;
    height: 190px;
    padding-top: 10px;
    background:url('~assets/img/profile/jd/bgc.png') no-repeat center;
    overflow: hidden;
  }

  .userInfo {
    display: flex;
    justify-content: space-around;
    padding-left: 18px;
    padding-bottom: 18px;
  }

  .userInfo .userAvater {
    position: relative;
    width: 50px;
    height: 50px;
  }

  .userAvater img {
    width: 100%;
    height: 100%;
  }


  .userAvater::after {
    position: absolute;
    left: 50%;
    top: 55%;
    transform: translate(-50%,50%);
    content: "待实名认证";
    height: 20px;
    width: 80px;
    padding: 2px 5px;
    background: rgba(0, 0, 0, .2);
    text-align: center;
    line-height: 16px;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
  }
 
  .userInfo .userDetail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 15px;
  }

  .userDetail .userName {
    font-size: 18px;
    color: #fff;
  }

  .userDetail .userAuthority {
    font-size: 14px;
    color: #fff;
  }

  .userAuthority span {
    padding: 3px 5px;
    background: rgba(0, 0, 0, .3);
    border-radius: 10px;
  }

  .userAuthority span:first-child {
    margin-right: 5px;
  }

  .userInfo .select {
    width: 20px;
    height: 20px;
  }

  .select img {
    width: 100%;
    height: 100%;
  }

  .accountWrap {
    display: flex;
    font-size: 14px;
    color: #fff;
  }

  .accountItem {
    flex: 1;
    text-align: center;
  }

  .accountItem .count {
    font-weight: 700;
    font-size: 16px;
  }

  .accountItem .title {
    margin-top: 10px;
  }

  .plus_black_wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 42px;
    margin: 10px 18px 0;
    background: url('~assets/img/profile/jd/bottom.png') no-repeat;
    background-size:100%;
    color: #f7d653;
    font-size: 14px;
  }  

  .plus_black_wrap .plusTitle {
    position: relative;
    padding-left: 57px;
  }

  .plus_black_wrap .plusTitle::before { 
    position: absolute;
    left: 0;
    top: 3px;
    content: "";
    width: 57px;
    height: 12px;
    background: url('~assets/img/profile/jd/plus.png') no-repeat;
    color: #f7d653;
  }

  .plus_black_wrap .plusTitle::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 7px;
    background: #ffe678;
    left: 48px;
    top: 5px;
  }

  .plus_black_wrap .plusSubTitle {
    padding: 3px 10px;
    background-color: #f7d653;
    color: #333;
    border-radius: 10px;
  }

</style>