<template>
  <div class="goods">
    <div class="goods-wrapper">
      <div class="side_wrapper" ref="goodsWrapper">
        <ul>
          <li v-for="(goods, index) in goodsList" class="side-item" :class="{'current':currentIndex===index}"
              @click="clickSideItem(index, $event)">
            <span class="text border-1px"><span v-if="goods.type>0" class="icon" :class="classMap[goods.type]"></span>{{goods.name}}</span>
          </li>
        </ul>
      </div>
      <div class="content_wrapper" ref="contentWrapper">
        <ul>
          <li v-for="(goods, index) in goodsList" ref="foodList">
            <h1 class="title">{{goods.name}}</h1>
            <ul class="food-wrapper">
              <li v-for="(food, index) in goods.foods" class="food-item border-1px">
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
                <shopcardcontrol class="control" :food="food"></shopcardcontrol>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <shopcard class="shopCard" :selectFoods="shopCardFoods" :deliveryPrice="seller.deliveryPrice"
              :minTotalPrice="seller.minPrice"></shopcard>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import ShopCard from 'component/shopcard/ShopCard';
  import ShopCardControl from 'component/shopcardcontrol/ShopCardControl';

  const NO_ERR = 0;
  export default{
    props: ['seller'],

    data () {
      return {
        goodsList: [],
        scrollY: 0,
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        listHeight: []
      };
    },

    components: {
      'shopcard': ShopCard,
      'shopcardcontrol': ShopCardControl
    },

    created () {
      this.$http.get('/api/goods').then(response => {
        if (response.body.errNo === NO_ERR) {
          this.goodsList = response.body.data;
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      shopCardFoods () {
        let foods = [];
        this.goodsList.forEach((goods) => {
          goods.foods.forEach((food) => {
            if (food.count > 0) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      _initScroll () {
        this.meunScroll = new BScroll(this.$refs.goodsWrapper, {
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs.contentWrapper, {
          click: true,
          probeType: 3
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },

      _calculateHeight () {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },

      clickSideItem (index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .goods
    position: absolute
    top: 172px
    left: 0px
    bottom: 46px
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
          &.current
            background: #fff
            .text
              border-none()
          &:last-child
            .text
              border-none()
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

            .control
              position: absolute
              right: 0px
              bottom: 6px
    .shopCard
      position: fixed
      bottom: 0px
      left: 0px
</style>
