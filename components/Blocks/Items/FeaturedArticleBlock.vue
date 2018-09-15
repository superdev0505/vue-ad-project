<template>
    <div :class="[$style.wrapper, {[$style.homepage]: homepage}]" :homepage="homepage">
        <nuxt-link :to="'/' + item.permalink">
            <div :class="$style.container">
                <div :class="$style.left" :style="{'background-color': bgColor}">
                    <div :class="$style.category"  v-if="rootCategory">
                        <hr :class="$style.catLine"/>
                        <span v-html="rootCategory.name"></span>
                    </div>
                    <div :class="$style.link">
                        <span :class="[$style.title, 'h1']">{{ item.title }}</span>
                    </div>
                    <author-block :class="$style.author" v-if="item.author" no-avatar no-by no-link invert :author="item.author">{{ date }}</author-block>
                    <div :class="$style.readmore">
                        Read More <span class="icon-link-arrow-right"></span>
                    </div>

                </div>
                <div :class="$style.right">
                    <image-element v-if="item.featured" fit="cover" :obj="item.featured" />
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<style lang="scss" module>
    // base styles
    .wrapper {
        color: $color-white;
        box-shadow: 0 2px 12px rgba(0, 0, 0, .2);
        width: 100%;

        a {
            color: white;
            text-decoration:none;
        }

        .left {
            margin: 0;
            padding: 1rem;
            min-height: 10em;

            .category {
                font-family: $second-font-family;
                font-size: 0.75rem;
                text-transform: uppercase;
                font-style: italic;

                .catLine {
                    height: 3px;
                    background: $color-white;
                    border: none;
                    width: 3rem;
                    margin: 0;
                    margin-bottom: 0.5rem;
                    padding: 0;
                }
            }

            .link {
                display: block;
                color: inherit;

                &:link, &:visited, &:hover {
                    text-decoration: none;
                    color: inherit;
                }

                .title {
                    color: inherit;
                    font-size: 1.5em;
                }
            }

            .readmore {
                display: none;
            }
        }

        .container {
            display: flex;
            flex-direction: column;
            margin-top: -2em;

            .left {
                order: 2;
            }

            .right {
                order: 1;
                min-height: 15rem;
                padding: 0;
                margin: 0;
                flex: 100%;
                width: 100%;
                max-width: 100%;
                min-width: 100%;
                background-color: #444;
                position: relative;

                //added this to appease client about seeing logo in bottom right of image
                img {
                    object-position: bottom right !important;
                }
            }
        }

    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {

            .container {
                margin-top: 0;

                .right {
                    min-height: 30em;
                }

                .left {

                    .title {
                        font-size: 2.25em;
                    }
                }
            }

        }

    }

    //desktop and up
    @include media(">=desktop") {

        .wrapper {
            flex: 100%;
            width: 100%;
            margin: 0;

            //read more hover arrow
            a {
                &:hover, &:focus {

                    .container {

                        .left {

                            .readmore {
                                    span:before {
                                    right: -5px;
                                    transition: all .25s ease;
                                }
                            }
                        }
                    }

                }
            }

            //homepage style
            &.homepage {
                box-shadow: 0 5px 25px rgba(0,0,0,.4);
            }

            .container {
                flex-direction: row;

                .left, .right {
                    flex: none;
                    max-width: auto;
                    min-width: auto;
                }

                .left {
                    order: 1;
                    padding: 2em;
                    min-height: 30em;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 40%;
                    position: relative;

                    .category {
                        font-size: 0.875em;
                        position: absolute;
                        top: 2.5em;
                    }

                    .author {
                        font-size: 0.875em;
                    }

                    .title {
                        font-size: 2.75em;
                    }

                    .readmore {
                        display: block;
                        margin-top: 6%;
                        display: block;
                        color: $color-white;
                        text-transform: uppercase;

                        span:before {
                            position: relative;
                            top: 1px;
                            right: 0;
                            transition: all .25s ease;
                            font-size: .875em;
                        }

                        &:hover, &:focus {
                            text-decoration: none;
                        }
                    }

                }

                .right {
                    order: 2;
                    width: 60%;
                    flex: 100%;
                }
            }
        }
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
                default () {
                    return {}
                }
            },
            sponsored: {
                type: Boolean,
                default () {
                    return false
                }
            },
            homepage: {
                type: Boolean,
                default() {
                    return false
                }
            },
            category: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        computed: {
            bgColor () {
                if (this.rootCategory.acf && this.rootCategory.acf.color) {
                    return this.rootCategory.acf.color
                }

                return '#333333'
            },
            rootCategory() {
                let category = null
                if (this.category.id) {
                    category = this.category
                } else {
                    if (this.item.taxonomies.data) {
                        category = this.item.taxonomies.data[0]
                    }
                }

                if (category) {
                    if (category.parent !== 0) {
                        category = category.parent_term
                    }
                }

                return category
            },
            date () {
                return moment(this.item.date).format('MMMM DD, YYYY, h:mma')
            }
        },
        components: {
            AuthorBlock,
            ImageElement
        }
    }
</script>
