<template>
    <div :class="$style.wrapper">
        <div :class="$style.imageBlock">
            <nuxt-link :to="'/' + item.permalink" :class="$style.imageLink">
                <image-element :obj="item.featured"/>
                <div :class="$style.colorOverlay"></div>
            </nuxt-link>
        </div>
        <nuxt-link :class="$style.link" :to="'/' + item.permalink">
            <h3 :class="$style.title" v-html="item.title"></h3>
            <author-block no-avatar no-by no-link :author="item.author" :class="$style.author">{{ date }}</author-block>
        </nuxt-link>
        
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        position: relative;

        .imageBlock {
            height: 12em;
            overflow: hidden;
            position: relative;
            box-shadow: 0 2px 7px rgba(0, 0, 0, .1);

            .imageLink {
                display: block;
            }

            img {
                min-height: 12em;
                min-width: 125%;
            }
        }

        .link {
            display: block;

            &:link, &:visited, &:hover {
                text-decoration: none;
                color: inherit;
            }

            .title {
                margin-top: 1rem;
                margin-bottom: 0.5em;
                min-height: 3.75em;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
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
        .colorOverlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, .2) 100%);
            z-index: 1;
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
            }
        },
        computed: {
            date () {
                return moment(this.item.date).format('MMMM DD, YYYY, h:mma')
            }
        },
        components: {
            ImageElement,
            AuthorBlock
        }
    }
</script>