<template>
    <div :class="$style.wrapper">
        <ad-block center name="author.header" :class="$style.mobileOnly"/>
        <div :class="$style.contentBody">
            <div :class="$style.left">
                <h1>Meet Our Team</h1>                
                <div v-for="(item, index) in authors.data" :key="index" v-if="item.recent">
                    <author-list-block :author="item"></author-list-block>
                </div>
            </div>
            <div :class="[$style.right, $style.desktopOnly]"  v-if="!$store.state.isMobile">
                <sidebar-block :content="sidebar" ad-namespace="author.sidebar"></sidebar-block>
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
            padding: 1rem 1.5rem;

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
                    padding-right: 3rem;
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

    export default {
        layout: 'authors',
        async asyncData({ params, app, error }) {
            const response = await app.$axios.$get('v1/authors')
            return response
        },
        head() {
            return this.meta.seo
        },
        components: {
            AdBlock,
            AuthorListBlock,
            SidebarBlock
        }
    }
</script>
