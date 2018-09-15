<template>
    <div :class="$style.wrapper">
        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel"></see-all-link>

        <!-- Desktop-->
        <div :class="$style.desktop" v-show="!isMobile">
            <div :class="$style.container">
                <template v-for="(item, index) in items">
                     <template v-if="[0, 1, 2].indexOf(index) !== -1">
                        <small-article-block :key="index" :item="item" :class="$style.threeAcross"/>
                    </template>
                    <template v-else>
                        <small-article-block :key="index" :item="item" :class="$style.fourAcross"/>
                    </template>
                </template>
            </div>
        </div>

        <!-- Mobile -->
        <div :class="$style.mobile" v-show="isMobile">
            <div v-if="items.length">
                <div v-swiper:tertiaryCarousel="swiperOption" :class="$style.carousel">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                            <!-- <image-element :obj="item" /> -->
                            <small-article-block :item="item" :sponsored="sponsored" :carousel="carousel"/>
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                    <!-- <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div> -->
                </div>
            </div>
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
                 margin: 0 -1em 1em;
                 .carousel {
                         padding-bottom: 42px;
                         img {
                             min-height: 200px;
                         }                         
                 }
            }
        }
    }

    // tablet up
    @include media(">=tablet") {

        .wrapper {

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

            .threeAcross {
                width: calc(33% - 0.5rem);
            }

            .fourAcross {
                width: calc(25% - 1rem);
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import MediumArticleBlock from '~/components/Blocks/Items/MediumArticleBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
    import SeeAllLink from '~/components/Blocks/Items/SeeAllLink'
    import ImageElement from '~/components/Elements/ImageElement'

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
            sponsored: {
                type: Boolean,
                default() {
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
            carousel: {
                type: Boolean,
                default() {
                    return false
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
            MediumArticleBlock,
            SmallArticleBlock,
            SeeAllLink,
            ImageElement
        }
    }
</script>
