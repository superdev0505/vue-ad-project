<template>
    <div :class="$style.wrapper" v-if="$store.state.sponsoredAds.link">
        <a :href="$store.state.sponsoredAds.link" :class="$style.link">
            <div :class="$style.block">
                <div :class="$style.imageWrapper" v-if="image">
                    <div :class="$style.image" :style="{'background-image': 'url(' + image + ')'}"></div>
                </div>
                <div :class="$style.text">
                    <span :class="$style.captionWrapper">
                        <span :class="$style.caption">Sponsored Content</span>
                    </span>
                    <div v-if="$store.state.sponsoredAds.text" :class="[$style.title, 'h4']" v-text="$store.state.sponsoredAds.text"></div>
                </div>
            </div>
        </a>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        padding: 0.5em 0;

        .link:hover,
        .link:focus {
            text-decoration: none;
        }

        .block {
            display: flex;
            flex-direction: row;

            .imageWrapper {
                margin-right: 1em;

                .image {
                    width: 150px;
                    height: 100%;
                    background-repeat: no-repeat;
                }
            }

            .captionWrapper {
                position: relative;
                text-align: center;
                font-family: $second-font-family;
                color: $white;
                font-size: 0.75rem;
                line-height: 26px;
                text-transform: uppercase;
                font-style: italic;
                padding: 0 0.75em;

                .caption {
                    color: white;
                }

               &:after {
                    content: " ";
                    display: block;
                    position: absolute;
                    top: 0;
                    z-index: -1;
                    width: 138px;
                    height: 18px;
                    -webkit-transform: skew(-20deg);
                       -moz-transform: skew(-20deg);
                         -o-transform: skew(-20deg);
                            transform: skew(-20deg);
                    background: #333;
                }
            }

             .title {
                margin-top: 0.5em;
            }
        }
    }
</style>

<script>
    export default {
        computed: {
            image() {
                if (this.$store.state.sponsoredAds.image) {
                    let image = this.$store.state.sponsoredAds.image
                    if (typeof image === 'string' || image instanceof String) {
                        return image
                    }

                    if (image.media_details) {
                        if (image.media_details.sizes) {
                            if (image.media_details.sizes.thumbnail) {
                                return image.media_details.sizes.thumbnail.source_url
                            }
                        }

                        return image.media_details.source_url
                    }

                    return image.source_url
                }

                return null
            }
        }
    }
</script>
