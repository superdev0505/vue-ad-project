<template>
    <div :class="$style.wrapper">

        <div :class="$style.desktop">
            <div :class="$style.container">
                <subscribe-widget :class="$style.subscribe" />

                <div :class="$style.logo">
                    <img src="~/assets/images/logos/footer_logo.svg" alt="Android Headlines" :class="$style.logoImage"/>
                </div>
            </div>

            <div :class="$style.menuGroup">
                <div :class="[$style.hide, $style.brands]">
                    <div>Brand News</div>
                    <footer-brand-menu :class="[$style.submenu, $style.submenuWide]" />
                </div>
                <footer-main-menu :class="[$style.hide, $style.mainMenu]" />
                <footer-menu :class="$style.menu"/>
            </div>
        </div>

        <div :class="$style.footnote">
            <footer-footnote-menu :class="$style.footnoteMenu" />
            <social-menu footer :class="$style.social" />
        </div>
        <div :class="$style.copyright">Copyright &copy;{{getYear()}} Android Headlines. All rights reserved. Site by <a href="http://www.reaction.ca/">Reaction</a>.</div>
    </div>
</template>

<style lang="scss" module>

    // base styles
    .wrapper {
        background: $black;
        color: $white;
        padding: 2rem;

        .subscribe {
            background: none;
            padding: 0;
            margin: auto;
            margin-bottom: 2em;
            max-width: 325px;

            input {
                background: #222;
                color: white;
                width: 60%;
                display: inline-block;
                height: 37px;
            }

            button {
                position: relative;
                width: 70%;
                display: inline-block;
                height: 37px;
                vertical-align: top;
                background: $color-primary;
                border-radius: 0 2px 2px 0;
                right: 0;
                bottom: 0;
                margin-top: 1em;

                span:before {
                    color: white;
                }
            }
        }

        .logo {

            .logoImage {
                margin: auto;
                max-width: 13em;
                width: 100%;
            }
        }

        .menuGroup {
            display: flex;
            justify-content: space-between;
            font-weight: 300;
            font-size: .875em;

            .submenu {
                font-size: 0.875em;

                div div a {
                    color: #777;
                    font-weight: 500;
                }
            }

            .mainMenu {
                column-count: 2;
            }
        }

        .footnote {
            border-top: 1px solid #333;
            padding: 1em 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .social {

            a {
                margin: 0 .5em;
                opacity: 1;
                transition: all .25s ease-in-out;

                &:last-child {
                    margin: 0;
                }

                &:hover {
                    opacity: .6;
                }
            }
        }

        .copyright {
            color: #777;
            font-size: 0.75rem;

            a {
                color: #777;
                text-decoration: none;
            }
        }
    }

    // phone only
    @include media("<tablet") {

        .wrapper {

            .subscribe,
            .logo,
            .social,
            .copyright {
                text-align: center;
            }

            .subscribe {
                width: auto;
            }

            .menu {
                column-count: 2;
                max-width: 20em;
                margin: 2em auto 3em;
            }

            .social {
                width: 100%;
                max-width: 20em;
                margin: auto;
            }

            .hide,
            .footnoteMenu {
                display: none;
            }
        }
    }

    // tablet and up
    @include media(">=tablet") {

        .wrapper {

            .container {
                display: flex;
                justify-content: space-between;
            }

            .subscribe {
                margin: 0 0 2em 0;
            }

            .menuGroup {
                margin-top: 1em;
            }

            .footnote {
                margin-top: 2em;
            }

            .footnoteMenu {
                flex: 2;
            }

            .social {
                margin: 0;

                a {
                    margin: 0 .25em;
                }
            }
        }
    }


    // desktop and up
    @include media(">=desktop") {

        .wrapper {

            .desktop {
                display: flex;
                justify-content: flex-start;
            }

            .logo {
                margin-top: 2em;

                .logoImage{
                    max-width: 18em;
                }
            }

            .container {
                display: block;
                flex: 1;
            }

            .menuGroup {
                margin-top: 0;
                width: 100%;
                flex: 4;
                justify-content: space-around;

                .brands {
                    column-count: auto;
                }

                .submenu {
                    font-size: 1em;
                }
            }
        }
    }

</style>

<script>
    import FooterMenu from '~/components/Menus/FooterMenu'
    import FooterBrandMenu from '~/components/Menus/FooterBrandMenu'
    import FooterMainMenu from '~/components/Menus/FooterMainMenu'
    import FooterFootnoteMenu from '~/components/Menus/FooterFootnoteMenu'
    import SocialMenu from '~/components/Menus/SocialMenu'
    import SubscribeWidget from '~/components/Widgets/SubscribeWidget'
    import moment from 'moment'

    export default {
        methods:{
            getYear() {
                return moment().format('YYYY')
            }
        },
        components: {
            FooterMenu,
            SocialMenu,
            SubscribeWidget,
            FooterMainMenu,
            FooterBrandMenu,
            FooterFootnoteMenu
        }
    }
</script>
