<template>
    <div :class="$style.wrapper">
        <template v-if="amp">
            <amp-iframe 
                width=600 
                height=140
                layout="responsive"
                sandbox="allow-scripts allow-same-origin allow-modals allow-popups allow-forms"
                resizable
                :src="$store.state.cdnUrl + '/disqus.html#' + identifier">
                <div overflow tabindex="0" role="button" aria-label="">Read more...</div>
            </amp-iframe>
        </template>
        <template v-else>
            <iframe 
                :class="$style.iframe"
                :style="iframeStyle"
                :id="id" 
                frameborder="0" 
                seamless="seamless"
                allowtransparency="true" 
                title="Comments"
                scrolling="no">
            </iframe>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        min-height: 20rem;

        .iframe {
            width: 100%;
        }
    }
</style>

<script>
    export default {
        props: {
            canonical: {
                type: String,
                default() {
                    if (typeof window !== 'undefined') {
                        return window.location.href
                    }

                    return null
                }
            },
            identifier: {
                type: String,
                default() {
                    return null
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                id: null,
                iframeContent: `
                    <html>
                        <body>
                            <div id="disqus_thread"></div>
                            <script>
                                var disqus_config = function () {
                                    this.page.url = window.location;
                                    this.page.identifier = '` + this.identifier + `';
                                };
                                (function() {  // DON'T EDIT BELOW THIS LINE
                                    var d = document, s = d.createElement('script');

                                    s.src = '//androidheadlines.disqus.com/embed.js';

                                    s.setAttribute('data-timestamp', +new Date());
                                    (d.head || d.body).appendChild(s);
                                })();
                            <\/script>
                        </body>
                    </html>
                `,
                iframeStyle: {
                    height: '20rem'
                }
            }
        },
        methods: {
            sizeIframe() {
                const iframe = document.getElementById(this.id)

                if (iframe) {
                    let doc
                    if (iframe.contentDocument) {
                        doc = iframe.contentDocument
                    } else {
                        doc = iframe.contentWindow.document
                    }
                    doc.open()
                    doc.write(this.iframeContent)
                    this.iframeStyle.height = (doc.body.scrollHeight + 300) + 'px'
                    doc.close()
                }
            }
        },
        mounted() {
            if (!this.id) {
                this.id = 'id-comments-' + Math.random().toString(36).substr(2, 16)
            }

            this.$nextTick(() => {
                this.sizeIframe()
            })
        }
    }
</script>