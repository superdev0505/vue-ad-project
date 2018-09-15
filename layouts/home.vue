<template>
    <app-container>
        <div :class="$style.wrapper">
            <nuxt />
        </div>
    </app-container>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;
    }
</style>

<script>
    import AppContainer from '~/components/AppContainer'

    export default {
        components: {
            AppContainer
        }
    }
</script>