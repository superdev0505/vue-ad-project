<template>
    <section :class="$style.wrapper">
        <ad-block center name="category.top" :class="$style.mobileOnly"/>
        <h1 :class="$style.name" v-html="category.name"></h1>
        <p :class="$style.description" v-html="category.description"></p>
        <div :class="$style.featuredBlock">
            <featured-article-block :item="category.featured" />
        </div>
        <div :class="$style.contentBody">
            <div :class="$style.left">
                <secondary-list-block giftGuide v-if="category.top_stories" :items="category.posts.data" title="Latest Gift Guides" />
                <repeater-list-block v-if="category.posts" :items="category.posts.data" title="Explore All Gift Guides" />
                <nuxt-link v-if="category.posts.data.length === 73" :to="'/' + category.permalink + '/page/2'" class="btn btn--primary btn--block">View More News</nuxt-link>
            </div>
            <div :class="$style.right">
                <sidebar-block :content="category.sidebar" ad-namespace="category.sidebar" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" module>

    .wrapper {
        padding: 1em;

        .mobileOnly {
            display: block;
        }

        .description {
            font-weight: 300;
            margin-top: .25em;
        }

        .featuredBlock {
            display: flex;
            flex-direction: row;
            margin: 3em -1em 2em;
        }

        .name {
            margin-top: 0.5em;
        }

        .contentBody {
            width: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;

            .left {
                flex: 1;
                width: 100%;
            }

            .right {
                display: none;
            }
        }
    }

    //tablet and up
    @include media(">tablet") {

        .wrapper {

            .mobileOnly {
                display: none;
            }

            .name {
                margin-bottom: 0.25em;
            }

            .featuredBlock {
                margin: 0 0 2em;
            }

            .description {
                margin-top: 0;
                font-size: 1.25em;
            }

            .contentBody {
                .left {
                    width: auto;
                }
            }

            .left {
                .articleFooter {
                    display: flex;
                    flex-direction: row;
                    padding: 0.5rem;

                    .side {
                        flex: 1;
                    }
                }
            }
        }
    }

    // desktop and up
    @include media(">desktop") {

        .wrapper {

            .contentBody {

                .left {
                    padding-right: 1rem;
                    max-width: calc(100% - 316px);
                    width: -moz-calc(100% - 316px);
                    width: -webkit-calc(100% - 316px);
                    width: calc(100% - 316px);
                }

                .right {
                    display: block;
                    flex: 300px;
                    max-width: 300px;
                    width: 300px;
                }    
            }   
        }
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'
    import SidebarBlock from '~/components/Blocks/SidebarBlock'
    import GridListBlock from '~/components/Blocks/Lists/GridListBlock'
    import RepeaterListBlock from '~/components/Blocks/Lists/RepeaterListBlock'
    import SecondaryListBlock from '~/components/Blocks/Lists/SecondaryListBlock'
    import SponsoredDealsListBlock from '~/components/Blocks/Lists/SponsoredDealsListBlock'
    import GiftGuideListBlock from '~/components/Blocks/Lists/GiftGuideListBlock'
    import FeaturedArticleBlock from '~/components/Blocks/Items/FeaturedArticleBlock'

    export default {
        layout: 'category',
        async asyncData({ params, app, route, error }) {
            let page = 1
            let permalink = route.path
            if (route.path.charAt(0) === '/') {
                permalink = permalink.substr(1)
            }
            let arr = permalink.split('/')
            if (arr[arr.length - 2] === 'page') {
                page = arr[arr.length - 1]
                arr.splice(arr.length - 2, 2);
                permalink = arr.join('/')
            }
            let taxonomy = arr[0]

            let path = 'best-cell-phone-deals/gift-guide'
            if (page > 1) {
                path += '/page/' + page
            }

            const response = await app.$axios.$get('v1/terms/' + path)

            if (response.error) {
                return error({
                    statusCode: response.error.code,
                    message: 'Category Not Found'
                })
            }

            if (taxonomy === 'event') {
                response.top_stories
            }

            if (response.meta.schema) {
                if (!Array.isArray(response.meta.schema)) {
                    response.meta.schema = [response.meta.schema]
                }
                response.meta.seo['script'] = []
                for (let i = 0; i < response.meta.schema.length; i++) {
                    response.meta.seo['script'].push({
                        hid: 'schema_' + (i + 1),
                        innerHTML: JSON.stringify(response.meta.schema[i]),
                        type: 'application/ld+json'
                    })
                }
            }

            app.store.commit('category/handleResponse', response)
            app.store.commit('category/setIsArticle', false)
            
            return {
                category: response,
                taxonomy: taxonomy
            }
        },
        head() {
            return this.category.meta.seo
        },
        components: {
            AdBlock,
            SidebarBlock,
            GridListBlock,
            SecondaryListBlock,
            RepeaterListBlock,
            SponsoredDealsListBlock,
            GiftGuideListBlock,
            FeaturedArticleBlock
        }
    }
</script>