<template>
  <div class="seller" ref="sellerList">
    <div class="sellerScroll">
      <div class="sellerContent">
        <div class="contentTop">
          <div class="name">{{seller.name}}</div>
          <div class="star">
            <star class="starList" :size="36" :score="seller.score"></star>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorites" @click="toggleFavorites">
            <i class="icon-favorite" :class="{'on': isFavorties}"></i>
            <div class="text">{{favoriteText}}</div>
          </div>
        </div>
        <div class="contentBottom">
          <div class="minPrice">
            <div class="text">起送价</div>
            <div class="count">{{seller.minPrice}}
              <span class="desc">元</span>
            </div>
          </div>
          <div class="deliveryPrice">
            <div class="text">商家配送</div>
            <div class="count">{{seller.deliveryPrice}}
              <span class="desc">元</span>
            </div>
          </div>
          <div class="deliveryTime">
            <div class="text">平均配送时间</div>
            <div class="count">{{seller.deliveryTime}}
              <span class="desc">分钟</span>
            </div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="bulletinWrapper">
        <div class="text">公告与活动</div>
        <span class="bulletin">{{seller.bulletin}}</span>
        <div class="supportsWrapper">
          <ul style="list-style:none; margin-left: -40px;">
            <li class="support" v-for="(support, index) in seller.supports" :key="index">
              <iconMap class="icon" :iconType="support.type"></iconMap>
              <span class="text">{{support.description}}</span> 
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="picsWrapper">
        <div class="text">商家实景</div>
        <div class="picsList" ref="picsList">
          <ul style="list-style:none; margin-left: -40px;">
            <li class="pic" v-for="(pic, index) in seller.pics">
              <img :src="pic" width="120px" height="90px">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="infosWrapper">
        <div class="text">商家信息</div>
        <div class="infosList">
          <ul style="list-style:none; margin-left: -40px;">
            <li class="info" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
          </ul>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import iconMap from '@/components/iconMap/iconMap'
import BScroll from 'better-scroll'
export default {
  name: 'seller',
  components: {
    star,
    split,
    iconMap
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      isFavorties: false
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      this.sellerListScroll = new BScroll(this.$refs.sellerList, {
        click: true
      });
      this.picsListScroll = new BScroll(this.$refs.picsList, {
        scrollX: true,
        eventPassthrougn: 'vertical',
        click: true
      });
    },
    toggleFavorites(event) {
      if(!event._constructed) { // 如果不存在这个属性，则为原生点击事件， 不执行下面的函数
        return;
      }
      console.log(11111);
      this.isFavorties = !this.isFavorties;
      console.log(222);
    }
  },
  computed: {
    favoriteText() {
      return this.isFavorties ? '已收藏' : '收藏';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.seller
  position: fixed
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  font-size: 0
  overflow: hidden
  .sellerContent
    padding: 18px
    .contentTop
      margin-bottom: 18px
      position: relative
      .name
        font-size: 14px
        color: rgb(7, 17, 27)
        line-height: 14px
      .star
        margin-top: 8px
        .starList
          display: inline-block
        .sellCount
          display: inline-block
          margin-left: 12px
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
      .favorites
        position: absolute
        right: 0
        bottom: 0
        cursor: pointer
        .icon-favorite
          font-size: 24px
          color: #D4D6D9
          line-height: 24px
          &.on
            color: rgb(240, 20, 20)
        .text
          margin-top: 4px
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 10px
    .contentBottom
      padding-top: 18px
      display: flex
      .minPrice, .deliveryPrice, .deliveryTime
        flex: 1
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        text-align: center
        &:last-child
          border-right: none
        .text
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 10px
        .count
          margin-top: 4px
          font-size: 24px
          font-weight: 200
          color: rgb(7, 17, 27)
          line-height: 24px
          .desc
            font-size: 10px
  .bulletinWrapper
    padding: 18px 18px 0px 18px
    .text
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
    .bulletin
      display: block
      margin: 8px 12px 16px 12px
      font-size: 12px
      font-weight: 200
      color: rgb(240, 20, 20)
      line-height: 24px
    .supportsWrapper
      .support
        padding: 16px 12px
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        .icon
          display: inline-block
          vertical-align: top
        .text
          display: inline-block
          margin-left: 6px
          font-weight: 200
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 16px
          vertical-align: top
  .picsWrapper
    padding: 18px
    .text
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
    .picsList
      width: 100%
      margin-top: 12px
      overflow: hidden
      white-space: nowrap
      .pic
        display: inline-block
        margin-right: 6px
      &:last-child
        margin-right: none
  .infosWrapper
    padding: 18px
    .text
      font-size: 14px
      color: rgb(7, 17, 27)
      line-height: 14px
      margin-bottom: 12px
    .infosList
      .info
        padding: 16px 12px
        font-size: 12px
        font-weight: 200
        color: rgb(7, 17, 27)
        line-height: 16px
        border-top: 1px solid rgba(7, 17, 27, 0.1)
</style>
