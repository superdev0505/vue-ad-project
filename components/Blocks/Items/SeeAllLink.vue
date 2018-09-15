<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">
            <template v-if="bannerUrl">
                <nuxt-link :to="bannerUrl" v-html="title">
                </nuxt-link>
            </template>
            <template v-else>
                <span v-html="title"></span>
            </template>
        </h2>
        <nuxt-link :to="catUrl" :class="$style.seeAll" v-if="!isBlank && catUrlLabel.length">{{ catUrlLabel }}<span class="icon-link-arrow-right"></span></nuxt-link>
        <a :href="catUrl" :class="$style.seeAll" v-if="isBlank && catUrlLabel.length">{{ catUrlLabel }}<span class="icon-link-arrow-right"></span></a>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        position: relative;
        margin-bottom: 1em;

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
            margin-top: 0;
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

    }

    // phones only
    @include media("<tablet") {

        .wrapper {
            margin-bottom: 1em;

            .container {
                display: block;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Category'
                }
            },
            bannerUrl: {
                type: String,
                default() {
                    return null
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
            }
        },
    }
</script>
