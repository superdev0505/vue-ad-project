<template>
    <div :class="[$style.wrapper, {[$style.notCentered]: notCentered}, 'socialList']">
        <template v-if="share">
            <a :href="'http://www.facebook.com/sharer.php?u=' + currURL" :class="$style.socialLink" target="_blank" rel="noopener">
                <span class="icon-social-facebook"></span>
            </a>
            <a :href="'https://plus.google.com/share?url=' + currURL" :class="$style.socialLink" target="_blank" rel="noopener">
                <span class="icon-social-google"></span>
            </a>
            <a :href="'https://twitter.com/intent/tweet?text=' + title + '&amp;via=androidheadline&amp;related=androidheadline' + '&amp;url=' + currURL" :class="$style.socialLink" target="_blank" rel="noopener">
                <span class="icon-social-twitter"></span>
            </a>
            <a :href="'http://www.linkedin.com/shareArticle?mini=true&amp;url=' + currURL + '&amp;text=Check%20this%20out!&amp;hashtags=AndroidHeadlines'" :class="$style.socialLink" target="_blank" rel="noopener">
                <span class="icon-social-linkedin"></span>
            </a>
        </template>
        <a v-else v-for="(socialAccount, index) in socialAccounts" :key="index" :href="socialAccount.link" :class="$style.socialLink" target="_blank" rel="noopener">
            <span :class="socialAccount.icon"></span>
        </a>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        display: flex;
        justify-content: space-between;
        text-align: center;
        margin-bottom: 2rem;

        &.notCentered {
            text-align: left;
        }

        .socialLink {
            background: $color-primary;
            transition: all .25s ease-in-out;
            border-radius: 50%;
            width: 2.25rem;
            height: 2.25rem;
            color: $white;
            vertical-align: middle;
            line-height: 37px;

            &:hover, &:focus {
                background: darken($color-primary, 10%);
                transition: all .25s ease-in-out;
            }
        }
    }
</style>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [ clickaway ],
        props: {
            notCentered: {
                type: Boolean,
                default() {
                    return false
                }
            },
            footer: {
                type: Boolean,
                default() {
                    return false
                }
            },
            share: {
                type: Boolean,
                default() {
                    return false
                }
            },
            title: {
                type: String,
                default() {
                    return null
                }
            }
        },
        data() {
            return {
                opened: false,
                currURL: null,
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
        mounted() {
            this.currURL = encodeURIComponent(window.location.href)
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
