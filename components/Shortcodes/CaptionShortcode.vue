<template>
    <div :class="[$style.wrapper, $style[align]]" :style="{width: width === 'auto' ? width : width + 'px'}">
        <slot></slot>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
        padding: 0.5em;
        background-color: $grey-bg;
        max-width: 100%;
        &.alignnone {
            display: block;
        }

        &.aligncenter {
            display: block;
            text-align: center;
        }

        &.alignright {
            display: block;
            text-align: right;
        }

        &.alignleft {
            display: block;
            text-align: left;
        }

        >a, >img {
            display: block;
        }
    }
</style>

<script>
    export default {
        props: {
            align: {
                type: String,
                default() {
                    return 'alignnone'
                }
            },
            width: {
                type: String,
                default() {
                    return 'auto'
                }
            }
        }
    }
</script>
