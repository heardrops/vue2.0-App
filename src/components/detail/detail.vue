<template>
  <div class="detail">
    <div class="wrapper clearfix">
      <div class="detail-content">
        <h1 class="detail-name">{{seller.name}}</h1>
        <div class="detail-star">
          <star :size="48" :score="seller.score"></star>
        </div>
        <div class="detail-discount">
          <div class="detail-line"></div>
          <div class="detail-discount-item">优惠信息</div>
          <div class="detail-line"></div>
        </div>
        <ul style="list-style:none;">
          <li v-for="(item, index) in seller.supports" class="detail-supports">
            <iconMap :iconType="index" class="detail-icon"></iconMap>
            <span class="detail-description">{{item.description}}</span>
          </li>
        </ul>
        <div class="detail-discount">
          <div class="detail-line"></div>
          <div class="detail-discount-item">商家公告</div>
          <div class="detail-line"></div>
        </div>
        <span class="detail-bulletin">{{seller.bulletin}}</span>
      </div>
    </div>
    <div class="detail-close" @click="closeDetail">
      <i class="icon-close"></i>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import iconMap from '@/components/iconMap/iconMap'
export default {
  name: 'detail',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    iconMap
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    closeDetail() {
      this.$emit('onClose');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.detail {
  position: fixed;
  font-size: 10px;
  color: black;
  background: rgba(7, 17, 27, 0.8);
  z-index: 200;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: rgb(255, 255, 255);
}

.wrapper {
  width: 100%;
  height: 100%;
}

.detail > .wrapper {
  height: auto;
  min-height: 100%;
}

.detail-content {
  padding-bottom: 32px;
  margin-top: 64px;
  margin-left: 36px;
  margin-right: 36px;
}

.detail-close {
  position: relative;
  margin-top: -32px;
  height: 32px;
  clear: both;
}

.clearfix {
  display: inline-block;
}

.clearfix:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.detail-name {
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  text-align: center;
}

.detail-star {
  height: 24px;
  line-height: 24px;
  margin-top: 16px;
  text-align: center;
}

.detail-discount {
  display: flex;
  margin: 28px 0px 24px 0px;
}

.detail-line {
  position: relative;
  top: -12px;
  flex: 1
  display: inline-block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.detail-discount-item {
  display: inline-block
  font-weight: 700;
  font-size: 16px;
  margin-right: 6px;
  margin-left: 6px;
}

.detail-supports {
  margin-bottom: 12px;
}

.detail-supports:last-child {
  margin-bottom: 0px;
}

.detail-icon {
  vertical-align: top; 
}

.detail-description {
  vertical-align: top;
  margin-left: 6px;
  font-size: 12px;
  font-weight: 200;
  line-height: 12px;
}

.detail-bulletin {
  margin-left: 12px;
  font-weight: 200;
  font-size: 12px;
  line-height: 24px;
}

.detail-close {
  cursor: pointer;
  text-align: center;
  font-size: 32px;
  color: rgba(255, 255, 255, 0.5);
}
</style>
