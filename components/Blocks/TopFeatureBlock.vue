<template>
    <div :class="$style.wrapper" v-if="!$store.state.amp">
        <div :class="$style.content">
            <ad-block :name="adNamespace" :class="$style.ad"/>
        </div>
    </div>
</template>

<style lang="scss" module>

    // phone only
    @include media("<tablet") {

        .wrapper {
            display: none;
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {
            display: block;
            background: $color-secondary;

            .content {
                margin: 0 auto;
                max-width: 1280px;
                padding: 1rem 0;
                text-align: center;

                .ad div div iframe {
                    background: #DDD;
                }
            }
        }
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        props: {
            adNamespace: {
                type: String,
                default() {
                    return 'header'
                }
            }
        },
        components: {
            AdBlock
        }
    }
</script>