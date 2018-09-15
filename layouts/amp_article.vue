<template>
    <amp-container>
        <article :class="$style.wrapper">
            <nuxt />
        </article>
    </amp-container>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
        max-width: 640px;
    }
</style>

<script>
    import AmpContainer from '~/components/Amp/AmpContainer'

    export default {
        components: {
            AmpContainer
        }
    }
</script>