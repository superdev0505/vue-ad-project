<template>
    <div :class="$style.wrapper">

        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel" :is-blank="isBlank"></see-all-link>
        
        <template>
            <div v-if="items.length" :class="$style.content">
                <div v-swiper:carousel="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                            <small-article-block v-if="!youtube" :key="index" :item="item"/>
                            <div v-else :class="$style.embedContainer">
                                <iframe width="640" height="360" :src="item" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="swiper-pagination"></div> -->
                    <!-- <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div> -->
                </div>
            </div>
        </template>
        <ad-block :name="adNamespace" :class="$style.ad"/>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
        position: relative;
        margin-bottom: 1em;

        .ad {
            display: initial;
            margin-top: 1em;
            margin-bottom: 1em;
            display: block;
            text-align: center;
        }

        .title {
            display: inline-block;
            margin-top: 0.5em;
            margin-bottom: 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;
            text-transform: uppercase;
            font-style: italic;
        }

        //See All Link
        .seeAll {
            margin-top: 0.25em;
            text-transform: uppercase;
            font-weight: 700;
            font-size: .875em;
            position: absolute;
            right: 0;

            &:hover, &:active, &:focus {
                text-decoration: none;
            }

            span:before {
                color: $color-primary;
                position: relative;
                top: 2px;
                right: -2px;
                transition: all .25s ease;
            }

            &:hover, &:focus {

                span:before {
                    right: -7px;
                    transition: all .25s ease;
                }
            }
        }

        .left, .right {
            position: absolute;
            top: 34%;
            z-index: 2;
            color: white;

            .navigate {
                padding: 0.5em;
                background: rgba(0, 0, 0, .5);
                cursor: pointer;

                &:hover, &:focus {
                    background: rgba(0, 0, 0, .9);
                    text-decoration: none;
                }
            }
        }

        .left {
            left: 0;

            .navigate {

                .icon span:before {
                    top: 2px;
                    left: -1px;
                    position: relative;
                    transition: all .25s ease;
                }

                &:hover, &:focus {

                    .icon span:before {
                        left: -5px;
                        transition: all .25s ease;
                    }
                }
            }
        }

        .right {
            right: 0;

            .navigate {

                .icon span:before {
                    top: 2px;
                    right: -1px;
                    position: relative;
                    transition: all .25s ease;
                }

                &:hover, &:focus {

                    .icon span:before {
                        right: -5px;
                        transition: all .25s ease;
                    }
                }
            }
        }

        .content {

            .embedContainer {
                width: 100%;
                
                iframe {
                    width: 100%;
                    height: 14em;
                }
            }
        }
    }

    //tablet and up
    @include media(">=tablet") {
        .wrapper {
            margin-bottom: 0;

            .ad {
                display: none;
            }

            .content {

                .embedContainer {
                    width: initial;
                    max-width: 100%;
                    margin-right: 0.5em;
                    
                    iframe {
                        width: 100%;
                        height: 27em;
                    }
                }
            }
        }
    }

    // desktop and up
    @include media(">=desktop") {

        .wrapper {

            .content {

                .embedContainer {
                    width: initial;
                    max-width: 100%;
                    margin-right: 0.5em;
                    
                    iframe {
                        width: 100%;
                        height: 10em;
                    }
                }
            }
        }
    }

</style>

<script>
    import SeeAllLink from '~/components/Blocks/Items/SeeAllLink'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        props: {
            title: {
                type: String,
                default () {
                    return 'Category'
                }
            },
            items: {
                type: Array,
                default () {
                    return []
                }
            },
            youtube: {
                type: Boolean,
                default () {
                    return false
                }
            },
            catUrl:{
                type: String,
                default() {
                    return '#'
                }
            },
            catUrlLabel:{
                type: String,
                default() {
                    return ''
                }
            },
            isBlank:{
                type: Boolean,
                default() {
                    return false
                }
            },
            adNamespace: {
                type: String,
                default() {
                    return 'carousel_list_block'
                }
            }
        },
        data() {
            return {
                swiperOption: {
                    loop: false,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 30,
                    autoHeight: true,
                    effect: 'slide',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1
                        },
                        1024: {
                            slidesPerView: 4
                        }
                    }
                }
            }
        },
        components: {
            SmallArticleBlock,
            SeeAllLink,
            AdBlock
        }
    }
</script>