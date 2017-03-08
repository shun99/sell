// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// webpack 打包的入口，此处引入的资源都是全局使用
import Vue from 'vue';
import App from './App';
import router from './router';
import 'common/stylus/index.styl';
import resource from 'vue-resource';

Vue.use(resource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
