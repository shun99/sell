<template>
  <div id="app">
    <a-header></a-header>
    <a-tab></a-tab>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from 'component/header/Header.vue';
  import Tab from 'component/Tab.vue';
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
          console.log(response.body);
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
