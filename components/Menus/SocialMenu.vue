<template>
    <div :class="$style.wrapper">
        <template v-if="footer">
            <div :class="$style.footer">
                <a v-for="(socialAccount, index) in socialAccounts" :key="index" :href="socialAccount.link" :class="$style.socialLink" target="_blank" rel="noopener">
                    <span :class="socialAccount.icon"></span>
                </a>
            </div>
        </template>
        <template v-else>
            <div :class="$style.dropdown" v-on-clickaway="toggleAway">
                <div :class="[$style.socialMenuLink, {[$style.exact]: opened}]" @click="toggle" >
                    <span :class="$style.socialText">Social</span>
                    <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', {[$style.carotFlip]: opened}]"></i>
                </div>
                <div :class="[$style.dropdownContainer, {[$style.opened]: opened}]">
                    <div :class="$style.dropdownBlock">
                        <a v-for="(socialAccount, index) in socialAccounts" :key="index" :href="socialAccount.link" :class="$style.socialLink" target="_blank" rel="noopener">
                            <span :class="socialAccount.icon"></span>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {

        //footer
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .socialLink {
                margin: 0.5em 0.25em;

                &:first-of-type {
                    margin-left: 0;
                }

                &:last-of-type {
                    margin-right: 0;
                }
            }
        }

        .socialLink {
            display: inline-block;
            color: $white;
            font-size: 1.2rem;
            margin: 0 1rem;

            &:link, &:visited, &:hover {
                color: $white;
                text-decoration: none;
            }
        }

        .dropdown {
            position: relative;
            width: 100%;
            padding: 0;
            margin: 0;

            .socialMenuLink {
                opacity: .6;
                transition: opacity .25s ease-in-out;
                -moz-transition: opacity .25s ease-in-out;
                -webkit-transition: opacity .25s ease-in-out;
                -o-transition: opacity .25s ease-in-out;

                &:hover, &.active, &.exact {
                    opacity: 1;
                }

                .socialText {
                    font-weight: 500;
                    font-size: 1.125em;
                    line-height: 3;
                }

                .carotIcon:before {
                    font-size: .4em;
                    line-height: 2;
                    vertical-align: middle;
                    position: relative;
                    top: -2px;
                    left: 5px;
                    transition: all .25s ease;
                }

                .carotFlip:before {
                    position: relative;
                    top: -2px;
                    left: 9px;
                    -ms-transform: rotate(180deg); /* IE 9 */
                    -webkit-transform: rotate(180deg); /* Safari 3-8 */
                    transform: rotate(180deg);
                    transition: all .25s ease;
                }
            }

            .dropdownContainer {
                position: absolute;
                top: 3.75rem;
                right: 0;
                background: $white;
                color: $black;
                line-height: 1;
                border-radius: 2px;
                height: 0;
                overflow: hidden;
                @include box_shadow(1);

                &.opened {
                    height: 2.5rem;
                }

                .dropdownBlock {
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: row;
                    height: 2.5rem;

                    .socialLink {
                        background: $white;
                        color: $black;
                        flex: 1;
                        display: block;
                        margin: 0;
                        padding: 0.5rem;
                        font-size: 1.25rem;

                        &:hover {
                            color: $color-primary;
                            transition: all .25s ease-in-out;
                        }

                        &.exact {
                            background: lighten($grey-bg, 10%);
                        }
                    }
                }
            }
        }
    }
</style>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [ clickaway ],
        props: {
            footer: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                opened: false,
                socialAccounts: [
                    {
                        link: 'https://www.facebook.com/Androidheadline/',
                        icon: 'icon-social-facebook'
                    },
                    {
                        link: 'https://plus.google.com/102014810775752690796',
                        icon: 'icon-social-google'
                    },
                    {
                        link: 'https://twitter.com/Androidheadline',
                        icon: 'icon-social-twitter'
                    },
                    {
                        link: 'https://www.youtube.com/user/androidheadlines',
                        icon: 'icon-social-youtube'
                    },
                    {
                        link: 'https://www.instagram.com/androidheadline/',
                        icon: 'icon-social-instagram'
                    },
                    {
                        link: 'https://www.linkedin.com/company/android-headlines/',
                        icon: 'icon-social-linkedin'
                    },
                    {
                        link: 'https://www.androidheadlines.com/feed',
                        icon: 'icon-social-rss'
                    }
                ]
            }
        },
        methods: {
            toggle() {
                this.opened = !this.opened
            },
            toggleAway() {
                this.opened = false
            }
        }
    }
</script>
