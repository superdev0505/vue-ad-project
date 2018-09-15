<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>
        <div :class="$style.container">

            <!--Desktop-->
            <div :class="$style.desktop">
                <template v-for="(item, index) in items">
                    <template v-if="parseInt(index.toString().slice(-1)) === 0 || parseInt(index.toString().slice(-1)) === 1">
                        <medium-article-block :key="index" :item="item" :class="$style.twoAcross"/>
                    </template>
                    <template v-else>
                        <small-article-block :key="index" :item="item" :class="[$style.fourAcross, $style.smallItem]"/>
                    </template>
                </template>
            </div>

            <!--Mobile-->
            <div :class="$style.mobile">
                <template v-for="(item, index) in items" v-if="index < 20">
                    <div :key="index">
                        <small-article-block :item="item" />
                        <ad-block v-if="[9, 19].indexOf(index) !== -1" :name="adNamespace + '' + (index / 10)" :class="$style.ad"/>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
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

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .desktop {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                margin: -0.5em; //fix for when less than 4 items come up, it'll span the entire row now
            }

            .twoAcross {
                width: calc(50% - 0.5rem);
                margin-top: 0;
                flex: 1 0 47%;
                margin: .5em; //fix for when less than 4 items come up, it'll span the entire row now
            }

            .fourAcross {
                width: calc(25% - 0.5rem);
                flex: 1 0 25%; //fix for when less than 4 items come up, it'll span the entire row now
                padding: 0.5em;
            }

            .mobile,
            .ad {
                display: none;
            }
        }
    }

    // phones only 
    @include media("<tablet") {

        .wrapper {

            .container {
                display: block;

                .desktop {
                    display: none;
                }

                .mobile {
                    display: block;
                }

                .twoAcross, .fourAcross {
                    width: auto;
                }

                .ad {
                    display: initial;
                    margin-bottom: 1em;
                    display: block;
                    text-align: center;
                }
            }
        }
    }
</style>

<script>
    import LeadArticleBlock from '~/components/Blocks/Items/LeadArticleBlock'
    import MediumArticleBlock from '~/components/Blocks/Items/MediumArticleBlock'
    import SmallArticleBlock from '~/components/Blocks/Items/SmallArticleBlock'
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
                    return 'related'
                }
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