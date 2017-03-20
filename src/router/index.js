import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'component/goods/Goods';
import Sellers from 'component/seller/Seller';
import Ratings from 'component/rating/Rating';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/sellers',
      component: Sellers
    },
    {
      path: '/ratings',
      component: Ratings
    }
  ]
});
