<template>
    <div :class="[$style.wrapper, {[$style.opened]: $store.state.mobileMenuOpened}]" v-on-clickaway="toggleAway">

        <!--Mobile Menu Panel-->
        <ul :class="[$style.menu, $style.mobilePanel]" v-show="$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mobileMenuPanel">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span :class="$style.name" v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>

        <!--Main Menu 4 (Tablet)-->
        <ul :class="[$style.menu, $style.tablet]" v-show="!$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mainMenu4">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>

        <!--Main Menu 3 (Lg Tablet)-->
        <ul :class="[$style.menu, $style.lgTablet]" v-show="!$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mainMenu3">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>

        <!--Main Menu 2 (Desktop)-->
        <ul :class="[$style.menu, $style.desktop]" v-show="!$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mainMenu2">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>

        <!--Main Menu 1 (Md Desktop)-->
        <ul :class="[$style.menu, $style.mdDesktop]" v-show="!$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mainMenu1">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>

        <!--Main Menu (Lg Desktop)-->
        <ul :class="[$style.menu, $style.lgDesktop]" v-show="!$store.state.isMobile">
            <template v-for="(item, index) in $store.state.menus.mainMenu">
                <nuxt-link v-if="!item.children"  :to="'/' + item.permalink" :key="index" :class="$style.item" tag="li" :active-class="$style.active" :exact-active-class="$style.exact">
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
                <li v-else :key="index" :class="[$style.item, { [$style.hasSubMenu]: menu === index }]">
                    <a :class="$style.anchor" @click="menu === index ? menu = -1 : menu = index">
                        <span v-html="item.name"></span>
                        <span :class="[$style.icon, $style.rightIcon]">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </a>
                    <ul :class="[$style.subMenu, { [$style.hidden]: menu !== index }]" :id="item.id">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <nuxt-link :to="'/' + childItem.permalink" :active-class="$style.active" :exact-active-class="$style.exact" v-html="childItem.name">
                            </nuxt-link>
                        </li>
                    </ul>
                </li>
            </template>
        </ul>
        <social-menu :class="$style.social" footer />
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        margin: 0;
        padding: 0;
        position: fixed;
        overflow-y: scroll;
        top: 4.9rem;
        left: -100%;
        width: calc(100% - 2rem);
        height: 100%;
        background: $color-accent-1;
        transition: left 0.2s linear;
        z-index: 2;
        @include box_shadow(1);

        &.opened {
            left: 0;
        }

        .mobilePanel,
        .tablet,
        .lgTablet,
        .desktop,
        .mdDesktop,
        .lgDesktop {
            display: none;
        }

        .menu {

            .item {
                cursor: pointer;
                color: $white;
                font-weight: 300;
                -webkit-tap-highlight-color: transparent;

                &:not(:last-child) {
                    border-bottom: 1px solid $color-accent-2;
                }
                &.active {
                  .anchor {
                    opacity: 1;
                  }
                }
                &.exact {
                    color: darken($white, 20%);

                    .anchor {
                        opacity: 1;
                    }
                }

                .anchor {
                    display: block;
                    color: inherit;
                    padding: 1.5rem;
                    // font-size: 1rem;
                    font-size: 0.9rem;

                    &:link, &:visited, &:hover, &:active {
                        text-decoration: none;
                        color: inherit;
                    }

                    .icon {
                        font-size: 0.25rem;

                        .carotIcon:before {
                            position: relative;
                            top: -3px;
                            left: 7px;
                            transition: all .25s ease;
                        }

                        .carotFlip:before {
                            position: relative;
                            top: -3px;
                            left: 12px;
                            -ms-transform: rotate(180deg); /* IE 9 */
                            -webkit-transform: rotate(180deg); /* Safari 3-8 */
                            transform: rotate(180deg);
                            transition: all .25s ease;
                        }
                    }
                }

                &.hasSubMenu {
                    position: relative;

                    .subMenu {
                        list-style: none;
                        z-index: 3;
                        background: #111;
                        position: absolute;
                        top: 3.5rem;
                        @include box_shadow(1);
                        border-radius: 0 0 3px 3px;
                        width: 100%;
                        padding-bottom: 0.25em;

                        > li {

                            > a {
                                display: block;
                                font-size: 0.875rem;
                                padding: 0.625rem 0.75rem;
                                color: #999;
                                font-weight: 500;
                                line-height: 1.25;
                                text-decoration: none;

                                &.exact, &:hover, &:focus {
                                    text-decoration: none;
                                    color: #666;
                                    transition: all .25s ease-in-out;
                                    text-decoration: none;
                                }

                                &.exact {
                                    background: $color-primary;
                                    color: white;
                                }

                            }
                        }
                    }
                }

                .subMenu {
                    clear: both;
                    display: block;
                    &.hidden {
                        display: none;
                    }
                }
            }
        }
    }


    //phone only, sliding menu
    @include media("<tablet") {

        .wrapper {
            top: 3.33em;
            height: 100%;

            .social {
                position: relative;
                width: 100%;
                top: -3em;
                padding: 0.5em;

                a {
                    margin: 0 0.5em;

                    &:hover, &:focus, &:active {
                        opacity: .6;
                        transition: opacity .25s ease-in-out;
                    }
                }
            }

            .menu {
                padding-bottom: 3em;

                &.mobilePanel {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    overflow-y: scroll;

                    .item {

                        &.hasSubMenu {

                            .subMenu {
                                position: relative;
                                top: auto;
                                background: #222;

                                > li > a {
                                    color: #999;
                                    font-weight: 500;
                                    font-size: 0.575em;
                                    padding-left: 1.75em;
                                    line-height: 1.8;

                                    &:hover, &:focus, &:active {
                                        opacity: .6;
                                        transition: opacity .25s ease-in-out;
                                    }
                                }

                                > li .exact {
                                    background: $color-primary;
                                    color: white;
                                }
                            }
                        }

                        .anchor {
                            padding: 0 0 0 1.5em;
                            min-height: 3em;
                            vertical-align: middle;
                            line-height: 4;
                            -webkit-touch-callout: none;
                            -webkit-user-select: none;
                            -khtml-user-select: none;
                            -moz-user-select: none;
                            -ms-user-select: none;
                            user-select: none;
                            -webkit-tap-highlight-color: transparent;

                            .name {
                                -webkit-touch-callout: none;
                                -webkit-user-select: none;
                                -khtml-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                user-select: none;
                            }

                            &:hover, &:focus, &:active {
                                opacity: .6;
                                transition: opacity .25s ease-in-out;
                            }
                        }
                    }
                }
            }
        }
    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {
            margin: 0;
            padding: 0;
            position: relative;
            overflow-y: initial;
            display: block;
            top: auto;
            left: auto;
            width: auto;
            background: transparent;
            transition: none;
            @include box_shadow(0);

            &.opened {
                left: auto;
            }

            .menu {

                .item {
                    display: inline-block;
                    padding: 0 0.65em;
                    position: relative;
                    top: -.5em;

                    &:not(:last-child) {
                        border-bottom: none;
                    }

                    &:hover, &.active {
                        background: transparent;
                    }

                    &.exact {
                        color: $white;
                        opacity: .6;
                    }

                    &.hasSubMenu {

                        .subMenu {
                            min-width: 12.5rem;
                            width: auto;
                        }

                        .anchor {
                            opacity: 1;
                        }
                    }

                    .anchor {
                        padding: 0;
                        margin: 0;
                        opacity: 1;
                        transition: opacity .25s ease-in-out;
                        -moz-transition: opacity .25s ease-in-out;
                        -webkit-transition: opacity .25s ease-in-out;
                        -o-transition: opacity .25s ease-in-out;

                        &:hover, &.active {
                            opacity: .6;
                        }
                    }

                    &.active {
                        .anchor {
                            opacity: .6;
                        }
                    }
                }
            }

            .social {
                display: none;
            }

            .mobilePanel {
                display: none;
            }

            .tablet {
                display: block;
            }

            .lgTablet {
                display: none;
            }
        }
    }

    //lg tablet and up
    @include media(">875px") {

        .wrapper {

            .tablet {
                display: none;
            }

            .lgTablet {
                display: block;
            }
        }
    }

    //desktop and up
    @include media(">1024px") {

        .wrapper {

            .lgTablet {
                display: none;
            }

            .desktop {
                display: block;
            }
        }
    }

    //md desktop and up
    @include media(">1200px") {

        .wrapper {

            .desktop {
                display: none;
            }

            .mdDesktop {
                display: block;
            }
        }
    }

    //lg desktop and up
    @include media(">1395px") {

        .wrapper {

            .mdDesktop {
                display: none;
            }

            .lgDesktop {
                display: block;
            }
        }
    }
</style>

<script>
    import SocialMenu from '~/components/Menus/SocialMenu'
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [ clickaway ],
        data() {
            return {
                menu: -1
            }
        },
        methods: {
            toggleAway() {
                this.menu = -1
            }
        },
        mounted() {
            this.$router.beforeEach((to, from, next) => {
                if (this.menu != -1) {
                    this.menu = -1
                }
                next()
            })
        },
        components: {
            SocialMenu
        }
    }
</script>
