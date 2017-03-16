<template>
  <div class="control">
    <transition name="move">
      <div class="decrease" v-show="food.count>0" @click="decreaseCard()">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="num" v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click="increaseCard()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      'food': {
        type: Object
      }
    },

    methods: {
      decreaseCard () {
        if (!event._constructed) {
          return;
        }
        console.log('.....decreaseCard');
        if (this.food.count > 0) {
          this.food.count--;
        }
      },
      increaseCard () {
        if (!event._constructed) {
          return;
        }
        console.log('.....increaseCard');
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
      }
    }
  };
</script>


<style lang="stylus" rel="stylesheet/stylus">
  .control
    font-size: 0px
    .decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 20px
        font-size: 20px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(30px, 0, 0)
        .inner
          transform: rotate(180deg)
    .num
      display: inline-block
      vertical-align: top
      min-width: 12px
      padding-top: 6px
      line-height: 20px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .increase
      display: inline-block
      padding: 6px
      line-height: 20px
      font-size: 20px
      color: rgb(0, 160, 220)
</style>
