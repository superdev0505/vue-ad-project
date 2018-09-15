<template>
    <div :class="$style.wrapper">
        <!-- Desktop-->
        <div :class="$style.background"></div>
        <div :class="$style.article">
            <featured-article-block v-for="(item, index) in items" :key="index" v-if="index === active" :item="item" homepage />
        </div>
    </div>
</template>

<style lang="scss" module>

    // phones only
    @include media("<tablet") {

        .wrapper {

            .background {
                display: none;
            }

            .article {
                margin-top: 7rem;   
                margin-bottom: 2rem;
            }
        }
    }

    // tablet up
    @include media(">=tablet") {

        .wrapper {

            .article {
                padding: 2rem;
                z-index: 2;
                position: relative;
                display: flex;
                flex-direction: row;
                max-width: 1316px;
                margin: 0 auto;
            }

            .background {
                background: #222;
                // background: radial-gradient(#777777, black);
                height: 40rem;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                z-index: 1;
            }
        }
    }

    //desktop up
    @include media('>=desktop') {

        .wrapper {

            .background {
                height: 28em;
            }
        }
    }
</style>

<script>
    import FeaturedArticleBlock from '~/components/Blocks/Items/FeaturedArticleBlock'
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                active: 0,
                transitionName: 'featured-next'
            }
        },
        methods: {
            next() {
                this.transitionName = 'featured-next'
                if (this.active === this.items.length - 1) {
                    this.active = 0
                } else {
                    this.active = this.active + 1
                }
            },
            previous() {
                this.transitionName = 'featured-prev'
                if (this.active === 0) {
                    this.active = this.items.length - 1
                } else {
                    this.active = this.active - 1
                }
            }
        },
        components: {
            FeaturedArticleBlock,
            ImageElement
        }
    }
</script>