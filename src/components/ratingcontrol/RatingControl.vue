<template>
  <div class="ratingControl">
    <div class="title">商品评价</div>
    <div class="type-choose-wrapper border-1px">
      <span class="block positive" :class="{'active':ratingType===0}"
            @click="chooseType(0)">全部</span>
      <span class="block positive" :class="{'active':ratingType===1}"
            @click="chooseType(1)">推荐</span>
      <span class="block negative" :class="{'active':ratingType===2}"
            @click="chooseType(2)">吐槽</span>
    </div>
    <div class="content-choose-wrapper" @click="chooseHaveContent()">
      <span class="icon-check_circle" :class="{'haveContent': showHaveContent}"></span>
      <span class="title">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      ratingType: {
        type: Number,
        default: 0
      },
      showHaveContent: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      chooseType (type) {
        this.ratingType = type;
        this.$emit('chooseType', type);
      },
      chooseHaveContent () {
        this.showHaveContent = !this.showHaveContent;
        this.$emit('chooseHaveContent', this.showHaveContent);
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
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
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
