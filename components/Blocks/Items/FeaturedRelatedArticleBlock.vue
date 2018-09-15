<template>
    <div :class="$style.wrapper">
        <nuxt-link :class="$style.link" :to="'/' + item.permalink">
            <image-element v-if="item.featured" fit="cover" :obj="item.featured" :amp="amp" />
            <div :class="[$style.title, 'h3']" v-html="item.title"></div>
            <div :class="$style.colorOverlay"></div>
    </nuxt-link>
   </div>
</template>

<style lang="scss" module>
    .wrapper {
        background-color: $font-color;
        //background-size: cover;
        background-repeat: no-repeat;
        width: 100%;
        color: $color-white;
        position: relative;
        min-height: 20rem;

        .link:hover,
        .link:focus {
            text-decoration: none;
        }

        .title {
            display: block;
            color: inherit;
            position: absolute;
            bottom: 1rem;
            left: 1rem;
            width: calc(100% - 2em);
            z-index: 2;
            color: inherit;
            text-shadow: 0 0 20px rgba(0, 0, 0, .2);
            margin-bottom: 0;
            color: white;
        }


    }
    .colorOverlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to top, rgba(0, 0, 0, .75) 0%, rgba(0, 0, 0, .25) 100%);
        z-index: 1;
    }
</style>

<script>
    import AuthorBlock from '~/components/Blocks/AuthorBlock'
    import ImageElement from '~/components/Elements/ImageElement'
    import moment from 'moment'

    export default {
        props: {
            item: {
                type: Object,
                default() {
                    return {}
                }
            },
            amp: {
                type: Boolean,
                default() {
                  return false
                }
            }
        },
        computed: {
            date() {
                return moment(this.item.date).fromNow()
            }
        },
        components: {
            AuthorBlock,
            ImageElement
        }
    }
</script>
