<template>
    <div :class="$style.wrapper">
        <nuxt-link :to="newsLink" :class="$style.flexContainer">
            <div :class="$style.imageBlock">
                <div :class="$style.box">
                    <image-element :obj="item.featured" :amp="amp" fit="cover" :class="$style.image"/>
                </div>
            </div>
            <div :class="[$style.link, {[$style.sponsored]: sponsored}]">
                <div :class="$style.category" v-if="item.taxonomies.data.length">
                    <template v-if="item.taxonomies.data[0].parent === 0">
                        <span v-html="item.taxonomies.data[0].name"></span>
                    </template>
                    <template v-else>
                        <span v-if="item.taxonomies.data[0].parent_term" v-html="item.taxonomies.data[0].parent_term.name"></span>
                    </template>
                </div>
                <h4 :class="$style.title" v-html="item.title"></h4>
                <author-block :amp="amp" no-avatar no-by no-link :author="item.author" :class="$style.author">{{ date }}</author-block>
            </div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    .desktopHide:nth-child(n+10) {
        display: none;
    }

    .wrapper {

        .flexContainer {
            display: flex;
            justify-content: space-between;
            margin: 2em 0 0;

            &:link, &:visited, &:hover {
                text-decoration: none;
                color: inherit;
            }
        }

        .imageBlock {
            width: 40%;
            position: relative;
        }

        // overlay
        .box {
            position: absolute;
            height: 100%;
            width: 100%;

            &:after {
                  display: block;
                  position: absolute;
                  background-color: rgba(0,0,0,0.2);
                  height: 100%;
                  width: 100%;
                  top: 0;
                  content: '';
                  z-index: 3;
            }
        }

        .image {
            position: relative !important;
            // height: auto !important;
            display: block;
            box-shadow: 0 2px 7px rgba(0, 0, 0, .1);
        }

        .link {
            margin-left: 1em;
            width: calc(60% - 1em);

            .category {
                font-family: $second-font-family;
                font-size: 0.75rem;
                text-transform: uppercase;
                font-style: italic;
                font-weight: 700;
            }

            .title {
                margin-top: 0.5rem;
                margin-bottom: 0.75rem;
            }

            // author block
            .author {

                span:first-child {
                    color: initial;
                    margin-right: 0.25em;
                    opacity: .5;
                    font-weight: 700;
                }
            }
        }
    }

    // phone only
    @include media("<tablet") {

        .wrapper {
            margin-bottom: 2em;

            .author span:last-of-type {
                display: none;
            }
        }
    }

</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'
    import AuthorBlock from '~/components/Blocks/AuthorBlock'
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
            amp: {
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        computed: {
            date () {
                return moment(this.item.date).format('MMMM DD, YYYY, h:mma')
            },
            newsLink () {
                if(this.amp) {
                    return '/amp/' + this.item.permalink
                } else {
                    return '/' + this.item.permalink
                }
            }
        },
        components: {
            ImageElement,
            AuthorBlock
        }
    }
</script>
