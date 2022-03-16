<template>
  <div>
    <img class="bg" src="@/assets/images/bg.png" alt="">
    <div class="dark">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
    z-index: -1;
  }
  .dark {
    background-color: rgba(0, 0, 0, .6);
    height: 100vh;
  }
</style>
