<template>
  <div class="seller-vue" ref="sellerScroll">
    <div>
      <div class="header-info-wrapper">
        <div class="content-wrapper border-1px">
          <span class="name">{{seller.name}}</span>
          <div class="star-wrapper">
            <star class="star-container" :size="36" :score="seller.foodScore"></star>
            <span class="rating-num">({{seller.ratingCount}})</span>
            <span class="pay-num">月售{{seller.sellCount}}单</span>
          </div>
        </div>
      </div>
      <div class="des-wrapper">
        <div class="des-item">
          <h1 class="title">起步价</h1>
          <div class="content-wrapper">
            <span class="content">{{seller.minPrice}}</span>
            <span class="content-end">元</span>
          </div>
        </div>
        <div class="des-item">
          <h1 class="title">商家配送</h1>
          <div class="content-wrapper">
            <span class="content">{{seller.deliveryPrice}}</span>
            <span class="content-end">元</span>
          </div>
        </div>
        <div class="des-item">
          <div class="title">平均配送时间</div>
          <div class="content-wrapper">
            <span class="content">{{seller.deliveryTime}}</span>
            <span class="content-end">分钟</span>
          </div>
        </div>
      </div>
      <div class="blank border-1px"></div>
      <div class="supports-wrapper">
        <div class="header-wrapper">
          <span class="title">公告与活动</span>
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul>
          <li class="support-item border-1px" v-for="(support, index) in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="content">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <div class="blank border-1px"></div>
      <div class="pic-wrapper">
        <span class="title">商家实景</span>
        <div class="pic-list-wrapper" ref="picListWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="blank border-1px"></div>
      <div class="footer-info-wrapper">
        <span class="title">商家信息</span>
        <ul class="info-list-wrapper">
          <li class="info-item" v-for="(info, index) in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'component/star/Star';
  import BScroll from 'better-scroll';

  export default{
    data () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      };
    },
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    components: {
      'star': Star
    },
    created () {
      this.$nextTick(() => {
        console.log(this.seller);
        this._initScroll();
        this._initPicScroll();
      });
    },
    watch: {
      'seller' () {
        console.log(this.seller);
        this.$nextTick(() => {
          this._initScroll();
          this._initPicScroll();
        });
      }
    },
    methods: {
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerScroll, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPicScroll () {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picListWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .seller-vue
    position: absolute
    top: 172px
    left: 0px
    bottom: 0px
    right: 0px
    overflow: hidden
    font-size 0px
    .header-info-wrapper
      padding: 18px 18px 0px 18px
      .content-wrapper
        padding-bottom: 18px
        border-1px-bottom(rgba(7, 17, 27, 0.1))
        .name
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .star-wrapper
          display: flex
          align-items: center
          margin-top: 8px
          .star-container
            display: inline-block
          .rating-num, .pay-num
            display: inline-block
            font-size: 12px
            color: rgb(77, 85, 93)
          .rating-num
            margin-left: 8px
          .pay-num
            margin-left: 12px
    .des-wrapper
      display: flex
      padding: 18px 10px
      .des-item
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        flex-direction: column
        border-left: 1px solid rgba(7, 17, 27, 0.1)
        &:first-child
          border-left: none
        .title
          font-size: 12px
          color: rgb(147, 153, 159)
        .content-wrapper
          margin-top: 4px
          .content
            font-size: 24px
            font-weight: 200px
            color: rgb(7, 17, 27)
          .content-end
            font-size: 12px
            font-weight: 200px
            color: rgb(7, 17, 27)
    .supports-wrapper
      .header-wrapper
        padding: 18px
        .title
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .content
          margin: 8px 12px 0px 12px
          line-height: 24px
          color: rgb(240, 20, 20)
          font-size: 12px
      .support-item
        padding: 16px 0px
        margin: 0px 12px
        border-1px-top: rgba(7, 17, 27, 0.1)
        .icon
          vertical-align: top
          display: inline-block
          width: 16px
          height: 16px
          background-size 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .content
          margin-left: 6px
          font-size: 12px
          font-weight: 200px
          line-height: 16px
          color: rgb(7, 17, 27)
    .pic-wrapper
      padding: 18px
      .title
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .pic-list-wrapper
        margin-top: 12px
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .footer-info-wrapper
      padding: 18px 18px 0px 18px
      .title
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .info-list-wrapper
        margin-top: 12px
        .info-item
          padding: 16px 12px
          border-1px-top: rgba(7, 17, 27, 0.1)
          font-size: 12px
          color: rgb(7, 17, 27)
</style>
