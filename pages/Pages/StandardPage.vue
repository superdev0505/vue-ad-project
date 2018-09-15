<template>
    <div :class="[$style.wrapper, 'secondaryPage']">
        <ad-block center name="page.header" :class="$style.mobileOnly"/>
        <div :class="$style.contentBody">
            <div :class="$style.left">
                <h1>{{ title }}</h1>
                <content-block
                    :ad-paragraph-count="0"
                    :ad-max="0"
                    :body="content"
                    :class="$style.pageContent" />
            </div>
            <div :class="$style.right">
                <sidebar-block :content="sidebar" ad-namespace="page.sidebar"></sidebar-block>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>

    // all styles
    .wrapper {
        padding: 6em 1rem;

        .contentBody {
            width: auto;
            display: flex;
            justify-content: space-between;
            flex-direction: row;

            a {
                font-weight: bold;
            }

            .left {
                width: 100%;
                .pageContent {
                    margin-bottom: 3em;

                    a {
                        font-weight: bold;
                    }

                    img {
                        box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
                        border: 1px solid #EEE;
                    }

                    ul {
                        -webkit-padding-start: 40px;
                        -webkit-margin-before: 1em;
                        -webkit-margin-after: 1em;
                        li {
                            font-family: $second-font-family;
                            font-size: 1.125rem;
                            line-height: 1.75;
                            font-weight: 300 !important;
                            list-style: disc;
                            @include media(">=tablet") {
                                font-size: 1.125rem;
                                line-height: 1.9;
                            }
                            @include media(">desktop") {
                                font-size: 1.25rem;
                                line-height: 2;
                            }

                            span {
                                font-weight: 300 !important;
                            }
                        }
                    }
                }
            }

            .right {
                display: none;
            }

        }
    }

    //tablet and up
    @include media(">=tablet") {
        .wrapper {
            padding: 1.5rem;

            .mobileOnly {
                display: none;
            }

            .contentBody {
                .left {
                  width: auto;
                }

            }

        }

    }
    // desktop and up
    @include media(">=desktop") {

        .wrapper {
            padding: 1rem;

            .contentBody {
                .left {
                    width: -moz-calc(100% - 332px);
                    width: -webkit-calc(100% - 332px);
                    width: calc(100% - 332px);
                    align-self: flex-start;
                    // padding-right: 1rem;
                }
                .right {
                    display: block;
                    flex: 300px;
                    max-width: 300px;
                    width: 300px;
                }
            }
        }
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'
    import ContentBlock from '~/components/Blocks/ContentBlock'
    import SidebarBlock from '~/components/Blocks/SidebarBlock'

    export default {
        layout: 'page',
        async asyncData({ params, app, error, query }) {
            if (!params.permalink.length) {
                return error({
                    statusCode: 404,
                    message: 'Page Not Found'
                })
            }

            const response = await app.$axios.$get('v1/pages/' + Buffer.from(params.permalink).toString('base64') + (query.draft ? '?draft=' + query.draft : ''))
            if (response.error) {
                return error({
                    statusCode: 404,
                    message: 'Page Not Found'
                })
            }
            return response
        },
        head() {
            return this.meta.seo
        },
        components: {
            AdBlock,
            ContentBlock,
            SidebarBlock
        }
    }
</script>
