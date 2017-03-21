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
  const NO_ERR = 0;
  export default {
    data () {
      return {
        seller: {}
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
            console.log(response.body);
            this.seller = response.body.data;
          }
        }, response => {

        });
      }
    },
    components: {
      'a-header': Header,
      'a-tab': Tab
    }
  };
</script>
