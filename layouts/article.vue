<template>
    <app-container>
        <category-menu />
        <top-feature-block ad-namespace="article.header" />
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
    import CategoryMenu from '~/components/Menus/CategoryMenu'
    import TopFeatureBlock from '~/components/Blocks/TopFeatureBlock'

    export default {
        components: {
            AppContainer,
            CategoryMenu,
            TopFeatureBlock
        }
    }
</script>