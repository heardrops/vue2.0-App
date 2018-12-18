<template>
  <div class="ratings" ref="ratingsContent">
    <div class="ratings_content">
      <div class="descWrapper">
        <div class="descWrapper_left">
          <span class="score">{{seller.foodScore}}</span>
          <span class="descScore">综合评分</span>
          <span class="rankRate">高于周边商家{{seller.rankRate}}%</span>
        </div>
        <div class="descWrapper_right">
          <div class="starScore">
            <span class="text">服务态度</span>
            <star class="star" :size="36" :score="seller.score"></star>
            <span class="score">{{seller.score}}</span>
          </div>
          <div class="deliveryTimeWrapper">
            <span class="text">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingsSelect :ratings="ratings" :ratingsDesc="ratingsDesc" @selectedType="refreshScroll"></ratingsSelect>
    </div>
  </div>
</template>

<!--better-scroll在使用必须有两层div把需要滚动的list包围，其中最外层写ref,第2层是better-scroll组件在导入时要计算的高度层，可以不用添加样式-->

<script>
import star from '@/components/star/star'
import split from '@/components/split/split'
import ratingsSelect from '@/components/ratingsSelect/ratingsSelect'
import BScroll from 'better-scroll'
const ERR_OK = 0;
export default {
  name: 'ratings',
  data () {
    return {
      ratings: [],
      ratingsDesc: [
        '全部',
        '满意',
        '不满意'
      ]
    }
  },
  components: {
    star,
    split,
    ratingsSelect
  },
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.$http.get('/api/ratings').then((res) => {
      res = res.body;
      if(ERR_OK === res.errno) {
        this.ratings = res.data;
        this.$nextTick(() => {
          this._initScroll();
        });
      }
    });
  },
  methods: {
    _initScroll() {
      this.ratingsScroll = new BScroll(this.$refs.ratingsContent, {
        click: true
      });
    },
    refreshScroll() {
      this.$nextTick(() => {
        if(!this.ratingsScroll) {
          this._initScroll();
        } else {
          this.ratingsScroll.refresh();
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.ratings
  font-size: 0
  width: 100%
  position: fixed
  top: 174px
  bottom: 0
  left: 0
  overflow: hidden
  .descWrapper
    display: flex
    padding: 18px 24px
  .descWrapper_left
    flex: 0 0 137px
    text-align: center
    border-right: 1px solid rgb(147, 153, 159)
    .score
      font-size: 24px
      color: rgb(255, 153, 0)
      line-height: 28px
      display: block
    .descScore
      display: block
      font-size: 12px
      margin-top: 6px
      margin-bottom: 8px
      color: rgb(7, 17, 27)
      line-height: 12px
    .rankRate
      display: block
      font-size: 10px
      margin-bottom: 6px
      color: rgb(147, 153, 159)
      line-height: 10px
  .descWrapper_right
    flex: 1
    padding-left: 24px
    .starScore
      margin-bottom: 8px
      .text
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 18px
      .star
        display: inline-block
        margin-left: 12px
        margin-right: 12px
        vertical-align: top
      .score
        font-size: 12px
        color: rgb(255, 153, 0)
        line-height: 18px
    .deliveryTimeWrapper
      .text
        font-size: 12px
        color: rgb(7, 17, 27)
        line-height: 18px
        display: inline-block
        margin-right: 12px
      .time
        font-size: 12px
        color: rgb(147, 153, 159)
        line-height: 18px
</style>
