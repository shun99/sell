<template>
  <div class="goods">
    <div class="goods-wrapper">
      <ul class="side_wrapper">
        <li v-for="(goods, index) in goodsList" class="side-item">
          <span class="text border-1px"><span v-if="goods.type>0" class="icon" :class="classMap[goods.type]"></span>{{goods.name}}</span>
        </li>
      </ul>
      <ul class="content_wrapper">
        <li v-for="(goods, index) in goodsList">
          <h1 class="title">{{goods.name}}</h1>
          <ul class="food-wrapper">
            <li v-for="(food, index) in goods.foods" class="food-item">
              <img class="icon" width="57" height="57" :src="food.icon">
              <div class="content">
                <div class="name">{{food.name}}</div>
                <div class="desc">{{food.description}}</div>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const NO_ERR = 0;
  export default{
    data () {
      return {
        goodsList: []
      };
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

      this.$http.get('/api/goods').then(response => {
        if (response.body.errNo === NO_ERR) {
          this.goodsList = response.body.data;
        }
      }, response => {

      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    position: absolute
    top: 172px
    left: 0px
    bottom: 64px
    right: 0px
    overflow: hidden
    .goods-wrapper
      .side_wrapper
        position: absolute
        width: 80px
        background: #f3f5f7
        top: 0px
        bottom: 0px
        .side-item
          display: table
          width: 100%
          padding: 0px 12px
          height: 54px
          font-size: 0px
          .text
            width: 100%
            display: table-cell
            vertical-align: middle
            font-size: 12px
            font-weight: 200px
            line-height: 14px
            border-1px-bottom(rgba(7, 17, 27, 0.1))
            .icon
              vertical-align: top
              display: inline-block
              width: 12px
              height: 12px
              background-size: 12px 12px
              background-repeat: no-repeat
              margin-right: 2px
              &.decrease
                bg-image('decrease_3')
              &.discount
                bg-image('discount_3')
              &.guarantee
                bg-image('guarantee_3')
              &.invoice
                bg-image('invoice_3')
              &.special
                bg-image('special_3')
      .content_wrapper
        position: absolute
        top: 0px
        left: 80px
        right: 0px
        bottom: 0px
        .title
          font-size: 12px
          height: 26px
          width: 100%
          line-height: 26px
          padding-left: 14px
          background: #f3f5f7
          color rgb(147, 153, 179)
          border-left: 2px solid #d9dde1
        .food-wrapper
          padding-right 18px
          padding-left 18px
          .food-item
            display: flex
            padding 18px 0px
            border-1px-bottom(rgba(7, 17, 27, 0.1))
            &:last-child
              border-none()
            .icon
              flex: 0 0 57px
              margin-right: 10px
            .content
              flex: 1px
              .name
                height: 14px
                font-size: 14px
                line-height: 14px
                color: rgb(7, 17, 27)
                margin: 2px 0 8px 0
              .desc, .extra
                color: rgb(147, 153, 159)
                line-height: 10px
                font-size: 10px
              .desc
                line-height: 12px
                margin-bottom: 8px
              .extra
                .count
                  margin-right: 12px
              .price
                margin-top: 8px
                .now
                  font-size: 14px
                  color: rgb(240, 20, 20)
                .old
                  font-size: 14px
                  color: rgb(147, 153, 159)

</style>
