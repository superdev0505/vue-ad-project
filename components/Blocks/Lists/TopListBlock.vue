<template>
    <div :class="$style.wrapper">
            <h2 :class="$style.title">{{ title }}</h2> 
            <div v-for="(item, index) in items" :key="index" :class="$style.item">
                <nuxt-link :to="'/' + item.permalink" :class="$style.link">
                    <top-item-block :item="item" />
                </nuxt-link>
            </div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        border-top: 0.2rem solid $black;
        margin-bottom: 2em;

        .link:hover {
            text-decoration: none;
        }

        .title {
            margin-top: 0.5em;
            margin-bottom: 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;            
            text-transform: uppercase;
            font-style: italic;
        }

        .item {
            border-bottom: 1px solid $color-secondary;
            padding: 2em 0;

            &:last-child {
                border-bottom: none;
            }

            &:first-of-type {
                padding-top: 0;
            }
        }
    }

    // phone only 
    @include media('<tablet') {
        .wrapper {
            margin-bottom: 0;
        }
    }
</style>

<script>
    import TopItemBlock from '~/components/Blocks/Items/TopItemBlock'

    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Top Stories'
                }
            },
            items: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            TopItemBlock
        }
    }
</script>