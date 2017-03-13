<template>
  <div class="goods">
    <div class="goods-wrapper">
      <ul class="side_wrapper">
        <li v-for="(goods, index) in goodsList" class="side-item">
          <span class="text border-1px"><span v-if="goods.type>0" class="icon" :class="classMap[goods.type]"></span>{{goods.name}}</span>
        </li>
      </ul>
      <div class="content_wrapper"></div>
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

</style>
