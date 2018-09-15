<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">{{ title }}</div>
        <div :class="$style.container">
            <template v-for="(block, index) in articles">
                <div :class="$style.block" :key="index">
                    <template v-if="block[0]">
                        <featured-related-article-block :item="block[0]" />
                    </template>
                    <ul :class="$style.articleList">
                        <li :class="$style.articleItem" v-for="(article, index2) in block" :key="'block' + index2" v-if="index2 !== 0">
                            <nuxt-link :to="'/' + article.permalink">{{ article.title }}</nuxt-link>
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
        border-top: 0.2rem solid $black;
        margin-bottom: 1em;
        margin-top: 1em;

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

            .block {
                flex: calc(33.33% - 0.5rem);
                width: calc(33.33% - 0.5rem);
                min-width: calc(33.33% - 0.5rem);
                max-width: calc(33.33% - 0.5rem);

                .articleList {
                    list-style: disc;
                    margin-left: 1rem;
                    margin-top: 1em;

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
            .adBlock {
                flex: calc(100% - 1rem);
                width: calc(100% - 1rem);
                min-width: calc(100% - 1rem);
                max-width: calc(100% - 1rem);
                margin: 0.5rem;
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

                    &:nth-child(n+2) {
                        display: none;
                    }
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
            },
            adNamespace: {
                type: String,
                default() {
                    return 'related'
                }
            }
        },
        computed: {
            articles() {
                return Array.from(Array(Math.ceil(this.items.length/6)), (_,i) => this.items.slice(i*6,i*6+6))
            }
        },
        components: {
            FeaturedRelatedArticleBlock,
            AdBlock
        }
    }
</script>
