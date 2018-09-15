<template>
    <div :class="$style.wrapper">
        <subscribe-widget />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
    }
</style>

<script>
    import SubscribeWidget from '~/components/Widgets/SubscribeWidget'

    export default {
        components: {
            SubscribeWidget
        }
    }
</script>
