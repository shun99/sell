<template>
    <div id="app">
        <a-header></a-header>
        <a-tab></a-tab>
        <div>内容</div>
    </div>
</template>

<script>
    import Header from './components/header/Header.vue';
    import Tab from './components/Tab.vue';
    export default {
        components: {
            'a-header': Header,
            'a-tab': Tab
        }
    };
</script>

<style>
</style>
