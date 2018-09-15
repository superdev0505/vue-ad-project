<template>
    <section :class="$style.wrapper">
        <template v-if="page === 1">
            <ad-block center name="category.header" :class="$style.mobileOnly" v-show="$store.state.isMobile"/>
            <template v-if="taxonomy === 'category'">
                <h1 :class="$style.name" v-html="category.name"></h1>
                <p :class="$style.description" v-html="category.description"></p>
            </template>
            <div :class="$style.featuredBlock">
                <featured-article-block :item="category.featured" :category="category" />
            </div>
            <ad-block center name="category.featured" :class="$style.hideDesktop"/>
            <div :class="$style.contentBody">
                <div :class="$style.left">
                    <top-list-block v-if="category.top_stories" :items="category.top_stories.data" :title="topTitle" />
                    <ad-block center name="category.stories" :class="$style.hideDesktop"/>
                    <related-categories-list-block v-if="category.parent === 0 && category.children.data.length" :cat-id="category.id" :title="'Explore More in ' + category.name" :items="category.children.data" />
                    <ad-block center name="category.news" :class="$style.hideDesktop" v-if="category.parent === 0 && category.children.data.length"/>
                    <standard-list-block v-if="category.posts" :items="category.posts.data" :title="category.name" ad-namespace="category.news" />
                    <nuxt-link v-if="category.posts.data.length === 71" :to="'/' + category.permalink + '/page/2'" class="btn btn--primary btn--block">View More</nuxt-link>
                </div>

                <div :class="$style.right"  v-show="!$store.state.isMobile">
                    <sidebar-block :content="category.sidebar" ad-namespace="category.sidebar" />
                </div>
            </div>
        </template>
        <template v-else>
            <div :class="$style.contentBody">
                <div :class="$style.left">
                    <standard-list-block v-if="category.posts" :items="category.posts.data" :title="category.name" />
                    <nuxt-link
                        v-if="category.posts.data.length === 70"
                        :to="'/' + category.permalink + '/page/' + (parseInt(category.meta.page) + 1)"
                        class="btn btn--primary btn--block">
                        View More
                    </nuxt-link>
                </div>
                <div :class="$style.right">
                    <sidebar-block :content="category.sidebar" ad-namespace="category.sidebar" />
                </div>
            </div>
        </template>
    </section>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        padding: 2em 1em;

        .mobileOnly {
            display: block;
        }

        .hideDesktop {
            display: block;
            margin-bottom: 1em;
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

            .left {
                flex: 1;
                width: auto;
            }

            .right {
                display: none;
            }
        }
    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {

            .mobileOnly {
                display: none;
            }

            .name {
                margin-bottom: 0.25em;
                margin-top: 0;
            }

            .featuredBlock {
                margin: 0 0 2em;
            }

            .description {
                margin-top: 0;
                font-size: 1.25em;
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

            .hideDesktop {
                display: none;
            }

            .contentBody {

                .left {
                    padding-right: 1rem;
                    max-width: calc(100% - 316px);
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
    import TopListBlock from '~/components/Blocks/Lists/TopListBlock'
    import RelatedCategoriesListBlock from '~/components/Blocks/Lists/RelatedCategoriesListBlock'
    import StandardListBlock from '~/components/Blocks/Lists/StandardListBlock'
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

            let path = Buffer.from(permalink).toString('base64')
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
                page: page,
                taxonomy: taxonomy
            }
        },
        computed: {
            topTitle() {
                if(this.category && this.category.id) {
                    switch(this.category.id) {
                        case 86221:
                            return 'Other Giveaways'
                            break;
                        case 86469:
                            return 'Latest Reviews'
                            break;
                        case 85855:
                            return 'Latest Features'
                            break;
                        case 86059:
                            return 'Latest Awards'
                            break;
                        case 85852:
                            return 'Latest Top 10 Apps'
                            break;
                        case 85840:
                            return 'Latest Comparisons'
                            break;
                    }
                }
            }
        },
        head() {
            return this.category.meta.seo
        },
        components: {
            AdBlock,
            SidebarBlock,
            TopListBlock,
            RelatedCategoriesListBlock,
            StandardListBlock,
            FeaturedArticleBlock
        }
    }
</script>
