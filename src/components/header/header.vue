<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="header-left">
        <img :src="seller.avatar" width="64px" height="64px">
      </div>
      <div class="header-right">
        <div class="header-right-name">
          <span class="brand"></span>
          <span class="brand-name">{{seller.name}}</span>
        </div>
        <div class="header-right-desc">{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</div>
        <div v-if="seller.supports" class="header-right-supports">
          <iconMap :iconType="seller.supports[0].type"></iconMap>
          <span>{{ seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-img"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
    </div>
    <div class="count" @click="detailShow">
      <span class="countLenght">{{ seller.supports.length }} 个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <detail v-show="showDetail" :seller="seller" @onClose="detailHide"></detail>
  </div>
</template>

<script>
import iconMap from '@/components/iconMap/iconMap'
import detail from '@/components/detail/detail'
export default {
  name: 'header',
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  components: {
    iconMap,
    detail
  },
  data () {
    return {
      showDetail: false
    }
  },
  methods: {
    detailShow() {
      this.showDetail = true;
    },
    detailHide() {
      this.showDetail = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.header
  position: relative
  font-size: 0
  padding: 0
  margin: 0
  background: rgba(7, 17, 27, 0.5)
  color: rgb(255, 255, 255)
  font-weight: 200
  position: relative
  .header-wrapper
    padding: 24px 12px 18px 24px
    .header-left
      display: inline-block
      img
        border-radius: 4px
    .header-right
      display: inline-block
      vertical-align: top
      margin-top: 2px
      margin-left: 16px
      position: relative
      .header-right-name
        font-size: 16px
        .brand
          display: inline-block
          width: 30px
          height: 18px
          background-size: 100% 100%
          bg-img('brand')
          vertical-align: top
        .brand-name
          margin-left: 6px
          font-weight: bold
          vertical-align: top
          line-height: 18px
      .header-right-desc
        font-size: 12px
        margin-top: 8px
        line-height: 12px
      .header-right-supports
        font-size: 10px
        margin-top: 10px
        line-height: 12p
  .bulletin-wrapper
    position: relative
    display: inline-block
    width: 95%
    height: 28px
    line-height: 28px
    padding: 0 12px 0 12px
    background: rgba(7, 17, 27, 0.2)
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    .bulletin-img
      width: 22px
      height: 14px
      bg-img('bulletin')
      margin-top: 8px
      background-size: 100% 100%
      display: inline-block
    .bulletin
      font-size: 10px
      margin: 0 4px
      vertical-align: top
  .count
    position: absolute
    background: rgba(0, 0, 0, 0.2)
    height: 24px
    right: 12px
    width: 50px
    bottom: 35px
    border-radius: 14px
    color: rgb(255, 255, 255)
    line-height: 24px
    cursor: pointer
    .countLenght
      font-size: 10px
      margin-left: 8px
    .icon-keyboard_arrow_right
      font-size: 10px
      margin-left: 2px
  .background
    width: 100%
    height: 100%
    position: absolute;
    top: 0
    left: 0
    background-size: 100% 100%
    filter: blur(10px)
    z-index: -1
</style>
