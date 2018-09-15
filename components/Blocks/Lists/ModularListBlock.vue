<template>
    <div :class="$style.wrapper">
        <div :class="$style.container">
            <template v-for="(block, index) in articles">
                <div :class="$style.block" :key="index">
                    <ul :class="$style.articleList">
                        <li :class="$style.articleItem" v-for="(article, index2) in block" :key="'block' + index2" v-if="index2 !== 0">
                            <nuxt-link :to="'/' + article.permalink">
                                {{ article.title }}
                            </nuxt-link>
                        </li>
                    </ul>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all other styles
    .wrapper {

        .container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .block {
                width: calc(50% - 0.75rem);

                .articleList {
                    list-style: none;

                    .articleItem {
                        margin-bottom: 1em;
                        border-bottom: 1px solid #EEE;
                        padding-bottom: 1em;

                        a {
                            &:hover, &:active {
                                text-decoration: none;
                            }
                        }

                        &:last-child {
                            border-bottom: 0;
                        }
                    }
                }
            }
        }
    }

    // phone only
    @include media("<tablet") {

        .wrapper {

            .container {

                .block {
                    flex: 100%;
                    width: 100%;
                    min-width: 100%;
                    max-width: 100%;
                }
            }
        }
    }
</style>

<script>
    import FeaturedRelatedArticleBlock from '~/components/Blocks/Items/FeaturedRelatedArticleBlock'
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Related Articles'
                }
            },
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            articles() {
                return Array.from(Array(Math.ceil(this.items.length/5)), (_,i) => this.items.slice(i*5,i*5+5))
            }
        },
        components: {
            FeaturedRelatedArticleBlock,
            AdBlock
        }
    }
</script>