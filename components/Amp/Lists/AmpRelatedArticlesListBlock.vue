<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>
        <div :class="$style.container">
            <template v-for="(block, index) in items">
                <div :class="$style.block" :key="index">
                    <news-bite-block :item="block" amp />
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all other styles
    .wrapper {
        border-top: 0.2rem solid $black;
        margin-bottom: 1em;

        .title {
            margin-top: 0.5em;
            margin-bottom: 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;            
            text-transform: uppercase;
            font-style: italic;
        }

        .container {
            display: block;

            .block {
                width: 100%;
            }
            .adBlock {
                margin: 0.5rem;
            }
        }
    }

    // phone only
    @include media("<tablet") {
        .wrapper {
            .container {
                .block {
                    width: 100%;
                }
            }
        }
    }
</style>

<script>
    import NewsBiteBlock from '~/components/Blocks/Items/NewsBiteBlock'
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Related Articles'
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
            NewsBiteBlock,
            AdBlock
        }
    }
</script>