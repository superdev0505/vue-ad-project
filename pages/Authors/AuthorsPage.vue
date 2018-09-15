<template>
    <div :class="$style.wrapper">
        <ad-block center name="author.header" :class="$style.mobileOnly"/>
        <div :class="$style.contentBody">
            <div :class="$style.left">
                <author-list-block :author="item"></author-list-block>
                <author-news-list-block ad-namespace="authors.posts" :items="item.posts.data" title="Articles Written By This Author" />
            </div>
            <div :class="$style.right">
                <sidebar-block :content="item.sidebar" ad-namespace="author.sidebar"></sidebar-block>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    // base styles
    .wrapper {
        padding: 6rem 1rem 0rem;

        .featured {
            display: block;
            height: auto;
        }

        .contentBody {
            width: auto;
            display: flex;
            justify-content: space-between;
            flex-direction: row;

            .left {
                flex: 1;
                width: auto;
            }

            .right {
                display: none;
            }

        }

    }
    //tablet and up
    @include media(">=tablet") {

        .wrapper {
            padding: 1rem;

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

            .contentBody {

                .left {
                    padding-right: 1rem;
                    width: calc(100% - 316px);
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
    import AuthorListBlock from '~/components/Blocks/Lists/AuthorListBlock'
    import SidebarBlock from '~/components/Blocks/SidebarBlock'
    import AuthorNewsListBlock from '~/components/Blocks/Lists/AuthorNewsListBlock'

    export default {
        layout: 'authors',
        async asyncData({ params, app, error }) {
            const response = await app.$axios.$get('v1/authors/' + params.slug)
            return {
              item: response
            }
        },
        head() {
            return this.item.meta.seo
        },
        components: {
            AdBlock,
            AuthorListBlock,
            SidebarBlock,
            AuthorNewsListBlock
        }
    }
</script>
