<template>
    <div :class="[$style.wrapper, {[$style.centered]: center}]">
        <ad-element :class="$style.ad" :name="adName" :amp="amp" :amp-call="ampCall" />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        //display: inline-block;

        &.centered {
            text-align: center;
        }

        .ad {
            display: inline-block;
            
            > div {
                margin: 0 auto;
            }
        }
    }
</style>

<script>
    import AdElement from '~/components/Elements/AdElement'

    export default {
        props: {
            name: {
                type: String,
                default() {
                    return 'unknown'
                }
            },
            desktop: {
                type: String,
                default() {
                    return '(min-width: 1024px)'
                }
            },
            tablet: {
                type: String,
                default() {
                    return '(min-width: 768px)'
                }
            },
            center: {
                type: Boolean,
                default() {
                    return false
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            },
            ampCall: {
                type: Number,
                default() {
                    return 1
                }
            }
        },
        data() {
            return {
                adName: null,
                resizeTimeout: null
            }
        },
        methods: {
            checkMedia() {
                if (window.matchMedia(this.desktop).matches) {
                    this.adName = this.name + '.desktop'
                } else if (window.matchMedia(this.tablet).matches) {
                    this.adName = this.name + '.tablet'
                } else {
                    this.adName = this.name + '.mobile'
                }
            }
        },
        created() {
            this.adName = this.name + '.mobile'
        },
        mounted() {
            this.checkMedia()
            window.addEventListener('resize', event => {
                clearTimeout(this.resizeTimeout)
                this.resizeTimeout = setTimeout(() => {
                    this.checkMedia()
                }, 100)
            })
        },
        components: {
            AdElement
        }
    }
</script>