<template>
  <div class="icon" :class="result[iconType]"></div>
</template>

<script>
export default {
  name: 'iconMap',
  props: {
    iconType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      result: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.icon {
  display: inline-block;
  width: 12px;
  height: 12px;
  background-size: 100% 100%;
  vertical-align: top;
}

.decrease {
  bg-img('decrease_4');
}

.discount {
  bg-img('discount_4');
}

.special {
  bg-img('special_4');
}

.invoice {
  bg-img('invoice_4');
}

.guarantee {
  bg-img('guarantee_4');
}
</style>
