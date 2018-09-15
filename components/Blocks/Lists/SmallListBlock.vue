<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>

        <div :class="$style.container">
            <template v-for="(item, index) in items">
                <template v-if="index < 3">
                    <small-article-block :key="index" :item="item" :class="$style.threeAcross"/>
                </template>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all styles
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

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .threeAcross {
                width: calc(33% - 1rem);
            }
        }
    }

    
    // phones only
    @include media("<tablet") {

        .wrapper {

            .container {
                margin-bottom: 1em;            

                .threeAcross {
                    width: auto;
                }
            }
        }
    }
</style>

<script>
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
            carousel: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        components: {
            SmallArticleBlock,
            ImageElement
        }
    }
</script>