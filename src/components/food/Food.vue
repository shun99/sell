<template>
  <transition name="move">
    <div class="food" ref="foodScroll" v-show="dialogStatus">
      <div>
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
            <div class="control-container">
              <shopcardcontrol class="shop-control" :food="food"></shopcardcontrol>
            </div>
            <div class="add" v-show="!food.count || food.count===0">>
              <span @click.stop="firstAddFood()">加入购物车</span>
            </div>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="info">
          <div class="title">商品介绍</div>
          <div class="content">
            <span v-if="food.info">{{food.info}}</span>
            <span v-else="food.info">暂无详情</span>
          </div>
        </div>
        <div class="blank border-1px"></div>
        <div class="ratingControl-container border-1px">
          <ratingcontrol :ratingType="selectType" :ratings="food.ratings"
                         :showHaveContent="haveContent" :desc="desc"
                         @chooseType="selectRating" @chooseHaveContent="isHaveContent"></ratingcontrol>
        </div>
        <div class="rating-list-wrapper">
          <ul>
            <li class="rating-item border-1px" v-for="rating in food.ratings"
                v-show="showItem(rating.rateType,rating.text)">
              <div class="user-info">
                <span class="time">{{rating.rateTime}}</span>
                <img class="avatar" :src="rating.avatar">
                <span class="name">{{rating.username}}</span>
              </div>
              <div class="user-rating" v-show="rating.text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                <span class="text">{{rating.text}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import ShopCardControl from 'component/shopcardcontrol/ShopCardControl';
  import RatingControl from 'component/ratingcontrol/RatingControl';
  import BScroll from 'better-scroll';
  import Vue from 'vue';

  export default {
    data () {
      return {
        'haveContent': false,
        'selectType': 2
      };
    },
    props: {
      food: {
        type: Object,
        default: {}
      },
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    },

    components: {
      'shopcardcontrol': ShopCardControl,
      'ratingcontrol': RatingControl
    },

    computed: {
      dialogStatus () {
        if (this.food.name) {
          if (!this.scroll) {
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.foodScroll, {
                click: true
              });
            });
          } else {
            this.scroll.refresh();
          }
          return true;
        } else {
          return false;
        }
      }
    },

    methods: {
      back () {
        this.$emit('back');
      },

      selectRating (type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },

      isHaveContent (showHaveContent) {
        this.haveContent = showHaveContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },

      showItem (type, text) {
        if (!text && this.haveContent) {
          return false;
        }
        if (this.selectType === 2) {
          return true;
        } else {
          return this.selectType === type;
        }
      },

      firstAddFood () {
        console.log('firstAddFood....');
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .food
    font-size: 0px
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
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
        .control-container
          position: absolute
          display: flex
          align-items: center
          justify-content: center
          top: -7px;
          height: 24px
          right: 0px
        .add
          position: absolute
          align-items: center
          justify-content: center
          display: flex
          top: -7px;
          right: 0px
          width: 74px
          height: 24px
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

    .ratingControl-container
      border-1px-bottom(rgba(7, 17, 27, 0.1))
    .rating-list-wrapper
      padding: 0px 18px
      .rating-item
        padding: 16px 0px
        border-1px-bottom(rgba(7, 17, 27, 0.1))
        .user-info
          .time, .name
            font-size: 12px
            color rgb(147, 153, 159)
          .name
            margin-right: 6px
            float: right
          .avatar
            width: 12px
            height: 12px
            border-radius: 50%
            float: right
        .user-rating
          margin-top: 12px
          .icon-thumb_up, .icon-thumb_down
            font-size: 12px
            color: rgb(0, 160, 220)
          .icon-thumb_down
            color: rgb(147, 153, 159)
          .text
            font-size: 12px
            margin-left: 4px
</style>
