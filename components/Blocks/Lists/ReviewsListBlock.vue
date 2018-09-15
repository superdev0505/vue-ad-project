<template>
    <div :class="$style.wrapper">
        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel"></see-all-link>

        <!-- Desktop-->
        <div :class="$style.desktop" v-show="!isMobile">
            <div :class="$style.container">
                <template v-for="(item, index) in items">
                    <template v-if="[0, 1, 2, 3].indexOf(index) !== -1">
                        <review-article-block :key="index" :item="item" :class="$style.fourAcross"/>
                    </template>
                    <template v-else>
                        <review-row-block :key="index" :item="item" :class="$style.fourAcross"/>
                    </template>
                </template>
            </div>
        </div>

        <!-- Mobile -->
        <div :class="$style.mobile" v-show="isMobile">
            <div v-swiper:reviewCarousel="swiperOption" :class="$style.carousel">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                        <image-element :obj="item" />
                        <small-article-block :item="item" :carousel="carousel" />
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <!-- <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div> -->
            </div>
            <ad-block :name="adNamespace" :class="$style.ad"/>
        </div>

    </div>
</template>

<style lang="scss" module>

    // phones only
    @include media("<tablet") {

        .wrapper {

            .desktop {
                display: none;
            }


            .mobile {
                margin: 0 -1em;
                .carousel {
                        padding-bottom: 42px;
                        img {
                            min-height: 200px;
                        }
                }
            }

            .ad {
                display: initial;
                margin-top: 1em;
                margin-bottom: 1em;
                display: block;
                text-align: center;
            }
        }
    }

    // tablet up
    @include media(">=tablet") {

        .wrapper {
            margin-bottom: 2em;

            .mobile {
                display: none;
            }
        }
    }

    // all styles
    .wrapper {
        border-top: 0.2rem solid $black;
        position: relative;

        .title {
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
            top: 0;

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

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .fourAcross {
                width: calc(25% - 1rem);
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import ReviewArticleBlock from '~/components/Blocks/Items/ReviewArticleBlock'
    import ReviewRowBlock from '~/components/Blocks/Items/ReviewRowBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
    import SeeAllLink from '~/components/Blocks/Items/SeeAllLink'
    import ImageElement from '~/components/Elements/ImageElement'
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Category'
                }
            },
            items: {
                type: Array,
                default() {
                    return []
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
            carousel: {
                type: Boolean,
                default() {
                    return false
                }
            },
            adNamespace: {
                type: String,
                default() {
                    return 'news_list_block'
                }
            },

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
                    }
                }
            }
        },
        computed: {
            ...mapGetters({
                isMobile: 'isMobile'
            })
        },
        components: {
            ReviewArticleBlock,
            ReviewRowBlock,
            SmallArticleBlock,
            SeeAllLink,
            ImageElement,
            AdBlock
        }
    }
</script>
