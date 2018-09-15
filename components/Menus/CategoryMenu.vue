<template>
    <div :class="$style.wrapper" :style="{background: color}">

        <!--Desktop-->
        <ul :class="[$style.menu, $style.desktopMenu]" v-if="!isMobile, !isArticle">
            <li :class="$style.item">
                <nuxt-link :class="$style.link" :active-class="$style.active" :exact-active-class="$style.exact" :to="'/' + root.permalink" v-html="root.name">
                </nuxt-link>
            </li>
            <li :class="$style.item" v-for="(item, index) in subcategories" :key="index">
                <nuxt-link :class="$style.link" :active-class="$style.active" :exact-active-class="$style.exact" :to="'/' + item.permalink" v-html="item.name">
                </nuxt-link>
            </li>
        </ul>

        <!--Tablet and Mobile-->
        <template :class="$style.hide">
            <div :class="$style.dropdown" v-if="isRoot && !isArticle" v-on-clickaway="toggleAway">
                <button :class="subcategories.length ? $style.dropbtn : [$style.dropbtn, $style.nosubs]" v-on:click="openDropDown">
                    <span v-html="root.name"></span>
                    <span v-if="subcategories.length" :class="$style.icon">
                        <i class='icon-arrow-dropdown-carot'></i>
                    </span>
                </button>
                <div :class="[$style.dropdownContent, { [$style.show]: showDropDown }]">
                    <nuxt-link :class="$style.link" :active-class="$style.active" :exact-active-class="$style.exact" :to="'/' + item.permalink" v-for="(item, index) in subcategories" :key="index" v-html="item.name">
                    </nuxt-link>
                </div>
            </div>
            <div :class="[$style.menu, $style.hide]" v-if="!isRoot && !isArticle">
                <div :class="$style.item">
                    <nuxt-link :class="$style.link" :active-class="$style.active" :exact-active-class="$style.exact" :to="'/' + root.permalink">
                        <span class="icon-link-arrow-left"></span><span v-html="root.name"></span>
                    </nuxt-link>
                </div>
            </div>
            <div :class="[$style.menu]" v-if="isArticle">
                <div :class="$style.item">
                    <a :class="[$style.link, $style.back]" href="#" @click.prevent="$router.go(-1)">
                        <span class="icon-link-arrow-left"></span><span> Back</span>
                    </a>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        padding: 1rem;
        @include box_shadow(1);
        margin-top: 80px;

        .hide {
            display: block;
        }

        .desktopMenu {
            display:none;
        }

        .dropdown {
            position: relative;
            display: inline-block;
        }

        .dropbtn {
            background: none;
            border-color: #ffffff4f;
            padding: .25em 1em .25em 0.5em;
            border-radius: 2px;
            color: $white;
            font-family: $second-font-family;
            text-transform: uppercase;
            font-weight: 700;
            font-size: 1.25rem;
            font-style: italic;
            &.nosubs {
                border: none;
            }
            .icon {
                font-size: 0.3rem;

                i:before {
                    position: relative;
                    top: -5px;
                    left: 5px;
                }
            }
        }

        .dropdownContent {
            display: none;
            position: absolute;
            top: 2.25em;
            background-color: white;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;

            a {
                color: black;
                padding: 12px 16px;
                text-decoration: none;
                display: block;

                &.active {
                    color: $color-primary;
                }
            }

            &.show {
                display: block;
            }
        }

        .menu {
            list-style: none;
            margin: 0 auto;
            max-width: 1280px;
            padding: 0;

            .item {
                display: inline-block;
                margin: 0;
                padding: 0 0.5rem;
                color: $white;
                font-size: 0.875em;
                font-weight: 300;
                line-height: 22px;
                vertical-align: top;

                &:first-child {
                    font-weight: 700;
                    font-family: $second-font-family;
                    font-size: 1.25rem;
                    font-style: italic;
                    text-transform: uppercase;
                    padding-left: 0;

                    .link.exact,
                    .link.active {
                        opacity: 1;
                    }
                }

                .link {
                    color: $white;
                    opacity: 1;

                    &:hover, &:focus {
                        text-decoration: none;
                        opacity: .6;
                        transition: opacity .25s ease-in-out;
                    }


                    &.active,
                    &:active,
                    &.exact {
                        color: $white;
                        opacity: .6;
                    }
                }
            }
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {
            margin-top: 0;

            .hide {
                display: none;
            }
        }
    }

    // desktop and up
    @include media(">=desktop") {

        .wrapper {

            .dropdown {
                display: none;
            }

            .desktopMenu {
                display: block;
            }
        }
    }

</style>

<script>
    import { mapGetters } from 'vuex'
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [ clickaway ],
        data () {
            return {
                showDropDown: false
            }
        },
        computed: {
            ...mapGetters({
                root: 'category/root',
                isRoot: 'category/isRoot',
                isArticle: 'category/isArticle',
                items: 'category/data',
                color: 'category/color',
                isMobile: 'isMobile'
            }),
            subcategories: function() {
                return this.items.filter(item => {
                   return ['category/all-news', 'category/best-cell-phone-deals/homepage-featured', 'category/newsletter', 'category/newsletter/featured', 'category/newsletter/stories', 'category/newsletter/deals', 'category/sponsored'].indexOf(item.permalink) === -1
                })
            }
        },
        methods: {
            openDropDown () {
                return this.showDropDown = !this.showDropDown
            },
            toggleAway() {
                this.showDropDown = false
            }
        },
        watch: {
            '$route'() {
                this.showDropDown = false
            }
        }
        /* data(){
             showDropDown:false
         },*/
    }
</script>
