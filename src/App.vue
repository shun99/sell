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
    components: {
      'a-header': Header,
      'a-tab': Tab
    }
  };
</script>
