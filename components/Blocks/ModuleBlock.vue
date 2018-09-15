<template>
    <div :class="$style.wrapper">
        <see-all-link :title="module.name" :cat-url="module.linkurl" :cat-url-label="module.linktext" :isBlank="true"></see-all-link>
        <div :class="$style.container">
            <div :class="[$style.twoAcross, $style.pinnedContainer]">
                <modular-article-block :item="module.article1" :class="$style.pinnedArticle"/>
                <modular-article-block :item="module.article2" :class="$style.pinnedArticle"/>
            </div>
            <div :class="$style.twoAcross">
                <modular-list-block :items="module.posts.data"/>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
        margin-bottom: 1em;

        .container {
            display: block;

            .twoAcross {
                width: auto;
            }
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {

            .container {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;

                .twoAcross {
                    width: calc(50% - 0.5rem);
                }
            }
        }
    }

    // desktop and up
    @include media(">=desktop") {

        .wrapper {

            .container {

                .pinnedContainer {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: space-between;

                    .pinnedArticle {
                        width: calc(50% - 0.5rem);
                    }
                }
            }

        }
    }
</style>

<script>
    import ModularArticleBlock from '~/components/Blocks/Items/ModularArticleBlock'
    import ModularListBlock from '~/components/Blocks/Lists/ModularListBlock'
    import SeeAllLink from '~/components/Blocks/Items/SeeAllLink'

    export default {
        props: {
            module: {
                type: Object,
                required: true
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
            }
        },
        mounted() {
        },
        components: {
            ModularArticleBlock,
            ModularListBlock,
            SeeAllLink
        }
    }
</script>
