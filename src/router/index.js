import Vue from 'vue';
import Router from 'vue-router';
import Goods from 'component/Goods';
import Sellers from 'component/Sellers';
import Ratings from 'component/Ratings';

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
