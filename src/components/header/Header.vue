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
        <div v-if="seller.supports" class="support-wrapper">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="changeDetailShowStatus(true)">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span><i
      class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div class="detail-wrapper" v-show="isShowDetail">
      <div class="detail-content clearfix">
        <div class="name">{{seller.name}}</div>
        <div class="star-wrapper">

        </div>
        <div class="item-wrapper">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <li v-if="seller.supports" class="support-wrapper">
          <ul v-for="(item, index) in seller.supports" class="support-item">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </ul>
        </li>
        <div class="item-wrapper">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icon-close" @click="changeDetailShowStatus(false)"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ['seller'],
    data () {
      return {
        isShowDetail: false
      };
    },
    methods: {
      changeDetailShowStatus (isShow) {
        this.isShowDetail = isShow;
      }
    },
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
    overflow: hidden
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
          .brand
            vertical-align: top
            display: inline-block
            width: 30px
            height: 16px
            bg-image('brand')
            background-repeat: no-repeat
            background-size: 30px 16px
          .name
            vertical-align: top
            margin-left 6px
            font-size: 16px
            line-height: 16px
            font-weight: bold
        .description
          margin-top: 8px
          font-size: 12px
        .support-wrapper
          margin-top: 10px
          font-size: 0px
          .icon
            vertical-align: top
            display: inline-block
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat: no-repeat
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
            vertical-align: top
            margin-left: 4px
            font-size: 12px
            line-height: 12px
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
      padding-right: 20px
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
        font-size: 12px
        margin-top: 9px
        vertical-align: top
        margin-left: 4px
        margin-right: 4px
      .icon-keyboard_arrow_right
        position: absolute
        right: 12px
        font-size: 12px
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
    .detail-wrapper
      position: fixed
      z-index: 100
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(30px)
      opacity: 1
      font-size: 0px
      .detail-content
        min-height: 100%
        width: 100%
        font-size: 12px
        padding: 64px 36px
        .name
          font-size: 16px
          line-height: 16px
          font-weight: 700
          text-align: center
        .star-wrapper
          margin-top: 16px
          text-align: center
        .item-wrapper
          display: flex
          width: 100%
          margin-top: 28px
          margin-bottom: 24px
          .line
            flex: 1
            top: -6px
            position: relative
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: 14px
        .support-wrapper
          padding: 0px 12px
          .support-item
            margin-bottom: 12px
            font-size: 0
            &:last-child
              margin-bottom: 0px
            .icon
              vertical-align: top
              display: inline-block
              width: 16px
              height: 16px
              background-size 16px 16px
              background-repeat: no-repeat
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
              vertical-align: top
              margin-left: 6px
              font-size: 12px
              line-height: 16px
      .detail-close
        font-size: 32px
        width: 32px
        height: 32px
        margin: -64px auto 0px auto
</style>
