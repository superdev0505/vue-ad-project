<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">Follow Us</div>
        <social-list-block />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin-top: 1em;

        .title {
            text-align: center;
            margin-bottom: 0.5em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;            
            text-transform: uppercase;
            font-style: italic;
        }
    }
</style>

<script>
    import SocialListBlock from '~/components/Blocks/Lists/SocialListBlock'

    export default {
        components: {
            SocialListBlock
        }
    }
</script>