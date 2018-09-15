<template>
    <div :class="$style.wrapper">
        <ad-block :name="adNamespace + '1'" />
        <giveaways-widget v-if="content.giveaways" :items="content.giveaways.data" />
        <ad-block :name="adNamespace + '2'" />
        <category-news-widget v-if="content.android_news" title="Android News" banner-url="/category/news" :items="content.android_news.data" />
        <ad-block :name="adNamespace + '3'" />
        <category-news-widget v-if="content.tech_deals" thumbnail title="Tech Deals" banner-url="/category/best-cell-phone-deals" :items="content.tech_deals.data" />
        <ad-block :name="adNamespace + '4'" />
        <category-news-widget v-if="content.samsung_news" title="Samsung News" banner-url="/category/samsung" :items="content.samsung_news.data" />
        <ad-block :name="adNamespace + '5'" />
        <category-news-widget v-if="content.buying_guides" thumbnail title="Buying Guides" banner-url="/category/best-cell-phone-deals/gift-guide" :items="content.buying_guides.data" />
        <ad-block :name="adNamespace + '6'" />
        <category-news-widget v-if="content.tech_news" title="Tech News"  banner-url="/category/tech-news" :items="content.tech_news.data" />
        <ad-block :name="adNamespace + '7'" />
        <reviews-widget v-if="content.reviews" :items="content.reviews.data" />
        <ad-block :name="adNamespace + '8'" />
        <category-news-widget v-if="content.app_games" title="Best Apps and Games" banner-url="/category/best" :items="content.app_games.data" />
        <ad-block :name="adNamespace + '9'" />
        <apply-widget />
        <ad-block :name="adNamespace + '10'" />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'
    import MetricsWidget from '~/components/Widgets/MetricsWidget'
    import GiveawaysWidget from '~/components/Widgets/GiveawaysWidget'
    import SocialWidget from '~/components/Widgets/SocialWidget'
    import CategoryNewsWidget from '~/components/Widgets/CategoryNewsWidget'
    import ReviewsWidget from '~/components/Widgets/ReviewsWidget'
    import ApplyWidget from '~/components/Widgets/ApplyWidget'

    export default {
        props: {
            content: {
                type: Object,
                default() {
                    return {}
                }
            },
            adNamespace: {
                type: String,
                default() {
                    return 'sidebar'
                }
            }
        },
        components: {
            AdBlock,
            MetricsWidget,
            GiveawaysWidget,
            SocialWidget,
            CategoryNewsWidget,
            ReviewsWidget,
            ApplyWidget
        }
    }
</script>
