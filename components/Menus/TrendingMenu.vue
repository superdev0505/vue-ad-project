<template>
    <div :class="$style.wrapper">
        <div :class="$style.title">
            <span :class="$style.icon">
                <span class="icon-trending"></span>
            </span>
            <span :class="$style.textLink">Trending</span>
        </div>
        <ul :class="$style.menu">
            <template v-for="(item, index) in $store.state.menus.trendingMenu">
                <nuxt-link :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
            </template>
        </ul>
        <social-list-block :class="$style.social" />
        <div :class="$style.clock">
            {{ date }}
        </div>
    </div>
</template>

<style lang="scss" module>

    .wrapper {
        //ensure content is not visible when it should not be
        display: none;
    }
    //larger phones and tablets
    @include media(">phone") {
        .wrapper {
            margin: 0;
            padding: 0;
            display: block;
            margin: 0 auto;
            max-width: 1280px;
            display: flex;
            flex-direction: row;

            .title {
                flex-grow: 2;
                max-width: 8rem;
                font-weight: 500;
                color: white;
                display: block;
                text-transform: uppercase;
                font-style: italic;
                padding: 1rem;
                font-size: 0.875rem;
                padding-left: 0;

                .icon {
                    color: $red;
                }

                .textLink {
                    margin-left: .625em;
                }
            }

            .menu {
                display: block;
                flex-grow: 8;
                font-weight: 300;

                .item {
                    display: inline-block;
                    padding: 0;
                    margin: 0;

                    .anchor {
                        display: block;
                        padding: 1.2rem;
                        margin: 0;
                        color: white;
                        transition: all .25s ease-in-out;
                        line-height: 1;

                        &:first-child {
                            padding-left: 0;
                        }

                        &:hover, &:focus {
                            opacity: .6;
                            text-decoration: none;
                        }
                    }
                }
            }

            .social {
                margin: 0;
                align-items: center;

                a {
                    margin: 0 .25em;
                    width: 2em;
                    height: 2em;
                    font-size: 0.75em;
                    line-height: 25px;

                    &:last-of-type {
                        margin-right: 0;
                    }
                }
            }

            .clock {
                text-align: right;
                font-weight: 100;
                padding: 1rem;
                font-size: 0.875rem;
                padding-right: 0;
                color: white;
            }
        }
    }
    
</style>

<script>
    import SocialListBlock from '~/components/Blocks/Lists/SocialListBlock'
    import moment from 'moment'

    export default {
        computed: {
            date() {
                return moment().format('dddd, MMMM DD, YYYY')
            }
        },
        components: {
            SocialListBlock
        }
    }
</script>