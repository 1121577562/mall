<template>
  <div class="groupItem">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ListGroupItem"
}
</script>

<style scoped>
  .groupItem {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .listGroupItem {
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .listGroupItem img {
    width: 30px;
    height: 30px;
    padding-bottom: 3px;
    vertical-align: middle;
  }

  .listGroupItem span {
    padding-bottom: 20px;
    font-size: 16px;
    color:#262626;
    font-weight: 700;
  }

  .listGroup .listGroupItem:last-child::before {
    content: "";
    position: absolute;
    z-index: 1;
    top: -14px;
    left: -5px;
    width: 10px;
    height: 72px;
    background: url('~assets/img/profile/jd/arrow.png');
    background-size: 10px;
  }

  .listGroup .listGroupItem:last-child p {
    padding-top: 8px;
  }
</style>