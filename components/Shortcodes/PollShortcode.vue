<template>
    <div :class="$style.wrapper">
        <iframe
            v-if="!amp"
            class="lazyload"
            :id="frameId"
            :style="iframeStyle"
            frameborder="0"
            seamless="seamless"
            allowtransparency="true"
            title="Poll"
            scrolling="no">
        </iframe>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0 auto;
    }
</style>

<script>
    export default {
        props: {
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            },
            type: {
                type: String,
                default() {
                    return 'playbuzz'
                }
            },
            id: {
                type: String,
                default() {
                    return null
                }
            },
            showInfo: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                frameId: null,
                iframeStyle: {
                    width: '100%',
                    height: '20rem'
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
                    doc.open()
                    if (this.type === 'playbuzz') {
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
                                    <script>(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src='https://embed.playbuzz.com/sdk.js';fjs.parentNode.insertBefore(js,fjs);}(document,'script','playbuzz-sdk'));<\/script>
                                    <div class="playbuzz" data-id="` + this.id + `" data-show-info="` + (this.showInfo ? 'true' : 'false') + `"></div>
                                </body>
                            </html>
                        `)
                        this.setHeight = setInterval(() => {
                            if (doc.getElementsByTagName('iframe').length) {
                                this.iframeStyle.height = doc.body.scrollHeight + 'px'
                            }
                        }, 100)
                    }
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
                this.frameId = 'id-poll-' + Math.random().toString(36).substr(2, 16)
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
