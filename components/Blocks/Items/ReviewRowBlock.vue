<template>
    <div :class="$style.wrapper">
        <div :class="$style.imageBlock">
            <nuxt-link :to="'/' + item.permalink"  :class="$style.imageLink">
                <image-element :obj="item.featured"/>
            </nuxt-link>
        </div>
        <nuxt-link :class="[$style.link, {[$style.sponsored]: sponsored}]" :to="'/' + item.permalink">
            <h4 :class="$style.title" v-html="item.title"></h4>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        display: flex;
        justify-content: space-between;
        margin: 2em 0 0;

        .imageBlock {
            width: 45%;
            height: 6em;
            overflow: hidden;
            position: relative;
            box-shadow: 0 2px 7px rgba(0, 0, 0, .1);

            .imageLink {
                display: block;
            }

            img {
                min-height: 6em;
                min-width: 125%;
                left: -10%;
                position: relative;
            }
        }

        .link {
            width: 51%;

            &:link, &:visited, &:hover {
                text-decoration: none;
                color: inherit;
            }

            .title {
                margin-top: 0;
                margin-bottom: 0.75rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 5;
                -webkit-box-orient: vertical;
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
                default () {
                    return {}
                }
            },
            sponsored: {
                type: Boolean,
                default () {
                    return false
                }
            },

        },
        components: {
            ImageElement
        }
    }
</script>