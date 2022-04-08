<template>
    <div class="nav-bar">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="center">
          <slot name="center"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
</template>

<script>
export default {
  name: "NavBar",
}
</script>

<style>
   .nav-bar {
     display: flex;
     align-items: center;
     line-height: 44px; 
     /* 导航栏的高度一般是44px */
     text-align: center;
     box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
   }
   .nav-bar .left, .right {
     width: 60px;
     /* background-color: pink; */
   }

   .nav-bar .center {
     flex: 1;
     /* background-color: skyblue; */
   }
</style>