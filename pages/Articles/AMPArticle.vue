<template>
    <div :class="$style.wrapper">
        <ad-block center name="amp.header" amp :amp-count="1" />
        <h1 v-html="item.title"></h1>
        <div v-if="item.featured" :class="$style.featured" itemprop="image">
            <image-element :obj="item.featured" amp />
        </div>
        <div :class="$style.byline" v-if="item.author">
            <author-block :author="item.author" amp>{{ parsedDate }}</author-block>
        </div>
        <div :class="$style.contentBody">
            <category-tags-block :items="item.taxonomies.data" />
            <content-block
                itemprop="articleBody"
                :ad-paragraph-count="1"
                :ad-max="5"
                :class="$style.articleContent"
                :body="item.content"
                ad-namespace="amp.content"
                amp />
            <template v-if="item.featured_deals || item.deals">
                <deal v-if="item.featured_deals" v-for="(deal, index) in item.featured_deals" :key="index + '-featured'" :deal="deal" :amp="true"></deal>
                <div v-if="item.deals" v-for="(section, index2) in item.deals" :key="index2 + '-section'" :class="$style.dealSection">
                    <div class="h3">{{ section.title }}</div>
                    <p v-if="section.description" :class="$style.sectionDescription">{{ section.description }}</p>
                    <deal v-if="section.deals" v-for="(deal, index3) in section.deals" :key="index3 + '-deal'" :deal="deal" :amp="true"></deal>
                </div>
            </template>
            <div :class="$style.articleFooter">
                <div :class="$style.side">
                    <div :class="$style.datePublished">{{ parsedDate }}</div>
                    <source-block :acf="item.acf"></source-block>
                </div>
                <div :class="$style.side">
                    <social-list-block :class="$style.social" />
                </div>
            </div>
            <comments-block :identifier="item.permalink" amp />
            <div :class="$style.articleNavigation">
                <div :class="$style.previous" v-if="previous">
                    <nuxt-link :to="'/amp/' + previous.permalink" :class="$style.navLink">
                        <div :class="$style.navTitle"><span class="icon-arrow-carousel-left"></span> Previous Story</div>
                        <div :class="$style.articleTitle">{{ previous.title }}</div>
                        <div :class="$style.icon">
                            <span class="icon-left-open"></span>
                        </div>
                    </nuxt-link>
                </div>
                <div :class="$style.next" v-if="next">
                    <nuxt-link :to="'/amp/' + next.permalink" :class="$style.navLink">
                        <div :class="$style.navTitle">Next Story <span class="icon-arrow-carousel-right"></span></div>
                        <div :class="$style.articleTitle">{{ next.title }}</div>
                        <div :class="$style.icon">
                            <span class="icon-right-open"></span>
                        </div>
                    </nuxt-link>
                </div>
            </div>
            <div :class="$style.adBanner">
                <ad-block center name="amp.footer" amp :amp-count="6"/>
                <br>
            </div>
            <amp-related-articles-list-block :items="item.taxonomies.data[0].posts.data" />
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        padding: 1.5rem;

        .featured {
          position: relative;
          width: 100%;
          //height: 220px;
        //   .contain {
        //     img {
        //       object-fit: contain;
        //     }
        //   }
        }

        .contentBody {
            width: auto;

            .articleContent {

                a {
                    font-weight: bold;
                }
            }

            .adBanner {
              text-align: center;
            }

            .articleFooter {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: row-reverse;
                border-top: 1px solid #DDD;
                border-bottom: 1px solid #DDD;
                padding: .75em 0;
                margin: 2em 0;

                .side {
                    display: flex;
                }

                .social {
                    margin: 0;

                    a {
                        margin: 0 0.25em;

                        &:first-of-type {
                            margin-left: 0;
                        }
                    }
                }

                .datePublished {
                    color: #9B9B9B;
                    font-style: italic;
                    font-size: 0.75em;
                    padding-right: 1em;
                }
            }

            .articleNavigation {
                display: flex;
                flex-direction: row;
                max-width: 100%;
                overflow: hidden;
                margin: 1rem 0;

                .previous {
                    flex: 1;
                    text-align: right;
                    padding-right: 1rem;
                    border-right: 1px solid #EEE;

                    .icon {
                        color: $color-primary;
                        position: absolute;
                        left: 0;
                        top: 50%;
                    }
                }
                .next {
                    flex: 1;
                    padding-left: 1rem;
                    border-left: 1px solid #DDDDDD;

                    .icon {
                        color: $color-primary;
                        position: absolute;
                        right: 0;
                        top: 50%;
                    }
                }

                .navLink {
                    display: block;
                    position: relative;

                    &:link, &:visited, &:hover {
                        text-decoration: none;
                    }
                }
                .navTitle {
                    font-family: $second-font-family;
                    font-weight: bold;
                    color: $color-primary;
                    margin-bottom: .25em;
                }

                .articleTitle {
                    font-size: 1rem;
                }
            }
        }

        .byline {
            margin: 0;
        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'
    import AuthorBlock from '~/components/Blocks/AuthorBlock'
    import ContentBlock from '~/components/Blocks/ContentBlock'
    import CategoryTagsBlock from '~/components/Blocks/Tags/CategoryTagsBlock'
    import SocialListBlock from '~/components/Blocks/Lists/SocialListBlock'
    import CommentsBlock from '~/components/Blocks/CommentsBlock'
    import Deal from '~/components/Deals/Deal'
    import AmpRelatedArticlesListBlock from '~/components/Amp/Lists/AmpRelatedArticlesListBlock'
    import AdBlock from '~/components/Blocks/AdBlock'
    import moment from 'moment'

    export default {
        layout: 'amp_article',
        async asyncData({ params, app, error, query }) {
            const response = await app.$axios.$get('v1/posts/' + Buffer.from(params.permalink).toString('base64') + (query.draft ? '?draft=' + query.draft : ''))
            if (response.error) {
                return error({
                    statusCode: response.error.code,
                    message: 'Something went wrong'
                })
            }
            response.date = moment(response.date)

            let previous = null
            let next = null
            if (response.taxonomies.data) {
                let category = response.taxonomies.data[0]
                if (category.parent > 0) {
                    category = category.parent_term
                }
                app.store.commit('category/handleResponse', category)

                let previousPosts = response.taxonomies.data[0].posts.data.filter(post => post.id < response.id)
                if (previousPosts.length) {
                    previous = previousPosts[0]
                }
                let nextPosts = response.taxonomies.data[0].posts.data.filter(post => post.id > response.id)
                if (nextPosts.length) {
                    next = nextPosts[nextPosts.length - 1]
                }
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

            return {
                item: response,
                previous: previous,
                next: next
            }
        },
        head() {
            return this.item.meta.seo
        },
        computed: {
            parsedDate() {
                return moment(this.date).format('MMMM Do YYYY')
            }
        },
        props: {
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        components: {
            ImageElement,
            AuthorBlock,
            ContentBlock,
            CategoryTagsBlock,
            SocialListBlock,
            CommentsBlock,
            Deal,
            AmpRelatedArticlesListBlock,
            AdBlock
        }
    }
</script>
