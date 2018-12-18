<template>
  <div class="bottom">
    <div class="shopcart">
      <div class="content">
        <div class="shopcart-left" @click="showList">
          <div class="cartWrapper">
            <div class="logo" :class="{'highLight': allCount>0}">
              <i class="icon-shopping_cart" :class="{'highLight': allCount>0}"></i>
            </div>
            <div class="count" v-show="allCount>0">{{ allCount }}</div>
          </div>
          <div class="price" :class="{'highLight': allCount>0}">￥{{allPrice}}元</div>
          <div class="shopPrice">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="shopcart-right" :class="{'highLight': allPrice>=minPrice}">{{payDesc}}
        </div>
      </div>
      <div class="ballWrapper">
        <transition-group name="drop" tag="div">
          
        </transition-group>
      </div>
    </div>
    <transition name="fold">
      <div class="shopCartList" v-show="listShow">
        <div class="shopCart_header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="shopCart_body" ref="foodsList">
          <ul style="list-style:none; margin-left:-30px; margin-right:10px;">
            <li class="food" v-for="(food, index) in selectFood" :key="index">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <cartcontrol class="cart" :food="food"></cartcontrol>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mask">
      <div class="mask"  v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
export default {
  components: {
    cartcontrol
  },
  data () {
    return {
      balls: [
        {
          show: true,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        },
        {
          show: false,
          el: null
        }
      ],
      fold: true
    };
  },
  props: {
    selectFood: {
      type: Array,
      default: []
    },
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    }
  },
  methods: {
    showList() {
      if(this.allCount === 0) {
        return;
      }
      this.fold = !this.fold; 
    },
    empty() {
      this.selectFood.forEach((food) => {
        food.count = 0;
      });
      //this.listShow = false;
    },
    _initScroll() {
      this.foodsScroll = new BScroll(this.$refs.foodsList, {
        click: true
      });
    }
  },
  computed: {
    allPrice() {
      let allPrice = 0;
      for(var i = 0; i < this.selectFood.length; i++) {
        allPrice += this.selectFood[i].price * this.selectFood[i].count;
      }
      return allPrice;
    },
    allCount() {
      let allCount = 0;
      for(var i = 0; i < this.selectFood.length; i++) {
        allCount += this.selectFood[i].count;
      }
      return allCount;
    },
    payDesc() {
      if(this.allPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if(this.allPrice<this.minPrice) {
        let count = this.minPrice - this.allPrice;
        return `还差${count}起送`;
      } else if(this.allPrice >= this.minPrice) {
        return `去结算`;
      }
    },
    listShow() {
      if(this.allCount === 0) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if(show) {
        this.$nextTick(() => {
          if(!this.foodsScroll) {
            this._initScroll();
          } else {
            this.foodsScroll.refresh();
          }
        });
      }
      return show;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.bottom
  position: fixed
  left: 0
  bottom: 0
  width: 100%
  z-index: 50
  background: #141d27
  height: 48px
  .shopcart
    display: flex
    color: rgba(255, 255, 255, 0.4)
    .content
      .shopcart-left
        flex: 1
        font-size: 0
        .cartWrapper
          display: inline-block
          position: relative
          margin-left: 12px
          top: -10px
          padding: 6px
          background: #141d27
          width: 56px
          height: 56px
          vertical-align: top
          box-sizing: border-box
          background: #141d2
          border-radius: 50%
          .logo
            border-radius: 50%
            height: 100%
            width: 100%
            text-align: center
            background: rgba(255, 255, 255, 0.4)
            &.highLight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              font-size: 24px
              color: #80858a
              line-height: 48px
              &.highLight
                color: rgb(255, 255, 255)
          .count
            position: absolute
            right: 0
            top: 0
            width: 24px
            height: 16px
            border-radius: 12px
            text-align: center
            line-height: 16px
            font-size: 12px
            background: rgb(240, 20, 20)
        .price
          display: inline-block
          font-size: 16px
          margin-left: 6px
          margin-top: 10px
          padding-right: 12px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          &.highLight
            color: #fff
        .shopPrice
          margin-left: 12px
          font-size: 16px
          color: rgba(255, 255, 255, 0.4)
          font-weight: 700
          line-height: 24px
          display: inline-block
      .shopcart-right
        flex: 0 0 105px
        width: 105px
        background: #2b333b
        font-size: 12px
        color: rgba(255, 255, 255, 0.4)
        line-height: 24px
        font-weight: 700
        text-align: center
        padding-top: 12px
        &.highLight
          background: #00b43c
          color: #fff
    .ballWrapper
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        background: red
  .shopCartList
    font-size: 12px
    position: absolute
    bottom: 48px
    z-index: -1
    left: 0
    transfrom: translate3d(0, -100%, 0)
    width: 100%
    .shopCart_header
      height: 40px
      line-height: 40px
      padding: 0 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      overflow: hidden
      background: #f3f5f7
      .title
        float: left
        font-size: 14px
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 200)
    .shopCart_body
      position: relative
      padding: 0 18px
      max-height: 217px
      background: #fff
      overflow: hidden
      .food
        height: 48px
        line-height: 48px
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 24px
          font-weight: 700
        .price
          display: inline-block
          position: absolute
          right: 100px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cart
          position: absolute
          right: 0px
          bottom: -10px
  .mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -50
    background: rgba(7, 17, 27, 0.6)
    filter: blur(10px)
</style>
