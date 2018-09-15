<template>
    <div :class="[$style.wrapper, {[$style.sponsored]: sponsored}, {[$style.topstories]: topstories}]" :topStories="topstories">
        <image-element v-if="item.featured" fit="cover" :obj="item.featured" :class="$style.image"/>
        <nuxt-link :to="'/' + item.permalink" :class="$style.story">
            <div :class="$style.content">
                <div :class="[$style.link, {[$style.sponsored]: sponsored}]">
                    <h3 :class="$style.title" v-html="item.title"></h3>
                </div>
            </div>
            <div :class="$style.colorOverlay"></div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    // base styles
    .wrapper {
        position: relative;
        background-color: $font-color;
        //background-size: cover;
        background-repeat: no-repeat;
        color: $color-white;
        padding: 1rem;
        height: 15rem;
        min-height: 15rem;
        max-height: 15rem;
        margin: 1rem 0;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .1);

        a {
            color: white;
            text-decoration: none;
        }
        
        .link {

            &:link, &:visited, &:hover {
                text-decoration: none;
                color: inherit;
            }

            .title {
                color: inherit;
                text-shadow: 0 0 20px rgba(0, 0, 0, .2);
                margin-bottom: 0.75em;
            }
        }

        .content {
            z-index: 2;
            position: absolute;
            bottom: 0;
            width: calc(100% - 2em);
        }

        .colorOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, .25) 100%);
            z-index: 1;
        }

        &.sponsored {
            padding: 0;

            .content {
                width: 100%;
            }

            .link {
                display: block;
                background: $color-primary;
                color: $color-white;
                padding: 0.25em 1em;
            }

            .title {
                color: $color-white;
                font-size: 1.25em;
            }
        }
    }

    // phone only
    @include media("<tablet") {

        .wrapper {

            .link {
                margin-top: 2em;
            }

            // Top Stories
            &.topstories {
                background-color: transparent;
                box-shadow: none;
                padding: 0;
                min-height: 0;
                height: auto;

                .story {
                    width: calc(60% - 1em);
                    margin-left: 1em;
                    display: inline-block;
                    vertical-align: top;
                }

                .image {
                    width: 40% !important;
                    position: relative !important;
                    height: auto !important;
                    box-shadow: 0 2px 7px rgba(0, 0, 0, .1);
                }

                .content {
                    position: relative;
                    width: 100%;
                }

                .category, .readmore, .author {
                    display: none;
                }

                .link {
                    margin-top: 0;

                    .title {
                        color: initial;
                        margin: 0;
                        text-shadow: none;
                        font-size: 1.25em;
                    }
                }

                .colorOverlay {
                    display: none;
                }
            }
        }
    }

</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'
    import moment from 'moment'

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
            topstories: {
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        computed: {
            date () {
                return moment(this.item.date).fromNow()
            }
        },
        components: {
            ImageElement
        }
    }
</script>