<template>
  <div id="app">
    <div class="pages">
       <div class="page-mulitple">
         <h3>多页</h3>
       </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  @import '~@assets/less/app.less';

  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>
