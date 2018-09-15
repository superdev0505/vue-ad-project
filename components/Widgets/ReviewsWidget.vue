<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">
            <nuxt-link to="/category/reviews">
                Reviews
            </nuxt-link>
        </div>
        <div v-for="(item, index) in items" :key="index" :class="$style.item">
            <div :class="$style.image">
                <image-element v-if="item.featured" :obj="item.featured" />
                <image-element v-else src="http://placehold.it/150x150" />
            </div>
            <div :class="$style.content">
                <nuxt-link :class="$style.link" :to="'/' + item.permalink">{{ item.title }}</nuxt-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    .wrapper {
        margin: 0;

        .title {
            border-top: 0.2rem solid $black;
            padding: 0.5rem 0 0 0;
            margin: 0.5em 0 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;
            text-transform: uppercase;
            font-style: italic;

            a:hover {
                text-decoration: none;
            }
        }

        .item {
            padding: 0 0 1em 0;

            .image {
                max-height: 8em;
                overflow: hidden;
            }

            .content {
                padding: 0.5rem;
                background: $color-secondary;

                .link {
                    cursor: pointer;
                    font-weight: 500;
                    display: block;

                    &:link, &:visited, &:hover {
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>

<script>
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
        components: {
            ImageElement
        }
    }
</script>
