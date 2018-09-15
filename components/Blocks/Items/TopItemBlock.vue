<template>
    <div :class="$style.wrapper">
        
        <div :class="$style.imageBlock">
            <image-element v-if="item.featured" :obj="item.featured" />
            <image-element v-else src="http://placehold.it/150x150" />
        </div>
        <div :class="$style.content">
            <h3 :class="$style.title" v-html="item.title"></h3>
            <div v-html="item.excerpt" :class="$style.excerpt"></div>
            <author-block no-avatar no-by no-link :author="item.author" :class="$style.author">{{ date }}</author-block>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        display: flex;
        justify-content: space-between;  
        align-items: flex-start;

        .imageBlock {
            width: 40%;
            position: relative;

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

            img {
                display: block;
                width: 100%;
                box-shadow: 0 2px 7px rgba(0, 0, 0, .1);
            }
        }

        .content {
            width: calc(60% - 1em);

            .excerpt {
                display: none;
            }

            .title {
                margin-top: 0;
                margin-bottom: .5em;
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

    // tablet and up
    @include media(">=tablet") {

        .wrapper {   

            .imageBlock {
                width: 33%;
            }

            .content {
                margin-left: 1.5em;
                width: 67%;

                .excerpt {
                    font-family: $second-font-family;
                    margin-bottom: 1em;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;  
                }
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
                default() {
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