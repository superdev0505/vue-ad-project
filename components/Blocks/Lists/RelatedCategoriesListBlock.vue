<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">{{ title }}</div>
        <div :class="$style.container">
            <div v-for="(item, index) in items" :key="index" :class="$style.item" v-if="item.id !== catId">
                <nuxt-link :class="$style.link" :to="'/' + item.permalink">
                    <related-categories-item-block :item="item" />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all styles
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

            .item {
                width: 100%;
                margin-bottom: 1em;

                .link:hover {

                    span:before {
                        right: -5px;
                        transition: all .25s ease;
                    }
                }
            }
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {

            .container {

                .item {
                    flex: calc(50% - 0.5rem);
                    width: calc(50% - 0.5rem);
                    max-width: calc(50% - 0.5rem);
                }
            }
        }
    }
</style>

<script>
    import RelatedCategoriesItemBlock from '~/components/Blocks/Items/RelatedCategoriesItemBlock'

    export default {
        props: {
            catId: {
                type: Number,
                default() {
                    return 0
                }
            },
            title: {
                type: String,
                default() {
                    return 'Explore Related Categories'
                }
            },
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            RelatedCategoriesItemBlock
        }
    }
</script>
