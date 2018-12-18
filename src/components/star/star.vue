<template>
  <div class="star" :class="starSize">
    <ul style="list-style:none; margin-left: -40px">
      <li v-for="(item, index) in computedResult" :class="item" :key="index" class="starItem"></li>
    </ul>
  </div>
</template>

<script>
const LENGTH = 5;
const ON = 'on';
const HALF = 'half';
const OFF = 'off';
export default {
  name: 'star',
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  data () {
    return {}
  },
  computed: {
    starSize() {
      return 'star-'+this.size;
    },
    computedResult() {
      let starResult = [];
      let score  = Math.floor(this.score*2)/2;
      let halfStar = score % 1 !== 0;
      for(let i = 0; i < score; i++) {
        starResult.push(ON);
      }
      if(halfStar) {
        starResult.push(HALF);
      }
      while(LENGTH > starResult.length) {
        starResult.push(OFF);
      }
      return starResult;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.star-24  .starItem {
  display: inline-block;
  background-size: 10px 10px;
  margin-right: 3px;
  width: 10px;
  height: 10px;  
}
.star-24 .half {
  bg-img('star24_half');
}
.star-24 .on {
  bg-img('star24_on');
}
.star-24 .off {
  bg-img('star24_off');
}

.star-36 .starItem {
  display: inline-block;
  margin-right: 16px;
  width: 15px;
  height: 15px;
  background-size: 15px 15px;
}
.star-36 .on {
  bg-img('star36_on');
}
.star-36 .off {
  bg-img('star36_off');
}
.star-36 .half {
  bg-img('star36_half');
}

.star-48 .starItem {
  display: inline-block;
  margin-right: 22px;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
.star-48 .on {
  bg-img('star48_on');
}
.star-48 .off {
  bg-img('star48_off');
}
.star-48 .half {
  bg-img('star48_half');
}
</style>
