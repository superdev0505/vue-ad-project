<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>
        <div :class="$style.container">
            <template v-for="(item, index) in items">
                <template v-if="index === 0">
                    <lead-article-block :key="index" :item="item" :class="$style.oneAcross"/>
                </template>
                <div :key="index" v-else :class="[$style.desktopHideExtra, $style.twoAcross]">
                    <news-bite-block :item="item" />
                    <ad-block v-if="[10, 20].indexOf(index) !== -1" :name="adNamespace + (index / 10)" :class="$style.ad"/>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
        margin-bottom: 2em;

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

            .ad {
                display: none;
            }

            .oneAcross {
                width: 100%;
            }

            .twoAcross {
                width: calc(50% - 1rem);
            }
        }
    }
    
    // phones only 
    @include media("<tablet") {

        .wrapper {
            margin-bottom: 0;

            .container {
                display: block;

                .ad {
                    display: initial;
                    margin-bottom: 1em;
                    display: block;
                    text-align: center;
                }

                .oneAcross, .twoAcross, .threeAcross {
                    width: auto;
                }
            }
        }
    }
</style>

<script>
    import LeadArticleBlock from '~/components/Blocks/Items/LeadArticleBlock'
    import NewsBiteBlock from '~/components/Blocks/Items/NewsBiteBlock'
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
            adNamespace: {
                type: String,
                default() {
                    return 'news_list_block'
                }
            }
        },
        components: {
            LeadArticleBlock,
            NewsBiteBlock,
            AdBlock
        }
    }
</script>