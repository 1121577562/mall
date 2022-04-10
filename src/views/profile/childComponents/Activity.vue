<template>
  <div class="activity-wrap">
      <h2 class="title">工具与服务</h2>
      <div class="activity-content">
        <div class="content-item">
          <img src="~assets/img/profile/jd/advisor.webp" alt="">
          <p>客户服务</p>
        </div>
        <div class="content-item">
          <img src="~assets/img/profile/jd/appointment.webp" alt="">
          <p>我的预约</p>
        </div>
         <div class="content-item">
          <img src="~assets/img/profile/jd/problem.webp" alt="">
          <p>我的问答</p>
        </div>
         <div class="content-item">
          <img src="~assets/img/profile/jd/idle.webp" alt="">
          <p>闲置换线</p>
        </div>
        <div class="content-item">
          <img src="~assets/img/profile/jd/circle.webp" alt="">
          <p>高价回收</p>
        </div>
      
      </div>
    </div>
</template>

<script>
export default {
  name: "Activity"
}
</script>

<style scoped>
  .activity-wrap {
    background: #fff;
    margin: 15px 0;
    border-radius: 15px;
  }

  .activity-wrap .title {
    font-size: 14px;
    color: #2e2d2d;
    height: 38px;
    line-height: 38px;
    padding-left: 18px;
    font-weight: 700;
  }

  .activity-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-bottom: 10px;
    border-top: 1px solid #f8f8f8;
  }

  .activity-content .content-item {
    width: 25%;
    padding-top: 12px;
    text-align: center;
  }

  .content-item img {
    display: block;
    margin: 0 auto 6px;
    width: 35px;
    height: 35px
  }

  .content-item p {
    font-size: 12px;
    color: #262626;
    line-height: 1.2;
  }
</style>