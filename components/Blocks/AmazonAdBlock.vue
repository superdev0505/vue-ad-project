<template>
    <div :class="$style.wrapper">
        <iframe :class="$style.iframe" :id="id" frameborder="0" allowtransparency="true" scrolling="no" title="Amazon" seamless="seamless"></iframe> 
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        display: block;

        .iframe {
            width: 100%;
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                id: null,
                iframeTemplate: `
                    <html>
                        <body>
                            <div id="amzn-assoc-ad-ebf711a4-1d4c-499a-95e5-fe8f5bb109d7"></div>
                            <script async src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=ebf711a4-1d4c-499a-95e5-fe8f5bb109d7">'
                            <\/script>
                        </body>
                    </html>
                `
            }
        },
        methods: {
            renderIframe() {
                const iframe = document.getElementById(this.id)

                if (iframe) {
                    let doc
                    if (iframe.contentDocument) {
                        doc = iframe.contentDocument
                    } else {
                        doc = iframe.contentWindow.document
                    }
                    doc.open()
                    doc.write(this.iframeTemplate)
                    doc.close()
                }
            }
        },
        mounted() {
            this.id = 'id-amazon-' + Math.random().toString(36).substr(2, 16)
            this.$nextTick(() => {
                this.renderIframe()
            })
        }
    }
</script>
