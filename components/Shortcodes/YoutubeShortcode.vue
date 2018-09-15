<template>
    <div :class="$style.wrapper">
        <iframe v-if="!amp" :class="$style.embed" width="640" title="Video" height="360" :src="'https://www.youtube.com/embed/' + video" frameborder="0" seamless="seamless" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <amp-youtube v-if="amp" :data-videoid="video" width="640" height="360" layout="responsive"></amp-youtube>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
        margin-bottom: 2em;
        position: relative;
        display: block;
        height: 0;
        padding: 0;
        overflow: hidden;
        padding-bottom: 56.25%;

        .embed {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            height: 100%;
            width: 100%;
            border: 0;
        }
    }
</style>

<script>
    export default {
        props: {
            video: {
                type: String,
                default() {
                    return null
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        }
    }
</script>
