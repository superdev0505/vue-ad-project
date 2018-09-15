<template>
    <div :class="$style.wrapper">
        <span v-for="(category, index) in categories" :key="index">
            <nuxt-link
                :class="$style.tag"
                :to="'/' + category.permalink"
                :style="{'background-color': category.acf.color ? category.acf.color : '#333333'}" v-html="category.name">
            </nuxt-link>
        </span>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin-bottom: 1em;

        .tag {
            display: inline-block;
            margin-right: 0.5em;
            margin-bottom: 0.5em;
            border-radius: 2rem;
            padding: .3em 1em;
            color: $color-white;
            text-transform: uppercase;
            font-size: 0.75em;
            font-style: italic;

            &:first-child {
                margin-left: 0;
            }

            &:link, &:visited, &:hover {
                color: $color-white;
                text-decoration: none;
            }
        }
    }
</style>

<script>
    export default {
        props: {
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        computed: {
            categories: function() {
                return this.items.filter(item => {
                   return ['category/all-news', 'category/best-cell-phone-deals/homepage-featured', 'category/newsletter', 'category/newsletter/featured', 'category/newsletter/stories', 'category/newsletter/deals', 'category/sponsored'].indexOf(item.permalink) === -1
                })
            }
        }
    }
</script>
