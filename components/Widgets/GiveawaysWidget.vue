<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">
            <nuxt-link to="/category/giveaways">
                Giveaways
            </nuxt-link>
        </div>
        <nuxt-link v-for="(item, index) in items" :key="index" :class="$style.item" :to="'/' + item.permalink">
            <div :class="$style.image">
                <image-element v-if="item.featured" :obj="item.featured" />
                <image-element v-else src="http://placehold.it/150x150" />
            </div>
            <div :class="$style.content">
                <div :class="$style.link">{{ item.title }}</div>
            </div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;

        .title {
            position: relative;
            text-align: center;
            font-family: $second-font-family;
            color: $white;
            font-size: 0.875rem;
            line-height: 26px;
            text-transform: uppercase;
            font-style: italic;
            padding: 0 33%;

            a {
                color: white;

                &:hover {
                    text-decoration: none;
                }
            }

            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: 0;
                z-index: -1;
                width: 100px;
                height: 25px;
                -webkit-transform: skew(-20deg);
                   -moz-transform: skew(-20deg);
                     -o-transform: skew(-20deg);
                        transform: skew(-20deg);
                background: $color-primary;
            }
        }

        .item {
            display: flex;
            margin: 0;
            padding: 0 0 1.25em 0;
            font-family: $base-font-family;

            &:link, &:visited, &:hover {
                text-decoration: none;
            }

            &:last-child {
                border-bottom: none;
            }

            .image {
                width: 30%;
                flex: 30%;

                img {
                    max-width: 100%;
                }
            }

            .content {
                padding-left: 1rem;
                width: 70%;
                flex: 70%;
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
