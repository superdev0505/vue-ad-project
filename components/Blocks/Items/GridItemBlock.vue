<template>
        <nuxt-link :to="'/' + item.permalink" :class="[$style.wrapper, {[$style.sponsored]: sponsored}]">
            <div :class="$style.contain">
                <div :class="$style.box">
                    <image-element :obj="item.featured" fit="cover" :class="$style.image"/>
                </div>
            </div>
            <div :class="[{[$style.sponsoredTitle]: sponsored}, $style.right]">
                <h4 :class="$style.title" v-html="item.title"></h4>
                <author-block no-avatar no-by no-link :author="item.author" :class="$style.author">{{ date }}</author-block>
            </div>
        </nuxt-link>
</template>

<style lang="scss" module>
    // all styles
    .wrapper {
        display: flex;
        justify-content: space-between;
        margin: 1em 0;

        .contain {  
            width: 40%; 
        }

        .box {
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
        }

        .image {
            position: relative !important;   
            height: auto !important;  
            box-shadow: 0 2px 7px rgba(0, 0, 0, .1);
            display: block;
        }

        .right {
            width: 60%;
        }

        .title {
            margin: 0 0 1em 1em;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .author {
            margin-left: 1em;

            span {
                display: block;
            }
        }

        &:hover {
            text-decoration: none;
        }

        &.sponsored {
            display: block;
            margin: 0;
            margin-top: -1em;

            .right {
                width: 100%;
            }

            .title {
                padding: 0 1em;
                margin-top: 0.5em !important;
            }

            .image {
                height: 13em !important;
            }

            .contain,
            .title {
                width: 100% !important;
                margin: 0;
            }
        }
    }


    // tablet and up
    @include media(">=tablet") {

        .wrapper {
            position: relative;  
            display: block; 
            margin: 0;
            margin-bottom: 1em;

            .contain,
            .right {
                width: 100%;
            }      

            .title {
                margin: 0;
                margin-top: 0.5em;
                margin-bottom:  0.5em;
                font-size: 1em;
                 -webkit-line-clamp: 2;
            }     

            .author {
                margin: 0;
            }  

            .image {
                height: 10em !important;
            }

            // sponsored
            &.sponsored {
                margin-top: 0;
                margin-bottom: 1em;

                .sponsoredTitle {
                    padding: 0.5em 0.75em;
                    background: $color-primary;
                    min-height: 5em;

                    .title {  
                        color: $color-white;                       
                        font-size: 1em;
                        font-weight: 500;
                        line-height: 1.4;
                        margin: 0 !important;
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
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
            carousel: {
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
            ImageElement,
            AuthorBlock
        }
    }
</script>