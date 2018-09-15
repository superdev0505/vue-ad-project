<template>
        <nuxt-link :to="'/' + item.permalink" :class="[$style.wrapper, {[$style.sponsored]: sponsored}, {[$style.carousel]: carousel}]">
            <div :class="$style.contain">
                <div :class="$style.box">
                    <image-element :obj="item.featured" fit="cover" :class="$style.image"/>
                </div>
            </div>
            <div :class="[{[$style.sponsoredTitle]: sponsored}, $style.right]">
                <h4 :class="$style.title" v-html="item.title"></h4>
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
            max-height: 100px;
        }

        .right {
            width: 60%;
        }

        .title {
            margin: 0 0 0 1em;
        }

        &:hover {
            text-decoration: none;
        }

        // carousel
        &.carousel,
        &.sponsored {
            display: block;
            margin: 0;
            margin-top: -1em;
            width: 100%;

            .right {
                width: 100%;
                padding: 0.5em 1em;
                box-sizing: border-box;
                background: #222;
            }

            .title {
                color: white;
                text-align: left;
                margin-top: 0;
                @include excerpt($font-size: 1rem, $line-height: 1, $lines-to-show: 2);
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

        //sponsored carousel
        &.sponsored {

            .right {
                background: $color-primary;
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
                font-size: 1em;
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
                        font-weight: 500;
                        margin: 0 !important;
                        @include excerpt($font-size: 1rem, $line-height: 1.4, $lines-to-show: 3);
                    }
                }
            }
        }
    }

</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

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
        components: {
            ImageElement
        }
    }
</script>
