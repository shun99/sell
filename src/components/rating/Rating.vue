<template>
  <div class="rating-vue" ref="rating">
    <div>
      <div class="overview-wrapper">
        <div class="left-wrapper">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评价</div>
          <div class="rank">高于周边商城{{seller.rankRate}}%</div>
        </div>
        <div class="right-wrapper">
          <div>
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <star class="star-container" :size="36" :score="seller.serviceScore"></star>
              <span class="num">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <star class="star-container" :size="36" :score="seller.foodScore"></star>
              <span class="num">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="content">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="rating-control-container border-1px">
        <rating-control
          :ratingType="selectType" :ratings="ratings"
          :showHaveContent="haveContent" :desc="desc"
          @chooseType="selectRating" @chooseHaveContent="isHaveContent"></rating-control>
      </div>
      <div class="rating-list-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="(rating, index) in ratings"
              v-show="showItem(rating.rateType, rating.text)">
            <div class="avatar-wrapper">
              <img class="avatar" :src="rating.avatar">
            </div>
            <div class="content-wrapper">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star class="star-container" :size="24" :score="rating.score"></star>
                <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <div class="rating-text">{{rating.text}}</div>
              <div class="recommend-wrapper" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <div class="recommend" v-for="(recommend, index) in rating.recommend">{{recommend}}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'component/star/Star';
  import RatingControl from 'component/ratingcontrol/RatingControl';
  import BScroll from 'better-scroll';

  const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },

    data () {
      return {
        ratings: [],
        selectType: 2,
        haveContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      };
    },
    components: {
      star,
      'rating-control': RatingControl
    },
    created () {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errNo === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.rating, {
              click: true
            });
          });
        }
      });
    },
    methods: {
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .rating-vue
    position: absolute
    top: 172px
    left: 0px
    bottom: 0px
    right: 0px
    overflow: hidden
    font-size 0px
    .overview-wrapper
      display: flex
      padding: 18px 0px
      .left-wrapper
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        flex: 0 0 137px
        width: 137px
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          line-height: 28px
          font-size: 24px
          color: rgb(255, 153, 0)
        .title
          margin-top: 6px
          line-height: 12px
          font-size: 12px
          color: rgb(7, 17, 27)
        .rank
          margin-top: 8px
          padding-bottom: 6px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
      .right-wrapper
        display: flex
        flex: 1
        align-items: center
        justify-content: center
        flex-direction: column
        .score-wrapper
          display: flex
          align-items: center
          margin-bottom: 8px
          .title
            display: inline-block
            font-size: 12px
            color: rgb(7, 17, 27)
          .star-container
            margin-left: 12px
            @media only screen and (max-width: 320px)
              margin-left: 4px
          .num
            display: inline-block
            margin-left: 12px
            font-size: 12px
            color: rgb(255, 153, 0)
            @media only screen and (max-width: 320px)
              margin-left: 4px
        .delivery-wrapper
          .title
            display: inline-block
            font-size: 12px
            color: rgb(7, 17, 27)
          .content
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)
            @media only screen and (max-width: 320px)
              margin-left: 4px
    .rating-control-container
      border-1px-bottom(rgba(7, 17, 27, 0.1))
    .rating-list-wrapper
      .rating-item
        display: flex
        padding: 18px 0px
        margin: 0px 18px
        border-1px-bottom(rgba(7, 17, 27, 0.1))
        .avatar-wrapper
          display: inline-block
          flex: 0 0 28px
          width: 28px
          img
            width: 28px
            height: 28px
            border-radius: 50%
        .content-wrapper
          flex: 1px
          margin-left: 12px
          .name
            font-size: 10px
            color: rgb(7, 17, 27)
          .star-wrapper
            display: flex
            margin-top: 4px
            align-items: center
            .star-container
              display: inline-block
            .time
              display: inline-block
              font-size: 12px
              margin-left: 6px
              color: rgb(147, 153, 159)
          .rating-text
            margin-top: 6px
            font-size: 12px
            line-height: 18px
            color: rgb(7, 17, 27)
          .recommend-wrapper
            margin-top: 8px
            .icon-thumb_up, .recommend
              display: inline-block
              margin: 0 8px 4px 0
              font-size: 12px
              line-height: 16px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .recommend
              padding: 0 6px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              color: rgb(147, 153, 159)
              background: #fff


</style>
