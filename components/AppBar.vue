<template>
    <nav :class="$style.wrapper">
        <div :class="$style.header">
            <div :class="$style.toggle" @click="$store.commit('toggleMenu')">
                <span :class="$style.menuIcon" v-if="!$store.state.mobileMenuOpened"><i class="icon-menu-hamburger"></i></span>
                <span :class="$style.menuIcon" v-if="$store.state.mobileMenuOpened"><i class="icon-close"></i></span>
            </div>
            <ah-link :class="$style.logo" to="/">
                <img src="~/assets/images/logos/tablet_logo.svg" width="200" height="27" alt="AH Tech News" :class="$style.mobileLogo" />
                <img src="~/assets/images/logos/tablet_logo.svg" width="300" height="40" alt="AH Tech News" :class="$style.tabletLogo" />
                <img src="~/assets/images/logos/desktop_logo.svg" width="300" height="45" alt="AH Tech News" :class="$style.desktopLogo" />
            </ah-link>
            <div :class="[$style.menu, {[$style.opened]: $store.state.mobileMenuOpened}]">
                <main-menu />
                <div :class="$style.menuBackdrop" @click="$store.commit('toggleMenu')" v-if="$store.state.mobileMenuOpened"></div>
            </div>
            <app-search />
        </div>
        <div :class="$style.subHeader">
            <trending-menu v-if="$route.name === 'home'" />
        </div>
    </nav>
</template>

<style lang="scss" module>

    //default, phones
    .wrapper {
        width: 100%;

        .header {
            display: flex;
            flex-direction: row;
            color: $white;
            height: 5rem;
            padding: 1.25rem 1.5rem;
            font-size: 1.5rem;
            position: fixed;
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
            // @include box_shadow(1);
            background: $color-accent-8;
            z-index: 5;

            .toggle {
                padding: 0.25rem;
                cursor: pointer;
                margin-right: 1em;
                position: absolute;

                .menuIcon i:before {
                    font-size: 1rem;
                    width: 24px;
                    top: -2px;
                    position: relative;
                }
            }

            .logo {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                // alt tag styling
                color: white;
                text-transform: uppercase;
                font-style: italic;
                -webkit-tap-highlight-color: transparent;

                .mobileLogo {
                    // height: 100%;
                }
                .tabletLogo, .desktopLogo {
                    display: none;
                }
            }

            .mobileMenu {
                overflow: hidden;
            }

            .menu {
                opacity: 0;
                transition: opacity 0.2s linear;

                .menuBackdrop {
                    opacity: 0.2;
                    position: fixed;
                    top: 3.33em;
                    height: calc(100% - 3.33em);
                    width: 100%;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                    background: #000;
                }

                &.opened {
                    opacity: 1;
                }
            }

            .social {
                display: none;
            }
        }

        .subHeader {
            display: none;
            position: relative;
            z-index: 4;
        }

        .ampHeader {
            background: $color-black;
            color: $color-white;
            text-align: center;
        }
    }

    //tablet up
    @include media(">=tablet") {
        .wrapper {
            @include box_shadow(1);

            .header {

                .toggle {
                    display: none;
                }

                .logo {
                    display: block;
                    min-width: 2em;
                    width: auto;

                    .mobileLogo, .desktopLogo {
                        display: none;
                    }

                    .tabletLogo {
                        display: block;
                        height: 40px;
                        width: 250px;
                    }
                }

                .social {
                    text-align: right;
                    display: block;
                    cursor: pointer;
                    font-size: 0.75rem;
                    font-weight: 300;
                    line-height: 3.75;
                    text-transform: uppercase;
                }

                .mobileMenu {
                    display: none;
                }

                .search {
                    padding: 0.5rem;
                }

                .menu {
                    flex: 8;
                    opacity: 1;
                    transition: none;
                    line-height: 2.5;

                    .menuBackdrop {
                        display: none;
                    }

                    &.opened {
                        opacity: 1;
                    }
                }
            }

            .subHeader {
                display: block;
                background: #333;
                padding: 0 1em;
            }
        }
    }

    // desktop up
    @include media('>=desktop') {

        .wrapper {

            .header {

                .logo {

                    .tabletLogo {
                        display: none;
                    }

                    .desktopLogo {
                        display: block;
                        position: relative;
                        top: -5px;
                    }
                }
            }
        }
    }
</style>

<script>
    // import MobileMenu from '~/components/Menus/MobileMenu'
    import MainMenu from '~/components/Menus/MainMenu'
    import SocialMenu from '~/components/Menus/SocialMenu'
    import TrendingMenu from '~/components/Menus/TrendingMenu'
    import AppSearch from '~/components/AppSearch'

    export default {
        components: {
            // MobileMenu,
            MainMenu,
            SocialMenu,
            TrendingMenu,
            AppSearch
        }
    }
</script>
