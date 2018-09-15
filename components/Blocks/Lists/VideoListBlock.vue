<template>
    <div :class="$style.wrapper">

        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel" :is-blank="isBlank"></see-all-link>
        
        <div :class="$style.content">
            <template v-for="(item, index) in items">
                <div :key="index" :item="item" :class="[$style.embedContainer, $style.fourAcross]">
                    <iframe width="100%" height="100%" :src="item" frameborder="0" title="Video" allow="autoplay; encrypted-media" seamless="seamless" allowfullscreen></iframe>
                </div>
            </template>
        </div>

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
        
        .content {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .fourAcross {
                width: calc(25% - 0.5rem);
            }

            .embedContainer {
                overflow: hidden;
                margin-bottom: 1em;

                &:nth-child(n+5) {
                    display: none;
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
        components: {
            SmallArticleBlock,
            SeeAllLink,
            AdBlock
        }
    }
</script>