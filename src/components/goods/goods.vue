<template>
  <div class="goods">
    <div class="goods-left menu-wrapper" ref="menuWrapper">
      <ul style="list-style:none;">
        <li class="goods-menu-item" v-for="(item, index) in goods" :class="{'current': currentIndex === index}"  @click="selectMenu(index, $event)">
          <span class="text">
            <iconMap v-show="item.type>0" :iconType="item.type"></iconMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-right foods-wrapper" ref="foodsWrapper">
      <ul style="list-style:none;">
        <li class="foodsWrapper foods-hook" v-for="(foodsType, index) in goods">
          <div class="foodsType">{{foodsType.name}}</div>
          <ul style="list-style:none;">
            <li class="foodItem" v-for="(food, index) in foodsType.foods" @click="checkFoodInfo(food, $event)">
              <div class="foodItem-left">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="foodItem-right">
                <div class="foodItem-right-name">{{food.name}}</div>
                <div class="foodItem-right-description" v-show="food.description">{{food.description}}</div>
                <div class="foodItem-right-sellCount">月售{{food.sellCount}}份</div>
                <div class="foodRankRate">好评率{{food.rating}}%</div>
                <div>
                  <div class="price">￥{{food.price}}</div>
                  <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}
                  </span>
                </div>
              </div>
              <cartcontrol class="cartcontrol" :food="food"></cartcontrol>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :selectFood="selectFood" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <foodinfo ref="foodinfo" :food="checkFood"></foodinfo>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import iconMap from '@/components/iconMap/iconMap'
import shopcart from '@/components/shopcart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import foodinfo from '@/components/foodinfo/foodinfo'
const ERR_OK = 0;
export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      scrollY: 0,
      result: [],
      checkFood: {}
    }
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  components: {
    iconMap,
    shopcart,
    cartcontrol,
    foodinfo
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if(ERR_OK === response.errno) {
        this.goods = response.data;
        //console.log(this.goods);
        this.$nextTick(() => {
          this.initBScroll();
          this.foodsWrapperHeightRes();
        });
      }
    });
  },
  methods: {
    initBScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
        //console.log(this.scrollY);
      });
    },
    foodsWrapperHeightRes() {
      let length = 0;
      this.result.push(length);
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-hook');
      //console.log(foodsName);
      for(var i = 0; i < foodsList.length; i++) {
        var item = foodsList[i];
        length += item.clientHeight;
        this.result.push(length);
      }
      //console.log(result);
      return this.result;
    },
    selectMenu(index, event) {
      if(!event._constructed) {
        return;
      }
      let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-hook');
      this.foodsScroll.scrollToElement(foodsList[index], 300);
    },
    checkFoodInfo(food, event) {
      if(!event._constructed) {
        return;
      }
      this.checkFood = food;
      this.$refs.foodinfo.initShow();
    }
  },
  computed: {
    currentIndex() { // 返回当前index
      for(var i = 0; i < this.result.length; i++) {
        if (this.scrollY >= this.result[i] && this.scrollY < this.result[i+1]) {
          return i;
        }
      }
      return 0;
    },
    selectFood() {
      let selectFoodResult = [];
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          if(food.count) {
            selectFoodResult.push(food);
          }
        });
      });
      return selectFoodResult;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.goods
  display: flex
  position: absolute
  top: 180px
  bottom: 48px
  overflow: hidden
  width: 100%
  font-size: 0
  .goods-left
    flex: 0 0 80px
    width: 80px
    margin-left: -40px
    .goods-menu-item
      display: table
      font-size: 12px
      font-weight: 200
      line-height: 14px
      padding: 0 12px
      background: #f3f5f7
      height: 54px
      width: 56px
      margin: 0 auto
      cursor: pointer
      &.current
        background: white
      .text
        display: table-cell
        vertical-align: middle
        border-1px(rgba(7, 17, 27, 0.1))
        text-align: center
  .goods-right
    flex: 1
    margin-left: -40px
    margin-top: -4px
    width: 100%
    .foodsWrapper
      background: rgb(255, 255, 255)
      .foodsType
        font-size: 12px
        line-height: 26px
        height: 26px
        color: rgb(147, 153, 159)
        background: #f3f5f7
        padding-left: 14px
        border-left: 1px solid #d9dde1
    .foodItem
      position: relative
      width: 100%
      height: 100px
      margin-left: -40px
      border-1px(rgba(7, 17, 27, 0.1))
      .foodItem-left
        margin-left: 18px
        margin-top: 18px
        display: inline-block
      .foodItem-right
        display: inline-block
        margin-left: 10px
        margin-top: 20px
        vertical-align: top
        .foodItem-right-name
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 10px
        .foodItem-right-description
          margin-top: 8px
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .foodItem-right-sellCount
          display: inline-block
          margin-top: 8px
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .foodRankRate
          display: inline-block
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
          margin-left: 12px
        .price
          font-size: 14px
          display: inline-block
          color: rgb(240, 20, 20)
          font-weight: 700
          margin-top: 8px
        .oldPrice
          font-size: 10px
          margin-left: 8px
          display: inline-block
          color: rgb(147, 153, 159)
          font-weight: 700
          line-height: 24px
      .cartcontrol
        position: absolute
        right: 18px
        bottom: 18px
</style>
