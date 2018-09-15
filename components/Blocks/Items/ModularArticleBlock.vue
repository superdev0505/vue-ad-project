<template>
        <nuxt-link :to="'/' + item.permalink" :class="$style.wrapper">
            <div :class="$style.contain">
                <div :class="$style.box">
                    <image-element :obj="item.featured" fit="cover" :class="$style.image"/>
                </div>
            </div>
            <div :class="$style.right">
                <h4 :class="$style.title" v-html="item.title"></h4>
            </div>
        </nuxt-link>
</template>

<style lang="scss" module>
    // all styles
    .wrapper {
        display: flex;
        justify-content: space-between;
        margin: 1em 0;

        .contain {  
            width: 40%; 
        }

        .box {
            position: relative;

            &:after {
                  display: block;
                  position: absolute;
                  background-color: rgba(0,0,0,0.2);
                  height: 100%;
                  width: 100%;
                  top: 0;
                  content: '';
                  z-index: 3;
            }
        }

        .image {
            position: relative !important;   
            height: auto !important;  
            box-shadow: 0 2px 7px rgba(0, 0, 0, .1);
            display: block;
        }

        .right {
            width: 60%;
        }

        .title {
            font-size: 1.25em;
            margin: 0 0 0 1em;
        }

        &:hover {
            text-decoration: none;
        }
    }


    // tablet and up
    @include media(">=tablet") {

        .wrapper {
            position: relative;  
            display: block; 
            margin: 0;
            margin-bottom: 1em;

            .contain,
            .right {
                width: 100%;
            }      

            .title {
                margin: 0;
                margin-top: 0.5em;
                font-size: 1em;
            }       

            .image {
                height: 10em !important;
            }
        }
    }

    // desktop and up
    @include media(">=desktop") {

        .wrapper {
            margin: 0;

            .image {
                height: 15em !important;
            }
        }
    }

</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            item: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        components: {
            ImageElement
        }
    }
</script>