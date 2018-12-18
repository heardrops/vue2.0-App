<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="content">
      <div class="tab_item">
        <router-link to="/goods" tag="a" class="item">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/seller" tag="a" class="item">商家</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings" tag="a" class="item">评论</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header'
const  ERR_OK = 0;
export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if(response.errno == ERR_OK) {
        this.seller = response.data;
      }
    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content
  display: flex
  width: 100%
  .tab_item
    height: 40px
    flex: 1
    text-align: center
    cursor: pointer
    color: rgb(77, 85, 93)
    line-height: 14px
    margin-top: 10px
    .item
      font-size: 14px
      text-decoration: none
      &.active, &.router-link-active
        color: rgb(240, 20, 20)
</style>
