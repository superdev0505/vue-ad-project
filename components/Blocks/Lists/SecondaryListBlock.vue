<template>
    <div :class="$style.wrapper">
        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel"></see-all-link>
        <div :class="$style.container">
            <template v-for="(item, index) in items">
                <template v-if="index === 0">
                    <medium-article-block :key="index" :item="item" :class="$style.twoAcross"/>
                </template>
                <template v-else>
                    <small-article-block :giftGuide="giftGuide" :key="index" :item="item" :class="[$style.fourAcross, $style.mobileHideExtra, {[$style.giftGuide]: giftGuide}]"/>
                </template>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
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

            .oneAcross {
                width: 100%;
            }

            .twoAcross {
                width: calc(50% - 0.25rem);
                margin-top: 0;
            }

            .fourAcross {
                width: calc(25% - 0.5rem);
            }

            .giftGuide:nth-child(n+8) {
                display: none;
            }
        }
    }

    // phones only 
    @include media("<tablet") {

        .wrapper {

            .container {
                display: block;
                margin-bottom: 2em;

                .oneAcross, .twoAcross, .threeAcross, .fourAcross {
                    width: auto;
                }

                .mobileHideExtra:nth-child(n+5) {
                    display: none;
                }
            }
        }
    }
</style>

<script>
    import MediumArticleBlock from '~/components/Blocks/Items/MediumArticleBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
    import SeeAllLink from '~/components/Blocks/Items/SeeAllLink'

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
            giftGuide: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        components: {
            MediumArticleBlock,
            SmallArticleBlock,
            SeeAllLink
        }
    }
</script>