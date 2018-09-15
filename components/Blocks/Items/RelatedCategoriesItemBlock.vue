<template>
    <div :class="$style.wrapper">
        <image-element v-if="item.image" fit="cover" :obj="item.image" />
        <div :class="$style.bar" :style="{background: color}">
            <div :class="$style.title" v-html="item.name"></div>
            <div :class="$style.icon">
                <span class="icon-link-arrow-right"></span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        height: 15rem;
        max-height: 15rem;
        min-height: 15rem;
        //background-size: cover;
        //background-repeat: no-repeat;
        position: relative;
        background: #EEE;

        .bar {
            color: $white;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: row;
            padding: 0.5rem;

            &:link, &:visited, &:hover {
                text-decoration: none;
            }

            .title {
                flex: 11;
            }

            .icon {
                flex: 1;
                text-align: right;

                span:before {
                    position: relative;
                    top: 1px;
                    right: 0;
                    transition: all .25s ease;
                    font-size: .875em;
                }

                &:hover, &:focus {
                    text-decoration: none;
                }
            }

        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            item: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
            color() {
                if (this.item.acf && this.item.acf.color) {
                    return this.item.acf.color
                }

                return this.$store.state.category.color
            }
        },
        components: {
            ImageElement
        }
    }
</script>