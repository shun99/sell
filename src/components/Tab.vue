<template>
  <div class="tab">
    <div class="tab-item">
      <router-link to="/goods">商品</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/ratings">评论</router-link>
    </div>
    <div class="tab-item">
      <router-link to="/sellers">商家</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))

  .tab .tab-item
    flex: 1
    text-align: center
    & > a
      display: block
      font-size: 14px
      color: rgb(77, 85, 93)
      &.router-link-active
        color rgb(240, 20, 20)
</style>
