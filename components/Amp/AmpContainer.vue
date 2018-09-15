<template>
    <div :class="$style.wrapper">
        <amp-bar />
        <div :class="$style.content">
            <slot />
        </div>
        <amp-sidebar id="amp_sidebar" layout="nodisplay" side="left" :class="$style.sidebar">
            <amp-menu />
        </amp-sidebar>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        overflow: hidden;
        
        .content {
            margin: 0;
        }

        .sidebar {
            margin: 0;
            padding: 0;
            position: fixed;
            overflow-y: scroll;
            top: 4.3rem;
            left: -100%;
            width: 16em;
            height: 100%;
            background: $color-accent-1;
            transition: left 0.2s linear;
            @include box_shadow(1);
        }
    }
</style>

<script>
    import AmpBar from '~/components/Amp/AmpBar'
    import AmpMenu from '~/components/Amp/AmpMenu'

    export default {
        components: {
            AmpBar,
            AmpMenu
        }
    }
</script>