<template>
    <div :class="$style.wrapper">
        <h2 :class="$style.title">{{ title }}</h2>

        <div :class="$style.container">
            <template v-for="(item, index) in items">
                <template v-if="index < 12">
                    <grid-item-block :key="index" :item="item" :class="[$style.fourAcross, $style.mobileHideExtra]"/>
                </template>
            </template>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all styles
    .wrapper {
        border-top: 0.2rem solid $black;
        position: relative;

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
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: space-between;

            .fourAcross {
                width: calc(25% - 1rem);
            }
        }
    }

    
    // phones only
    @include media("<tablet") {

        .wrapper {

            .container {
                margin-bottom: 1em;            

                .fourAcross {
                    width: auto;
                }
            }

            .mobileHideExtra:nth-child(n+4) {
                display: none;
            }
        }
    }
</style>

<script>
    import GridItemBlock from '~/components/Blocks/Items/GridItemBlock'
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            title: {
                type: String,
                default() {
                    return 'Category'
                }
            },
            items: {
                type: Array,
                default() {
                    return []
                }
            },
            sponsored: {
                type: Boolean,
                default() {
                    return false
                }
            },
            catUrl:{
                type: String,
                default() {
                    return '#'
                }
            },
            catUrlLabel:{
                type: String,
                default() {
                    return ''
                }
            },
            isBlank:{
                type: Boolean,
                default() {
                    return false
                }
            },
            carousel: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        components: {
            GridItemBlock,
            ImageElement
        }
    }
</script>