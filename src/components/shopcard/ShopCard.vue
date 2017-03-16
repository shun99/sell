<template>
  <div class="card">
    <div class="card-content" @click="showList()">
      <div class="left-wrapper">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="right-wrapper" :class="payClass" @click.stop="pay()">
        <span class="pay">{{payDesc}}</span>
      </div>
    </div>
    <transition name="fold">
      <div class="food-list-wrapper" v-show="fold">
        <div class="head-wrapper">
          <span class="text">购物车</span>
          <span class="clear" @click="clear()">清空</span>
        </div>
        <div class="list-wrapper" ref="listContent">
          <ul>
            <li class="item-wrapper border-1px" v-for="(food, index) in selectFoods">
              <span class="name">{{food.name}}</span>
              <span class="price">￥{{food.price*food.count}}</span>
              <div class="food-control">
                <shopcardcontrol :food="food"></shopcardcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask" v-show="fold" @click="showList()"></div>
    </transition>
  </div>
</template>


<script type="text/ecmascript-6">
  import shopcardcontrol from 'component/shopcardcontrol/ShopCardControl';
  import BScroll from 'better-scroll';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [
            {
              price: 11,
              count: 1
            },
            {
              price: 11,
              count: 2
            }
          ];
        }
      },
      'deliveryPrice': {
        type: Number,
        default: 0
      },
      'minTotalPrice': {
        type: Number,
        default: 10
      }
    },
    data () {
      return {
        'fold': false
      };
    },
    components: {
      shopcardcontrol
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count * food.price;
        });
        return total;
      },
      totalCount () {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count;
        });
        return total;
      },
      payDesc () {
        if (this.totalPrice === 0) {
          return `￥${this.minTotalPrice}元起送`;
        } else if (this.totalPrice < this.minTotalPrice) {
          let diff = this.minTotalPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.minTotalPrice) {
          return 'nu-enough';
        } else {
          return 'enough';
        }
      }
    },
    methods: {
      showList () {
        if (!this.totalCount) {
          return;
        }
        this.fold = !this.fold;
        if (this.fold) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
      },
      clear () {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
        this.fold = false;
      },
      pay () {
        if (this.totalPrice < this.minTotalPrice) {
          return;
        }
        window.alert(`支付${this.totalPrice}元`);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .card
    width: 100%
    font-size: 0
    .card-content
      height: 48px
      width: 100%
      display: flex
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .left-wrapper
        flex: 1
        z-index: 200
        .logo-wrapper
          display: inline-block
          position: relative
          top: -10px
          margin: 0px 12px
          width: 56px
          height: 56px
          border-radius: 50%
          background: #141d27
          padding: 6px
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
          .num
            position: absolute
            top: 0
            right: 0
            min-width: 24px
            padding: 0px 3px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          padding-right: 12px
          font-size: 16px
          font-weight: 700
        .desc
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-left: 12px
          font-size: 10px
      .right-wrapper
        z-index: 200
        display: flex
        align-items: center
        justify-content: center
        width: 105px
        flex: 0 0 105px
        &.enough
          z-index: 200
          background: #00b43c
          color: #fff
        &.nu-enough
          z-index: 200
          background: #2b333b
        .pay
          line-height 24px
          font-size: 12px
          font-weight 700px
    .food-list-wrapper
      position: fixed
      z-index: -50
      left: 0px
      bottom: 48px
      width: 100%
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.2s
      &.fold-enter, &.fold-leave-active
        transform: translate3D(0, 100%, 0)
      .head-wrapper
        height: 40px
        width: 100%
        background: #f3f5f7
        .text
          float: left
          margin-left 12px
          font-size: 14px
          font-weight: 200px
          line-height: 40px
        .clear
          float: right
          margin-right: 12px
          font-size: 12px
          color: rgb(0, 160, 220)
          line-height: 40px
      .list-wrapper
        background: #fff
        padding-bottom: 25px
        max-height: 192px
        overflow: hidden
        .item-wrapper
          display: flex
          height: 48px
          margin: 0px 12px
          align-items: center;
          border-1px-bottom(rgba(7, 17, 27, 0.1))
          .name
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 80px
            font-size: 14px
            font-weight: 700px
            color: rgb(240, 20, 20)
          .food-control
            position: absolute
            right: 0px
    .mask
      position: fixed
      z-index: -100
      top: 0px
      left: 0px
      bottom: 48px
      width: 100%
      background: rgba(7, 17, 27, 0.8)
      backdrop-filter: blur(30px)
      &.mask-enter-active, &.mask-leave-active
        transition: all 0.2s
      &.mask-enter, &.mask-leave-active
        opacity: 0
</style>
