<template>
  <div class="control">
    <div class="decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCard()"></div>
    <div class="num" v-show="food.count>0">{{food.count}}</div>
    <div class="increase icon-add_circle" @click="increaseCard()"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },

    methods: {
      decreaseCard () {
        if (!event._constructed) {
          return;
        }
        if (this.food.count > 0) {
          this.food.count--;
        }
      },
      increaseCard () {
        if (!event._constructed) {
          return;
        }
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
      line-height: 20px
      font-size: 20px
      color: rgb(0, 160, 220)
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
