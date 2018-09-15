<template>
    <div>
        <iframe
            :amp="amp"
            :id="frameId"
            :style="iframeStyle"
            class="lazyload"
            frameborder="0"
            title="Form"
            marginheight="0"
            marginwidth="0"
            seamless="seamless">
            Loading...
        </iframe>
        <amp-iframe
            v-if="amp"
            :amp="amp"
            width="100%"
            height="1000"
            sandbox="allow-scripts allow-same-origin"
            layout="responsive"
            frameborder="0"
            :src="link">
        </amp-iframe>
    </div>
</template>

<script>
    export default {
        props: {
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            },
            link: {
                type: String,
                default() {
                    return ''
                }
            },
            height: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        data() {
            return {
                frameId: null,
                iframeStyle: {
                    width: '100%',
                    height: this.height + 'px'
                },
                setHeight: null
            }
        },
        methods: {
            buildIframe() {
                const iframe = document.getElementById(this.frameId)
                if (iframe) {
                let doc
                if (iframe.contentDocument) {
                    doc = iframe.contentDocument
                } else {
                    doc = iframe.contentWindow.document
                }
                doc.open();
                    doc.write(`
                        <html>
                            <head>
                                <style type="text/css">
                                    html, body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                </style>
                            </head>
                            <body>
                                <iframe src="` + this.link + `" width="100%" height="` + this.height + `" frameborder="0" title="Form" marginheight="0" marginwidth="0" seamless="seamless">Loading...</iframe>
                            </body>
                        </html>
                    `)
                doc.close()
                }
            },
            lazy(e) {
                if (e.target.id === this.frameId) {
                    this.buildIframe()
                }
            }
        },
        created() {
            if (!this.frameId) {
                this.frameId = 'id-gform-' + Math.random().toString(36).substr(2, 16)
            }
        },
        mounted() {
            if (!this.amp) {
                this.$nextTick(() => {
                    document.addEventListener('lazybeforeunveil', e => {
                        this.lazy(e)
                    })
                })
            }
        },
        beforeDestroy() {
            clearInterval(this.setHeight)
            document.removeEventListener('lazybeforeunveil', e => {
                this.lazy(e)
            })
        }
    }
</script>
