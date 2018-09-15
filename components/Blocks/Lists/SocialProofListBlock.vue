<template>
    <div :class="[$style.wrapper, {[$style.notCentered]: notCentered}, 'socialList']">
        <div v-for="(socialAccount, index) in socialAccounts" :key="index" :class="$style.row">
            <a :key="index" :href="socialAccount.link" :class="$style.socialLink" target="_blank" rel="noopener">
                <span :class="socialAccount.icon"></span>
            </a>
            <span :class="$style.proof">{{ socialAccount.count }}</span>
        </div>
    </div>
</template>


<style lang="scss" module>
    .wrapper {
        column-count: 2;
        margin-bottom: 1.5rem;

        .row {
            margin-bottom: 0.75em;
        }

        .proof {
            margin-left: 0.5em;
            max-width: 6em;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
        }

        &.notCentered {
            text-align: left;
        }

        .socialLink {
            display: inline-block;
            background: $color-primary;
            transition: all .25s ease-in-out;
            border-radius: 50%;
            width: 2.25rem;
            height: 2.25rem;
            color: $white;
            vertical-align: middle;
            line-height: 37px;
            text-align: center;

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
        mixins: [clickaway],
        props: {
            notCentered: {
                type: Boolean,
                default() {
                    return false
                }
            },
            footer: {
                type: Boolean,
                default () {
                    return false
                }
            }
        },
        data () {
            return {
                opened: false,
                socialAccounts: [
                    {
                        link: 'https://www.facebook.com/Androidheadline/',
                        icon: 'icon-social-facebook',
                        count: this.$store.state.socialCount.facebook.numbers
                    },
                    {
                        link: 'https://plus.google.com/102014810775752690796',
                        icon: 'icon-social-google',
                        count: this.$store.state.socialCount.google.numbers
                    },
                    {
                        link: 'https://twitter.com/Androidheadline',
                        icon: 'icon-social-twitter',
                        count: this.$store.state.socialCount.twitter.numbers
                    },
                    {
                        link: 'https://www.youtube.com/user/androidheadlines',
                        icon: 'icon-social-youtube',
                        count: this.$store.state.socialCount.youtube.numbers
                    },
                    {
                        link: 'https://www.instagram.com/androidheadline/',
                        icon: 'icon-social-instagram',
                        count: this.$store.state.socialCount.instagram.numbers
                    },
                    {
                        link: 'https://www.linkedin.com/company/android-headlines/',
                        icon: 'icon-social-linkedin',
                        count: this.$store.state.socialCount.linkedin.numbers
                    },
                    {
                        link: 'https://www.androidheadlines.com/feed',
                        icon: 'icon-social-rss',
                        count: this.$store.state.socialCount.rss.numbers
                    }
                ]
            }
        },
        methods: {
            toggle () {
                this.opened = !this.opened
            },
            toggleAway () {
                this.opened = false
            }
        }
    }
</script>