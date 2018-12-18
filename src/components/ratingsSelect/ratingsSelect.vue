<template>
  <div class="ratingsSelect">
    <div class="ratingType">
      <div class="all" :class="{'active': nowRatingsType === 2}" @click="select(2, $event)">
        <span class="text">{{ratingsDesc[0]}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="good" :class="{'active': nowRatingsType === 0}" @click="select(0, $event)">
        <span class="text">{{ratingsDesc[1]}}</span>
        <span class="count">{{goodReault.length}}</span>
      </div>
      <div class="bad" :class="{'active': nowRatingsType === 1}" @click="select(1, $event)">
        <span class="text">{{ratingsDesc[2]}}</span>
        <span class="count">{{badResult.length}}</span>
      </div>
    </div>
    <div class="onlyContent">
      <i class="icon-check_circle" :class="{'on': content === true}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="ratingsList">
      <ul style="list-style:none; margin-left: -40px;">
        <li class="ratingsItem" v-for="(ratingsItem, index) in ratings" :key="index" v-show="needShowList(ratingsItem.rateType)">
          <div class="ratingsItem_img">
            <img :src="ratings[index].avatar" width="28" height="28">
          </div>
          <div class="ratingsItem_content">
            <div class="username">{{ratings[index].username}}</div>
            <div class="starDesc">
              <star class="star" :size="24" :score="ratings[index].score"></star>
              <span class="text">{{ratings[index].deliveryTime}}分钟送达</span>
            </div>
            <div class="text">{{ratings[index].text}}</div>
            <div class="desc">
              <i :class="[{'icon-thumb_up': ratings[index].rateType === 0}, {'icon-thumb_down': ratings[index].rateType === 1}]"></i>
              <ul class="recommendList" style="list-style:none; margin-left: -35px;">
                <li class="recommendItem" v-for="(recommendItem, index) in ratings[index].recommend" :key="index" v-show="ratings[index].recommend">{{recommendItem}}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<!--const定义的值不能在模板里面使用-->
<script>
const ALL = 2;
const BAD = 1;
const GOOD = 0;
import star from '@/components/star/star'
export default {
  name: 'ratingsSelect',
  components: {
    star
  },
  data () {
    return {
      nowRatingsType: ALL,
      content: false
    }
  },
  props: {
    ratings: {
      type: Array,
      default: []
    },
    ratingsDesc: {
      type: Array,
      default: [
        '全部',
        '满意',
        '不满意'
      ]
    }
  },
  computed: {
    goodReault() {
      return this.ratings.filter((item) => {
        return item.rateType === GOOD;
      });
    },
    badResult() {
      return this.ratings.filter((item) => {
        return item.rateType === BAD;
      });
    }
  },
  methods: {
    select(index, event) {
      if(!event._constructed) {
        return;
      }
      //console.log(index);
      //console.log(ALL);
      if(index === ALL) {
        this.nowRatingsType = ALL;
      } else if(index === GOOD) {
        this.nowRatingsType = GOOD;
        //console.log(this.nowRatingsType);
      } else {
        this.nowRatingsType = BAD;
      }
      //传到父组件刷新
      this.$emit('selectedType');
    },
    needShowList(type) {
      if(this.nowRatingsType === ALL) {
        return true;
      }
      //console.log(this.nowRatingsType === type);
      return this.nowRatingsType === type;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.ratingsSelect
  position: relative
  padding: 18px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .ratingType
    padding-bottom: 18px
    border-bottom: 1px solid rgb(147, 153, 159)
    .all, .good, .bad
      display: inline-block
      padding: 10px
      background: #CCECF8
      margin-right: 6px
      cursor: pointer
      &.active
        background: #00A0DC
        color: #fff
      .text
        font-size: 16px
      .count
        font-size: 10px
        margin-left: 4px
    .bad
      background: #E9EBEC
      &.active
        background: #626464
        color: #fff
  .onlyContent
    padding: 18px 0
    border-bottom: 1px solid rgb(147, 153, 159)
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
      line-height: 24xp
      &.on
        color: #00A0DC
    .text
      line-height: 18px
      font-size: 18px
      color: #93999F
  .ratingsList
    .ratingsItem
      display: flex
      padding: 18px 0
      border-bottom: 1px solid rgba(147, 153, 159, 0.3)
      .ratingsItem_img
        flex: 0 0 18px
      .ratingsItem_content
        margin-left: 12px
        flex: 1
        .username
          font-size: 10px
          color: rgb(7, 17, 27)
          line-height: 12px
        .starDesc
          margin-top: 4px
          .star
            display: inline-block
          .text
            display: inline-block
            font-size: 10px
            font-weight: 200
            margin-left: 6px
            color: rgb(147, 153, 159)
            line-height: 12px
        .text
          margin-top: 6px
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 18px
        .desc
          margin-top: 8px
          .icon-thumb_up
            font-size: 12px
            color: rgb(0, 160, 220)
            line-height: 16px
          .icon-thumb_down
            font-size: 12px
            color: rgb(183, 187, 191)
            line-height: 16px
          .recommendList
            margin-top: -15px
            overflow: hidden
            .recommendItem
              display: inline-block
              text-align: center
              border-bottom: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 24px
              margin-left: 12px
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              width: 50px
              height: 16px
              overflow: hidden
              text-overflow: ellipsis
              white-space: nowrap
              &:last-child
                border-bottom: none
</style>
