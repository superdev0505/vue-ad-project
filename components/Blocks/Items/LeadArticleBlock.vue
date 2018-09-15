<template>
    <div :class="[$style.wrapper, {[$style.topstories]: topstories}]">
        <image-element v-if="item.featured" fit="cover" :obj="item.featured" :class="$style.image"/>
        <nuxt-link :to="'/' + item.permalink" :class="$style.story">
            <div :class="$style.content">
                <div :class="$style.category" v-if="item.taxonomies.data">
                    <hr :class="$style.catLine" />
                    <template v-if="item.taxonomies.data[0].parent === 0">
                        <span v-html="item.taxonomies.data[0].name"></span>
                    </template>
                    <template v-else>
                        <span v-html="item.taxonomies.data[0].parent_term.name"></span>
                    </template>
                </div>
                <div :class="$style.link">
                    <span :class="[$style.title, 'h1']" v-html="item.title"></span>
                </div>
                <author-block v-if="item.author" no-avatar no-by no-link invert :author="item.author" :class="$style.author">
                    {{ date }}
                </author-block>
                <div :class="$style.readmore">
                    Read More <span class="icon-link-arrow-right"></span>
                </div>
            </div>
            <div :class="$style.colorOverlay"></div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    // all styles
    .wrapper {
        position: relative;
        background-color: $font-color;
        color: $color-white;
        padding: 2rem;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .1);

        a {
            color: white;
            text-decoration:none;
        }

        .category {
            font-family: $second-font-family;
            font-size: 0.875rem;
            text-transform: uppercase;
            font-style: italic;
            color: white;

            .catLine {
                height: 3px;
                background: $color-white;
                border: none;
                width: 3rem;
                margin: 0;
                margin-bottom: 0.5rem;
                padding: 0;
            }
        }

        .link {
            display: block;
            color: inherit;
            margin-top: 3rem;

            &:link, &:visited, &:hover {
                text-decoration: none;
                color: inherit;
            }

            .title {
                color: white;
                text-shadow: 0 0 20px rgba(0, 0, 0, .2);
                word-wrap: break-word;
                max-width: 18em;
            }
        }

        .readmore {
            margin-top: 2rem;
            display: block;
            color: $color-white;
            text-transform: uppercase;

            span:before {
                position: relative;
                top: 1px;
                right: 0;
                transition: all .25s ease;
                font-size: .875em;
            }

            &:hover, &:focus {
                text-decoration: none;

                span:before {
                    right: -5px;
                    transition: all .25s ease;
                }
            }
        }

        .content {
            position: relative;
            z-index: 2;
        }

        .colorOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .25) 100%);
            z-index: 1;
        }
    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {
            min-height: 30em;

            .link {
                margin-top: 5em;
            }
        }
    }

    // phone only
    @include media("<tablet") {

        .wrapper {
            padding: 1.5em;

            .link {
                margin-top: 2em;
            }

            // Top Stories
            &.topstories {
                padding: 0;
                background-color: transparent;
                box-shadow: none;

                .story {
                    width: 60%;
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
                    width: calc(60% - 1rem);
                    bottom: auto;
                    right: 0;
                    position: absolute;
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
    import AuthorBlock from '~/components/Blocks/AuthorBlock'
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
            topstories: {
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        computed: {
            date () {
                return moment(this.item.date).format('MMMM DD, YYYY, h:mma')
            }
        },
        components: {
            AuthorBlock,
            ImageElement
        }
    }
</script>
