<template>
    <div class="tab">
        <div class="tab-item"><router-link to="/goods">商品</router-link></div>
        <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to="/sellers">商家</router-link></div>
    </div>
</template>

<script type="text/ecmascript-6">
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tab
        display: flex
        width: 100%
        height: 40px
        line-height: 40px
    .tab .tab-item
        flex: 1
        text-align: center
</style>
