<template>
  <div class="cartcontrol">
    <transition name="nove">
      <div class="cartcontrol-decrease" v-show="food.count>0" @click.stop.prevent="decrease($event)">
        <i class="icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="cartcontrol-Itemcount" v-show="food.count>0">{{food.count}}</div>
    <div class="cartcontrol-add" @click.stop.prevent="addCart($event)">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  data () {
    return {}
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  methods: {
    addCart(event) {
      if(!event._constructed) {
        return;
      }
      if(!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
    },
    decrease(event) {
      if(!event._constructed) {
        return;
      }
      this.food.count--;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size: 12px
  .cartcontrol-decrease
    color: #00a0a0
    line-height: 24px
    margin-right: 10px
    font-size: 24px
    display: inline-block
    .icon-remove_circle_outline
      transition: all 0.4s linear
    &.move-enter-active
      opacity: 1
      transfrom: translate3d(0, 0, 0)
      .icon-remove_circle_outline
        transfrom: rotate(0)
    &.move-enter, &.leave-to
      opacity: 0
      transfrom: translate3d(180deg, 0, 0)
      .icon-remove_circle_outline
        transfrom: rotate(180de)
  .cartcontrol-Itemcount
    color: rgb(147, 153, 159)
    line-height: 24px
    font-size: 10px
    display: inline-block
    vertical-align: top
  .cartcontrol-add
    color: #00a0a0
    line-height: 24px
    margin-left: 10px
    font-size: 24px
    display: inline-block
</style>
