<template>
  <div class="listGroup">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ListGroup",
  components: {
  }
}
</script>

<style scoped>
  .listGroup {
    height: 100px;
    border-radius: 20px;
    background-color: #fff;
    font-size: 12px;
  }

 

</style>