<template>
  <div class="foodInfo" v-show="showFoodInfo" ref="foodInfo">
    <div class="scrollWrapper">
      <div class="avatar">
        <img class="img" :src="food.image">
        <i class="icon-arrow_lift" @click="hideFoodInfo"></i>
      </div>
      <div class="content_header">
        <div class="name">{{food.name}}</div>
        <div class="desc">
          <span class="sellCount">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="nowprice">
          <span class="price">￥{{food.price}}</span>
          <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cart">
          <cartcontrol :food="food" v-show="food.count"></cartcontrol>
          <div class="text" v-show="!food.count" @click="addCount">加入购物车</div>
        </div>
      </div>
      <split></split>
      <div class="foodDesc">
        <div class="text">商品介绍</div>
        <span class="info">{{food.info}}</span>
      </div>
      <split></split>
      <div class="ratingsList">
        <div class="text">商品评价</div>
        <ratingsSelect :ratings="food.ratings" :ratingsDesc="ratingsDesc"></ratingsSelect>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import split from '@/components/split/split'
import BScroll from 'better-scroll'
import ratingsSelect from '@/components/ratingsSelect/ratingsSelect'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
export default {
  name: 'foodInfo',
  data () {
    return {
      showFoodInfo: false,
      ratingsDesc: ['全部', '推荐', '吐槽']
    }
  },
  components: {
    split,
    ratingsSelect,
    cartcontrol
  },
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  methods: {
    initShow() {
      this.showFoodInfo = true;
      this.$nextTick(() => {
        this._initScroll();
      });
    },
    hideFoodInfo() {
      this.showFoodInfo = false;
    },
    _initScroll() {
      this.foodInfoScroll = new BScroll(this.$refs.foodInfo, {
        click: true
      });
    },
    addCount(event) {
      if(!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.foodInfo
  position: fixed
  top: 0
  bottom: 48px
  left: 0
  width: 100%
  background: #fff
  overflow: hidden
  z-index: 30
  .avatar
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    .img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .icon-arrow_lift
      position: absolute
      cursor: pointer
      top: 30px
      left: 30px
      font-size: 30px
      color: #fff
  .content_header
    padding: 18px
    position: relative
    .name
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
      line-height: 14px
    .desc
      margin-top: 8px
      .sellCount, .rating
        display: inline-block
        font-size: 10px
        color: rgb(147, 153, 159)
        line-height: 10px
      .rating
        margin-left: 12px
    .nowprice
      margin-top: 18px
      .price
        display: inline-block
        font-size: 14px
        color: rgb(240, 20, 20)
        font-weight: 700
        line-height: 14px
      .oldPrice
        display: inline-block
        font-size: 10px
        font-weight: normal
        color: rgb(147, 153, 159)
        line-height: 24px
        margin-left: 12px
    .cart
      position: absolute
      right: 18px
      bottom: 18px
      cursor: pointer
      .text
        width: 74px
        height: 24px
        text-align: center
        font-size: 10px
        line-height: 24px
        border-radius: 12px
        background: #00a0dc
        color: #fff
  .foodDesc
    padding: 18px
    .text
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
      line-height: 14px
    .info
      display: inline-block
      margin: 6px 8px 0 8px
      font-size: 12px
      font-weight: 200
      color: rgb(77, 85, 93)
      line-height: 24px
  .ratingsList
    padding: 18px
    .text
      font-size: 14px
      font-weight: 700
      color: rgb(7, 17, 27)
      line-height: 14px
</style>
