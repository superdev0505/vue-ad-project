<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title" v-html="title"></h2>

        <!--Desktop-->
        <div :class="[$style.container, $style.desktop]">
            <template v-for="(item, index) in items">
                <template v-if="index === 0">
                    <lead-article-block :key="index" :item="item" :sponsored="sponsored" :topstories ="topstories" :class="$style.oneAcross"/>
                </template>
                <template v-else-if="parseInt(index.toString().slice(-1)) === 1 || parseInt(index.toString().slice(-1)) === 2">
                    <medium-article-block :key="index" :item="item" :sponsored="sponsored" :topstories ="topstories" :class="$style.twoAcross"/>
                </template> 
                <template v-else>
                    <ad-block v-if="showAd(index) && adNum(index) < 5" :key="'ad_' + index" center :name="adNamespace + adNum(index)" :class="$style.desktopHide"/>
                    <small-article-block :key="index" :item="item" :sponsored="sponsored" :class="$style.fourAcross"/>
                </template>
            </template>
        </div>

        <!--Mobile-->
        <div :class="[$style.container, $style.mobile]">
            <template v-for="(item, index) in items">
                <ad-block v-if="showAd(index) && adNum(index) < 5" :key="'ad_' + index" center :name="adNamespace + adNum(index)" :class="$style.desktopHide"/>
                <small-article-block :key="index" :item="item" :sponsored="sponsored" :class="[$style.fourAcross, $style.mobileHideExtra]"/>
            </template>
        </div>

    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
        margin-bottom: 1em;

        .desktopHide {
            display: none;
            visibility: hidden;
        }

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

            .oneAcross {
                width: 100%;
            }

            .twoAcross {
                width: calc(50% - 0.5rem);
            }

            .threeAcross {
                width: calc(33% - 0.5rem);
            }

            .fourAcross {
                width: calc(25% - 0.5rem);
            }
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {

            .desktopHide {
                display: block;
                visibility: visible;
                width: 100%;
                text-align: center;
                margin-bottom: 1em;
            }

            .mobile {
                display: none;
                visibility: hidden;
            }
        }
    }

    // desktop and up
    @include media(">=desktop") {

        .wrapper {

            .desktopHide {
                display: none;
                visibility: hidden;
            }
        }
    }

    // phones only 
    @include media("<tablet") {

        .wrapper {

            .container {
                display: block;

                &.desktop {
                    display: none;
                    visibility: hidden;
                }

                .oneAcross, .twoAcross, .threeAcross, .fourAcross {
                    width: auto;
                }

                .mobileHideExtra:nth-child(n+13) {
                    display: none;
                }
            }
        }
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'
    import LeadArticleBlock from '~/components/Blocks/Items/LeadArticleBlock'
    import MediumArticleBlock from '~/components/Blocks/Items/MediumArticleBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'

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
            topstories: {
                type: Boolean,
                default() {
                    return false
                }
            },
            adNamespace: {
                type: String,
                default() {
                    return 'standardlist'
                }
            }
        },
        methods: {
            showAd(index) {
                return parseInt(index.toString().slice(-1)) === 1 || parseInt(index.toString().slice(-1)) === 3
            },
            adNum(index) {
                return index.toString().length === 1 ? 1 : parseInt(index.toString()[0]) + 1
            }
        },
        components: {
            AdBlock,
            LeadArticleBlock,
            MediumArticleBlock,
            SmallArticleBlock
        }
    }
</script>