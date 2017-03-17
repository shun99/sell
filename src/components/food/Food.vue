<template>
  <div class="food">
    <div class="header-wrapper">
      <img :src="food.image">
      <div class="back" @click="back()">
        <span class="icon-arrow_lift"></span>
      </div>
    </div>
    <div class="des">
      <h1 class="name">{{food.name}}</h1>
      <div class="detail">
        <span class="count">月售{{food.sellCount}}份</span>
        <span class="rating">好评率{{food.rating}}%</span>
      </div>
      <div class="price">
        <span class="now">¥{{food.price}}</span>
        <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
        <div class="control">
          <div class="add">
            <span>加入购物车</span>
          </div>
          <shopcardcontrol :shop="food"></shopcardcontrol>
        </div>
      </div>
    </div>
    <div class="blank border-1px"></div>
    <div class="info" style="display: none">
      <div class="title">商品介绍</div>
      <div class="content">
        <span v-if="food.info">{{food.info}}</span>
        <span v-else="food.info">暂无详情</span>
      </div>
    </div>
    <div class="blank border-1px"></div>
    <ratingcontrol></ratingcontrol>
  </div>
</template>

<script type="text/ecmascript-6">
  import ShopCardControl from 'component/shopcardcontrol/ShopCardControl';
  import RatingControl from 'component/ratingcontrol/RatingControl';

  export default {
    props: {
      food: {
        type: Object,
        default: {}
      }
    },

    components: {
      'shopcardcontrol': ShopCardControl,
      'ratingcontrol': RatingControl
    },

    methods: {
      back () {
        this.$emit('back');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .food
    font-size: 0px
    background: #fff
    .header-wrapper
      position: relative
      width: 100%
      height: 0px
      padding-bottom: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: inline-block
          padding: 10px
          font-size: 20px
          color: #fff
    .des
      padding: 18px
      .name
        font-size: 14px
        font-weight: 700px
        line-height 14px
        color: rgb(7, 17, 27)
      .detail
        margin-top: 8px
        .count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .rating
          margin-left: 12px
      .price
        position: relative
        margin-top: 18px
        .now
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          font-size: 14px
          margin-left: 10px
          color: rgb(147, 153, 159)
        .control
          display: flex
          align-items: center
          justify-content: center
          position: absolute
          top: -5px
          right: 0px
          width: 74px
          height: 24px
          .add
            align-items: center
            justify-content: center
            display: flex
            width: 100%
            height: 100%
            background: rgb(0, 160, 220)
            border-radius: 12px
            span
              font-size: 12px
              color: #fff
    .info
      padding: 18px
      .title
        font-size: 14px
        color: rgb(7, 17, 27)
      .content
        padding: 0px 8px
        margin-top: 6px
        font-size: 12px
        font-weight: 200
        line-height: 24px
        color: rgb(77, 85, 93)

</style>
