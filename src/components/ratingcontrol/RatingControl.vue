<template>
  <div class="ratingControl">
    <div class="title">商品评价</div>
    <div class="type-choose-wrapper border-1px">
      <span class="block positive" :class="{'active':ratingType===2}"
            @click="chooseType(2)">{{desc.all}}<span class="num">{{ratings.length}}</span></span>
      <span class="block positive" :class="{'active':ratingType===0}"
            @click="chooseType(0)">{{desc.positive}}<span class="num">{{positives.length}}</span></span>
      <span class="block negative" :class="{'active':ratingType===1}"
            @click="chooseType(1)">{{desc.negative}}<span class="num">{{negatives.length}}</span></span>
    </div>
    <div class="content-choose-wrapper" @click="chooseHaveContent()">
      <span class="icon-check_circle" :class="{'haveContent': showHaveContent}"></span>
      <span class="title">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      ratingType: {
        type: Number,
        default: ALL
      },
      showHaveContent: {
        type: Boolean,
        default: true
      },
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      desc: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },

    computed: {
      positives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },

    methods: {
      chooseType (type) {
        if (!event._constructed) {
          return;
        }
        this.$emit('chooseType', type);
      },
      chooseHaveContent () {
        if (!event._constructed) {
          return;
        }
        this.$emit('chooseHaveContent', !this.showHaveContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratingControl
    background: #fff
    padding: 18px 18px 12px 18px
    font-size: 0px
    .title
      font-size: 14px
      color: rgb(7, 17, 27)
    .type-choose-wrapper
      padding: 16px 0px
      border-1px-bottom(rgba(7, 17, 27, 0.1))
      .block
        display: inline-flex
        align-items: center
        justify-content: center
        padding: 8px 12px
        margin-right: 8px
        font-size: 12px
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
            color: #fff
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
            color: #fff
        .num
          margin-left: 2px
    .content-choose-wrapper
      display: inline-flex
      align-items: center
      justify-content: center
      padding-top: 12px
      .icon-check_circle
        font-size: 24px
        color: rgb(147, 153, 159)
        display: inline-block
        &.haveContent
          color: #00c850
      .title
        margin-left: 4px
        font-size: 12px
        color: rgb(147, 153, 159)
</style>
