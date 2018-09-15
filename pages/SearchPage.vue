<template>
    <div :class="$style.wrapper">
        <ad-block center name="search.header" :class="$style.mobileOnly"/>
        <h1>Search Results</h1>
        <main>
            <iframe
                :class="$style.iframe"
                :style="iframeStyle"
                :id="id"
                :src="'/cse.html?s=' + search + '#' + account"
                frameborder="0"
                allowtransparency="true"
                scrolling="no">
            </iframe>
        </main>
    </div>
</template>

<style lang="scss" module>

    //all styles
    .wrapper {
        margin: 0;
        padding: 6rem 1em 0;

        .iframe {
            width: 100%;
        }
    }

    //tablet and up
    @include media('>=tablet') {

        .wrapper {
            padding: 1.5rem;

            .mobileOnly {
                display: none;
            }
        }
    }
</style>

<script>
    import AdBlock from '~/components/Blocks/AdBlock'

    export default {
        layout: 'fullwidth',
        async asyncData({ params, app, route, error }) {
            return {
                id: 'id-search-' + Math.random().toString(36).substr(2, 16),
                search: route.query.s ? route.query.s : '',
                account: app.store.state.search.google.cse,
                iframeStyle: {
                    height: '20rem'
                },
                iframeInterval: null
            }
        },
        methods: {
            checkIframe() {
                if (document.getElementById(this.id)) {
                    this.iframeStyle.height = document.getElementById(this.id).contentWindow.document.body.scrollHeight + 'px'
                }
            }
        },
        mounted() {
            if (document.getElementById(this.id)) {
                document.getElementById(this.id).contentWindow.location.reload()
                document.getElementById(this.id).contentWindow.document.close()
            }
            this.iframeInterval = setInterval(() => {
                this.checkIframe()
            }, 500)
        },
        beforeDestroy() {
            clearInterval(this.iframeInterval)
        },
        watch: {
            search() {
                if (document.getElementById(this.id)) {
                    document.getElementById(this.id).contentWindow.location.reload()
                    document.getElementById(this.id).contentWindow.document.close()
                }
            },
            '$route'() {
                this.search = this.$route.query.s ? this.$route.query.s : ''
            }
        },
        components: {
            AdBlock
        }
    }
</script>
