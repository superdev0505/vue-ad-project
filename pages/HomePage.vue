<template>
    <div :class="$style.wrapper">
        <featured-banner :items="featured.data" />
        <ad-block center name="home.header" />
        <div :class="$style.container">

            <div :class="$style.row">
                <div :class="$style.left">
                    <standard-list-block :items="top_stories.data" title="Top Stories" topstories/>
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <ad-block center name="home.sidebar1" />
                    <trusted-by-millions-widget />
                </div>
            </div>

            <div :class="$style.row" v-if="module && module.name">
                <module-block :module="module" />
            </div>

            <div :class="$style.row">
                <div :class="$style.left">
                    <sponsored-list-block :items="sponsored_deals.data" title="Sponsored Content" sponsored />
                </div>

                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <ad-block center name="home.sidebar2" />
                    <giveaways-widget :items="sidebar.giveaways.data" />
                </div>
            </div>

            <div :class="$style.row">
                <div :class="$style.left">
                    <news-list-block ad-namespace="home.latest_android_tech_news" :items="latest_android_tech_news.data" title="Latest Android &amp; Tech News" />
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <ad-block center name="home.sidebar3" />
                    <metrics-widget :item="sidebar.metrics" />
                    <ad-block center name="home.sidebar4" />
                    <!-- <reviews-widget :items="sidebar.reviews.data" /> removed to accomodate half page ads in this part of the sidebar-->
                </div>
            </div>

            <div :class="$style.row" v-show="youtube && youtube.length && !$store.state.isMobile">
                <div :class="$style.left">
                    <video-list-block ad-namespace="home.youtube" youtube :items="youtube" title="What's on Youtube" cat-url="https://www.youtube.com/user/androidheadlines/videos?sub_confirmation=1" cat-url-label="see All Videos" is-blank/>
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <ad-block center name="home.sidebar5" />
                </div>
            </div>

            <div :class="[$style.row, $style.mobileHide]" v-show="!$store.state.isMobile">
                <div :class="$style.left">
                    <news-list-block ad-namespace="home.more_android_tech_news" :items="more_android_tech_news.data" title="More Android &amp; Tech News" />
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <category-news-widget title="Samsung News" banner-url="/category/samsung" :items="sidebar.samsung_news.data" style="margin-top:-0.5em;"/>
                    <ad-block center name="home.sidebar6" />
                    <apply-widget />
                    <ad-block center name="home.sidebar7" />
                </div>
            </div>

            <div :class="$style.row">
                <div :class="$style.left">
                    <secondary-list-block :items="special_features.data" title="Special Features" cat-url="/category/features" cat-url-label="see All Features" />
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <subscribe-widget />
                    <ad-block center name="home.sidebar8" />
                    <category-news-widget thumbnail title="Best Apps and Games" banner-url="/category/best" :items="sidebar.app_games.data" />
                </div>
            </div>

            <reviews-list-block ad-namespace="home.latest_reviews" :items="latest_reviews.data" title="Latest Reviews" cat-url="/category/reviews" cat-url-label="See All Reviews" carousel />

            <div :class="$style.row">
                <div :class="$style.left">
                    <tertiary-list-block :items="latest_tech_deals.data" title="Latest Tech Deals" cat-url="/category/best-cell-phone-deals" cat-url-label="see All Tech Deals" carousel/>
                </div>
                <div :class="[$style.right, $style.tabletHide]" v-show="!$store.state.isMobile">
                    <ad-block center name="home.sidebar9" />
                    <category-news-widget thumbnail title="Buying Guides" banner-url="/category/gift-guide" :items="sidebar.buying_guides.data" />
                </div>
            </div>

            <div :class="[$style.row, $style.mobileHide]" v-show="!$store.state.isMobile">
                <div :class="$style.left">
                    <news-list-block ad-namespace="home.more_android_tech_news2" :items="more_android_tech_news2.data" title="More Android &amp; Tech News" />

                </div>
                <div :class="[$style.right, $style.tabletHide]" >
                    <ad-block center name="home.sidebar10" />
                    <category-news-widget title="Tech News" banner-url="/category/tech-news" :items="sidebar.tech_news.data" />
                    <ad-block center name="home.sidebar11" />
                    <category-news-widget title="Android News" banner-url="/category/android/news" :items="sidebar.android_news.data" />
                </div>
            </div>
            <div :class="[$style.row, $style.load]" v-if="more_android_tech_news.data.length === 11">
                <nuxt-link :to="'/category/all-news/page/2'" class="btn btn--primary btn--block" style="margin: 0 auto 2em">View More News</nuxt-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    //phones only
    @include media("<=tablet") {
        .wrapper {

            .container {
                display: flex;
                flex-direction: column;
            }

            .tabletOnly {
                display: none;
            }

            .desktopHide {
                display: block;
            }

            .tabletHide {
                display: none;
            }

            .mobileHide {
                display: none;
            }

            .container {
                padding: 1.5rem 1em 0;
            }

            .right {
                display: none;
            }

            .row:nth-of-type(5) {
                order: 9;
            }

            .load {
                order: 10;
            }
        }
    }

    // bigger than tablet
    @include media(">tablet") {

        .wrapper {
            margin: 0;

            .desktopHide {
                display: none;
            }

            .tabletHide {
                display: none;
            }

            .mobileHide {
                display: block;
            }

            .container {
                margin: 0 auto;
                max-width: 1280px;
                padding: 1.5rem 1rem 0;

                .row {
                    display: flex;
                    flex-direction: row;
                    margin-bottom: 1em;

                    .left {
                        flex: 1;
                    }

                    .right {
                        flex: 300px;
                        width: 300px;
                        max-width: 300px;
                        min-width: 300px;
                        margin-left: 1rem;
                    }
                }
            }
        }
    }

    // desktop up
    @include media(">desktop") {

        .wrapper {

            .tabletHide {
                display: block;
            }

            .tabletOnly {
                display: none;
            }

            .container {

                .row {

                    .right {
                        margin-left: 1.5rem;
                    }
                }
            }
        }
    }

</style>

<script>
    import FeaturedBanner from '~/components/Banners/FeaturedBanner'
    import AdBlock from '~/components/Blocks/AdBlock'
    import ModuleBlock from '~/components/Blocks/ModuleBlock'
    import StandardListBlock from '~/components/Blocks/Lists/StandardListBlock'
    import SecondaryListBlock from '~/components/Blocks/Lists/SecondaryListBlock'
    import TertiaryListBlock from '~/components/Blocks/Lists/TertiaryListBlock'
    import ReviewsListBlock from '~/components/Blocks/Lists/ReviewsListBlock'
    import CarouselListBlock from '~/components/Blocks/Lists/CarouselListBlock'
    import VideoListBlock from '~/components/Blocks/Lists/VideoListBlock'
    import SponsoredListBlock from '~/components/Blocks/Lists/SponsoredListBlock'
    import NewsListBlock from '~/components/Blocks/Lists/NewsListBlock'
    import SocialWidget from '~/components/Widgets/SocialWidget'
    import TrustedByMillionsWidget from '~/components/Widgets/TrustedByMillionsWidget'
    import MetricsWidget from '~/components/Widgets/MetricsWidget'
    import GiveawaysWidget from '~/components/Widgets/GiveawaysWidget'
    import CategoryNewsWidget from '~/components/Widgets/CategoryNewsWidget'
    import ReviewsWidget from '~/components/Widgets/ReviewsWidget'
    import ApplyWidget from '~/components/Widgets/ApplyWidget'
    import SubscribeWidget from '~/components/Widgets/SubscribeWidget'

    export default {
        layout: 'home',
        async asyncData({ params, app, error }) {
            const response = await app.$axios.$get('v1/home')

            if (response.error) {
                return error({
                    statusCode: response.error.code,
                    message: response.error.message
                })
            }

            if (!response.youtube) {
                response.youtube = null
            }

            if (!response.module) {
                response.module = null
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

            return response
        },
        head() {
            return this.meta.seo
        },
        data(){
          siteUrl:'#'
        },
        // watch: {
        //     '$metaInfo'(newInfo, oldInfo) {
        //         console.log(newInfo, oldInfo)
        //     }
        // },
        components: {
            FeaturedBanner,
            AdBlock,
            ModuleBlock,
            StandardListBlock,
            ReviewsListBlock,
            SecondaryListBlock,
            TertiaryListBlock,
            CarouselListBlock,
            VideoListBlock,
            SponsoredListBlock,
            NewsListBlock,
            SocialWidget,
            MetricsWidget,
            TrustedByMillionsWidget,
            GiveawaysWidget,
            CategoryNewsWidget,
            ReviewsWidget,
            ApplyWidget,
            SubscribeWidget
        }
    }
</script>
