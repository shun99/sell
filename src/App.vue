<template>
  <div id="app">
    <a-header v-bind:seller="seller"></a-header>
    <a-tab></a-tab>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from 'component/header/Header.vue';
  import Tab from 'component/Tab.vue';
  import {urlParse} from './common/js/urlutils';

  const NO_ERR = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getSeller();
      });
    },

    methods: {
      getSeller: function () {
        this.$http.get('/api/seller').then(response => {
          if (response.body.errNo === NO_ERR) {
            /***
             * 这样回覆盖原来seller已有的数据。
             * this.seller = response.body.data;
             * 在不覆盖原来数据的前提下添加数据。
             */
            this.seller = Object.assign({}, this.seller, response.body.data);
          }
        });
      }
    },
    components: {
      'a-header': Header,
      'a-tab': Tab
    }
  };
</script>
