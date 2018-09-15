<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">
            <template v-if="bannerUrl">
                <nuxt-link :to="bannerUrl">
                    {{ title }}
                </nuxt-link>
            </template>
            <template v-else>
                {{ title }}
            </template>
        </div>

        <nuxt-link v-for="(item, index) in items" :key="index" :class="$style.item" :to="'/' + item.permalink">
            <div :class="$style.image" v-if="thumbnail">
                <image-element v-if="item.featured" :obj="item.featured" />
                <image-element v-else src="http://placehold.it/150x150" />
            </div>
            <div :class="$style.content">
                <div :class="$style.link">{{ item.title }}</div>
                <content-block
                    v-if="content"
                    :ad-paragraph-count="0"
                    :ad-max="0"
                    :body="item.excerpt" />
                <div v-if="author">
                    <span :class="$style.updated">{{ date(item.date) }}</span> - Written By <span v-if="item.author">{{ item.author.name }}</span>
                </div>
                <div v-else :class="$style.date">
                    {{ date(item.date) }}
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;

        .title {
            border-top: 0.2rem solid $black;
            padding: 0.5rem 0 0 0;
            margin: 0.5em 0 0;
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
            border-bottom: 1px solid $color-secondary;
            margin: 0;
            display: flex;
            padding: 1rem 0;
            flex-direction: row;
            font-family: $base-font-family;

            &:link, &:visited, &:hover {
                text-decoration: none;
            }

            &:last-child {
                border-bottom: none;
            }

            .image {
                flex: 4;
                margin-right: 0.5rem;
                height: 4em;
                overflow: hidden;

                img {
                    min-height: 4em;
                }
            }

            .content {
                flex: 8;

                .link {
                    cursor: pointer;
                    font-weight: 700;
                    display: block;
                }

                .updated {
                    color: blue;
                }

                .date {
                    font-size: 0.75em;
                    font-weight: 500;
                    opacity: .5;
                    margin-top: 0.25em;
                    font-family: $second-font-family;
                }
            }
        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'
    import ContentBlock from '~/components/Blocks/ContentBlock'
    import moment from 'moment'

    export default {
        props: {
            thumbnail: {
                type: Boolean,
                default() {
                    return false
                }
            },
            content: {
                type: Boolean,
                default() {
                    return false
                }
            },
            bannerUrl: {
                type: String,
                default() {
                    return null
                }
            },
            author: {
                type: Boolean,
                default() {
                    return false
                }
            },
            title: {
                type: String,
                default() {
                    return null
                }
            },
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods:{
            date(d) {
                return moment(d).format('MMMM DD, YYYY, h:mma')
            }
        },
        components: {
            ImageElement,
            ContentBlock
        }
    }
</script>
