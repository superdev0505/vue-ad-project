<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>

        <!-- Desktop-->
        <div :class="$style.desktop" v-show="!isMobile">
            <div :class="$style.container">
                <template v-for="(item, index) in items">
                    <template v-if="[0, 1, 2].indexOf(index) !== -1">
                        <small-article-block :key="index" :item="item" :sponsored="sponsored" :class="$style.threeAcross"/>
                    </template>
                    <template v-else>
                        <small-article-block :key="index" :item="item" :sponsored="sponsored" :class="$style.fourAcross"/>
                    </template>
                </template>
            </div>
        </div>

        <!-- Mobile -->
        <div :class="$style.mobile" v-show="isMobile">
            <div v-if="items.length">
                <div v-swiper:carousel="swiperOption" :class="$style.carousel">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                            <!-- <image-element :obj="item" /> -->
                            <small-article-block :item="item" :sponsored="sponsored" />
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

    // .carousel {
    //     height: 300px;
    //     width: 100%;
    // }

    // phones only
    @include media("<tablet") {

        .wrapper {

            .mobile {
                margin: 0 -1em 1em;

                .carousel {
                        padding-bottom: 42px;
                        img {
                            min-height: 200px;
                        }                        
                }

            }

            .desktop {
                display: none;
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

        .title {
            margin-top: 0.5em;
            margin-bottom: 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;
            text-transform: uppercase;
            font-style: italic;
        }

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .threeAcross {
                width: calc(33% - 0.25rem);
            }

            .fourAcross {
                width: calc(25% - 0.5rem);
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import MediumArticleBlock from '~/components/Blocks/Items/MediumArticleBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
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
            ImageElement
        }
    }
</script>
