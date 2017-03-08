<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ['seller'],
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #ffffff
    position: relative
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding: 24px 12px 16px 24px
      font-size: 0px
      .avatar
        display: inline-block
        img
          border-radius: 2px
      .content
        margin-left: 16px
        margin-top: 2px
        vertical-align: top
        display: inline-block
        .title
          font-size: 16px
          .brand
            vertical-align: top
            display: inline-block
            width: 30px
            height: 18px
            bg-image('brand')
            background-repeat: no-repeat
            background-size: 30px 18px
        .description
          margin-top: 8px
          font-size: 12px
        .support
          margin-top: 10px
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            background-repeat: no-repeat
            background-size 12px 12px
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            margin-left: 4px
            font-size: 10px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding-left: 8px
        padding-right: 8px
        height: 24px
        line-height: 24px
        text-align: center
        background: rgba(0, 0, 0, 0.2)
        border-radius: 14px
        .count
          font-size: 10px
          line-height: 24px
        .icon-keyboard_arrow_right
          margin-left: 2px
          line-height: 24px
          font-size: 10px
          text-align: center
    .bulletin-wrapper
      background: rgba(7, 17, 27, 0.2)
      padding-left: 12px
      padding-right: 12px
      height: 28px
      line-height: 28px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .bulletin-title
        display: inline-block
        width: 22px
        height: 12px
        bg-image('bulletin')
        margin-top: 8px
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
      .bulletin-text
        font-size: 10px
        vertical-align: top
        margin-left: 4px
        margin-right: 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 0px
        font-size: 10px
        vertical-align: top
        margin-top: 9px
    .background
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)

</style>
