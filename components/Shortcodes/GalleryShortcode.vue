<template>
    <div v-if="items.length" :class="[$style.box, {[$style.amp]: amp}]">
        <div v-if="!amp" v-swiper:carousel="swiperOption" :class="$style.carousel">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in items" :key="index">
                    <image-element :obj="item" :overlay="id" />
                </div>
            </div>
            <div class="swiper-pagination"></div>
<!--             <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div> -->
        </div>
        <template v-else>
            <amp-carousel
                layout="responsive"
                :height="items[0].media_details.height"
                :width="items[0].media_details.width"
                type="slides">
                <div v-for="(item, index) in items" class="slide" :key="index">
                    <image-element :obj="item" amp />
                </div>
            </amp-carousel>
        </template>
    </div>
</template>

<style lang="scss" module>
    .box {
        //box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
        border: 1px solid #EEE;
        background: #EEE;
        margin-bottom: 2em;

        .carousel {
                padding-bottom: 42px;
        }

        &.amp {
            box-sizing: border-box;
            background: transparent;
        }
    }

    // mobile only
    @include media('<tablet') {
        .box {
            margin: 0 -1em 2em;
        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            ids: {
                type: String,
                default() {
                    return null
                }
            },
            images: {
                type: Object,
                default() {
                    return {
                        data: []
                    }
                }
            },
            link: {
                type: String,
                default() {
                    return 'file'
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                id: null,
                items: [],
                swiperOption: {
                    loop: false,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 30,
                    effect: 'slide',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                        clickable: true
                    }
                }
            }
        },
        created() {
            if (!this.id) {
                this.id = 'id-gallery-' + Math.random().toString(36).substr(2, 16)
            }
            this.items = this.images.data
        },
        mounted() {
            if (!this.id) {
                this.id = 'id-gallery-' + Math.random().toString(36).substr(2, 16)
            }
            if (!this.images.data.length) {
                this.$axios.get('v1/media/gallery/' + this.ids).then(response => {
                    if (response.data) {
                        if (response.data.error) {
                            this.items = []
                        } else {
                            this.items = response.data.data
                        }
                    }
                })
            }
        },
        components: {
            ImageElement
        }
    }
</script>
