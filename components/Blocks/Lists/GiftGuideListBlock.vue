<template>
    <div :class="$style.wrapper">
        <see-all-link :title="title" :cat-url="catUrl" :cat-url-label="catUrlLabel"></see-all-link>
        <div :class="$style.container">
            <template v-for="(item, index) in items">
                <template v-if="index < 6">
                    <small-article-block :key="index" :item="item" :class="$style.threeAcross"/>
                </template>
            </template>
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

            .threeAcross {
                width: calc(33% - 0.5rem);
            }
        }
    }

    // phones only 
    @include media("<tablet") {

        .wrapper {

            .container {
                display: block;

                .threeAcross {
                    width: auto;
                }
            }
        }
    }
</style>

<script>
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
        },
        components: {
            SmallArticleBlock,
            SeeAllLink
        }
    }
</script>