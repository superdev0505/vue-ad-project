<template>
    <app-container>
        <top-feature-block ad-namespace="page.header" />
        <article :class="$style.wrapper">
            <nuxt />
        </article>
    </app-container>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
        max-width: 1280px;
    }
</style>

<script>
    import AppContainer from '~/components/AppContainer'
    import TopFeatureBlock from '~/components/Blocks/TopFeatureBlock'

    export default {
        components: {
            AppContainer,
            TopFeatureBlock
        }
    }
</script>