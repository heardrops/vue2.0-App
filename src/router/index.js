import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import HelloWorld from '@/components/HelloWorld'
import goods from '@/components/goods/goods'
import seller from '@/components/seller/seller'
import ratings from '@/components/ratings/ratings'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/goods',
      component: goods
    },
    {
    	path: '/goods',
    	name: 'goods',
    	component: goods
    },
    {
    	path: '/seller',
    	name: 'seller',
    	component: seller
    },
    {
    	path: '/ratings',
    	name: 'ratings',
    	component: ratings
    }
  ]
})
