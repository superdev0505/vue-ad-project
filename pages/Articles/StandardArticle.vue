<template>
    <div :class="$style.wrapper">
        <ad-block center name="article.header" :class="$style.mobileOnly"/>
        <div :class="$style.contentBody">
            <div :class="$style.left" ref="left">
                <h1 v-html="item.title"></h1>
                <div :class="$style.byline" v-if="item.author">
                    <author-block article :author="item.author">{{ parsedDate }}</author-block>
                    <div :class="$style.socialShare">
                        <span :class="$style.share">Share This Article:</span><social-list-block :class="$style.social" :share="true" :title="encodeURI(item.title)" />
                    </div>
                </div>
                <div v-if="item.featured" :class="$style.featured" itemprop="image">
                    <image-element :obj="item.featured" />
                </div>
                <ad-block center name="article.featured" :class="$style.adBlockFeatured"/>
                <content-block
                    :ad-paragraph-count="1"
                    :ad-max="5"
                    :body="item.content"
                    ad-namespace="article.content"
                    :class="$style.articleContent"
                    id="articleContent" />
                <template v-if="item.featured_deals || item.deals">
                    <deal v-if="item.featured_deals" v-for="(deal, index) in item.featured_deals" :key="index + '-featured'" :deal="deal"></deal>
                    <div v-if="item.deals" v-for="(section, index2) in item.deals" :key="index2 + '-section'" :class="$style.dealSection">
                        <div class="h3">{{ section.title }}</div>
                        <p v-if="section.description" :class="$style.sectionDescription">{{ section.description }}</p>
                        <deal v-if="section.deals" v-for="(deal, index3) in section.deals" :key="index3 + '-deal'" :deal="deal"></deal>
                    </div>
                </template>
                <div class="h4">You May Like These</div>
                <amazon-ad-block />
                <sponsored-content-block :acf="item.acf" />
                <div class="h4" style="font-style: italic; text-transform: uppercase;">More Like This:</div>
                <category-tags-block :items="item.taxonomies.data" />
                <div :class="$style.articleFooter">
                    <div :class="$style.side">
                        <div :class="$style.datePublished">{{ parsedDate }}</div>
                        <source-block :acf="item.acf"></source-block>
                    </div>
                    <div :class="$style.side">
                        <div :class="$style.socialShare">
                            <span :class="$style.share">Share This Article:</span><social-list-block :class="$style.social" :share="true" />
                        </div>
                    </div>
                </div>
                <ad-block center name="article.footer"/>
                <a name="respond"></a>
                <comments-block :canonical="item.canonical" :identifier="item.permalink" />
                <div :class="$style.articleNavigation">
                    <div v-if="previous" :class="$style.previous">
                        <nuxt-link :to="'/' + previous.permalink" :class="$style.navLink">
                            <div :class="$style.navTitle">
                                <span :class="$style.icon">
                                    <span class="icon-arrow-carousel-left"></span> Previous Story
                                </span>
                            </div>
                            <div :class="$style.articleTitle">{{ previous.title }}</div>
                        </nuxt-link>
                    </div>
                    <div v-if="next" :class="$style.next">
                        <nuxt-link :to="'/' + next.permalink" :class="$style.navLink">
                            <div :class="$style.navTitle">
                                Next Story
                                <span :class="$style.icon">
                                    <span class="icon-arrow-carousel-right"></span>
                                </span>
                            </div>
                            <div :class="$style.articleTitle">{{ next.title }}</div>
                        </nuxt-link>
                    </div>
                </div>
                <related-articles-list-block :items="item.taxonomies.data[0].posts.data" ad-namespace="article.related" />
                <ad-block center name="article.related"/>
                <related-articles-list-block v-if="extraRelated.length > 0" :items="extraRelated" ad-namespace="article.related2" />
            </div>
            <div :class="[$style.right, $style.desktopOnly]"  v-if="!$store.state.isMobile" ref="right">
                <sidebar-block :content="item.sidebar" ad-namespace="article.sidebar" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        padding: 1rem;

        .featured {
            display: block;
            height: auto;
            margin-bottom: 1em;

            img {
                max-width: 100%;
                box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
                border: 1px solid #EEE;
            }
        }

        .adBlockFeatured {
            display: none;
        }

        .contentBody {
            width: auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .articleContent {
                margin-bottom: 3em;

                a {
                    font-weight: bold;
                }

                img {
                    box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
                    border: 1px solid #EEE;
                }

                ul {
                    -webkit-padding-start: 40px;
                    -webkit-margin-before: 1em;
                    -webkit-margin-after: 1em;
                    li {
                        font-family: $second-font-family;
                        font-size: 1.125rem;
                        line-height: 1.75;
                        font-weight: 300 !important;
                        list-style: disc;
                        @include media(">=tablet") {
                            font-size: 1.125rem;
                            line-height: 1.9;
                        }
                        @include media(">desktop") {
                            font-size: 1.25rem;
                            line-height: 2;
                        }

                        span {
                            font-weight: 300 !important;
                        }
                    }
                }
            }

            .left {
                // flex: 1;
                // width: auto;
                width: 100%;

                p > span {
                    font-weight: 300 !important;
                }

                .articleFooter {

                    .side {
                        display: flex;
                        justify-content: center;
                    }

                    .datePublished {
                        color: #9B9B9B;
                        font-style: italic;
                        font-size: 0.75em;
                        padding-right: 1em;
                    }
                }

                .dealSection {
                  display:block;
                  margin: 3rem 0;

                  .sectionDescription {
                      font-size: 1rem;
                      line-height: 1.5;
                  }

                }

                .articleNavigation {
                    display: flex;
                    flex-direction: row;
                    max-width: 100%;
                    overflow: hidden;
                    margin: 1rem 0;
                    border-top: 1px solid #DDD;
                    padding-top: 2em;

                    .navLink {
                        display: block;
                        position: relative;

                        &:link, &:visited, &:hover {
                            text-decoration: none;
                        }
                    }

                    .previous {
                        flex: 1;
                        text-align: right;
                        padding-right: 1rem;
                        border-right: 1px solid #EEE;

                        .navLink {

                            .icon span:before {
                                position: relative;
                                top: 1px;
                                right: 0;
                                transition: all .25s ease;
                            }

                            &:hover {

                                .icon span:before {
                                    right: 3px;
                                }
                            }
                        }
                    }

                    .next {
                        flex: 1;
                        padding-left: 1rem;
                        border-left: 1px solid #DDDDDD;

                        .navLink {

                            .icon span:before {
                                position: relative;
                                top: 1px;
                                left: 0;
                                transition: all .25s ease;
                            }

                            &:hover {

                                .icon span:before {
                                    left: 3px;
                                }
                            }
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

            .right {
                display: none;
            }
        }

        .byline {
            margin: 0;
        }

        .social {
            justify-content: center;

            a {
                margin: 0 .25em;
                width: 2em;
                height: 2em;
                font-size: 0.9em;
                line-height: 30px;

                &:last-of-type {
                    margin-right: 0;
                }
            }
        }

        .socialShare {
            margin: 2em auto;
            justify-content: center;
        }

        .share {
            display: block;
            margin-bottom: 1em;
            text-align: center;
            font-weight: 700;
            text-transform: uppercase;
            font-style: italic;
            font-size: 0.75em;
        }
    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {

            .mobileOnly {
                display: none;
            }

            .contentBody {

                .left {

                    .articleNavigation {
                        margin: 1rem 0 2em;
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

                        .social {
                            margin: 0;

                            a:first-of-type {
                                margin-left: 0;
                            }
                        }
                    }
                }
            }

            .byline {
                display: flex;
                justify-content: space-between;
                align-items: center;

                div {
                    margin: 1em 0;
                    display: flex;
                    align-items: center;
                }

                .share {
                    margin-bottom: 0;
                }
            }

            .socialShare {
                margin: 0;
            }

            .share {
                display: flex;
                align-items: center;
                margin-right: .5em;
                margin-bottom: .5em;
            }
        }
    }

    // desktop and up
    @include media(">desktop") {

        .wrapper {

            .adBlockFeatured {
                display: block;
            }

            .contentBody {

                .left {
                    width: -moz-calc(100% - 332px);
                    width: -webkit-calc(100% - 332px);
                    width: calc(100% - 332px);
                    align-self: flex-start;
                    // padding-right: 1rem;
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
    import ImageElement from '~/components/Elements/ImageElement'
    import AuthorBlock from '~/components/Blocks/AuthorBlock'
    import SocialMenu from '~/components/Menus/SocialMenu'
    import ContentBlock from '~/components/Blocks/ContentBlock'
    import SidebarBlock from '~/components/Blocks/SidebarBlock'
    import AdBlock from '~/components/Blocks/AdBlock'
    import CategoryTagsBlock from '~/components/Blocks/Tags/CategoryTagsBlock'
    import SocialListBlock from '~/components/Blocks/Lists/SocialListBlock'
    import SourceBlock from '~/components/Blocks/SourceBlock'
    import AmazonAdBlock from '~/components/Blocks/AmazonAdBlock'
    import CommentsBlock from '~/components/Blocks/CommentsBlock'
    import SponsoredContentBlock from '~/components/Blocks/SponsoredContentBlock'
    import RelatedArticlesListBlock from '~/components/Blocks/Lists/RelatedArticlesListBlock'
    import Deal from '~/components/Deals/Deal'
    import moment from 'moment'

    export default {
        layout: 'article',
        async asyncData({ params, app, error, query }) {
            const response = await app.$axios.$get('v1/posts/' + Buffer.from(params.permalink).toString('base64') + (query.draft ? '?draft=' + query.draft : '') )
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
                app.store.commit('category/setIsArticle', true)

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
                next: next,
                previous: previous,
                extraRelated: [],
                heightArticle: false
            }
        },
        head() {
            return this.item.meta.seo
        },
        mounted() {
            setTimeout(() => {
                if (this) {
                    this.calcHeight()
                }
            }, 10000)
            twttr.widgets.load(
              document.getElementById("articleContent")
            );
        },
        methods: {
            calcHeight() {
                if (!this.heightArticle && this.$refs.left && this.$refs.right) {
                    var leftHeight = this.$refs.left.clientHeight;
                    var rightHeight = this.$refs.right.clientHeight;
                    if (leftHeight < rightHeight) {
                        this.heightArticle = true
                        this.extraAPICall()
                    }
                }
            },
            extraAPICall() {
                this.$axios.get('v1/extra/' + this.item.taxonomies.data[0].taxonomy_id).then(response => {
                    this.extraRelated = response.data.data
                })
            }
        },
        computed: {
            parsedDate() {
                return moment(this.item.date).format('MMMM DD, YYYY, h:mma')
            }
        },
        props: {
            article: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        components: {
            ImageElement,
            AuthorBlock,
            SocialMenu,
            ContentBlock,
            SidebarBlock,
            AdBlock,
            CategoryTagsBlock,
            SocialListBlock,
            SourceBlock,
            AmazonAdBlock,
            CommentsBlock,
            SponsoredContentBlock,
            RelatedArticlesListBlock,
            Deal
        }
    }
</script>
