<template>
    <app-container>
        <article :class="$style.wrapper">
            <nuxt />
        </article>
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