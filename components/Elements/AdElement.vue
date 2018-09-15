<template>
    <div :class="$style.wrapper">
        <div :class="$style.label" v-if="$store.state.ads.console && name && bucket.size">{{ name }} - {{ bucket.size }}</div>
        <template v-if="!amp">
            <div v-if="$store.state.ads.provider !== 'ziffdavis'" :class="$style.ad" :ref="id" :id="id + '_container'">
                <iframe
                    :style="adStyle"
                    :id="id"
                    title="Advertisement"
                    frameborder="0"
                    seamless="seamless"
                    allowtransparency="true"
                    scrolling="no">
                </iframe>
            </div>
            <div v-else :id="id + '_container'" :class="$style.ad" :ref="id"></div>
        </template>
        <template v-else>
            <amp-ad
                v-if="$store.state.ads.provider !== 'placeholder'"
                type="doubleclick"
                :width="adStyle.width"
                :height="adStyle.height"
                :style="{width: adStyle.width + 'px', height: adStyle.height + 'px'}"
                :data-slot="'/' + bucket.account + '/' + bucket.ad_name">
            </amp-ad>
            <div v-else>
                <amp-img
                    :width="adStyle.width"
                    :height="adStyle.height"
                    :src="'http://placehold.it/' + adStyle.width + 'x' + adStyle.height"
                    :style="{width: adStyle.width + 'px', height: adStyle.height + 'px'}"
                    layout="responsive">
                </amp-img>
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;
        position: relative;

        .ad iframe {
            background: #EEE;
        }

        .label {
            position: absolute;
            top: 0;
            left: 0;
            background: $white;
            color: $black;
            border: 1px solid $black;
            font-size: 0.8rem;
            display: inline-block;
            padding: 0.1rem;
            z-index: 1;
        }
    }
</style>

<script>
    export default {
        props: {
            name: {
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
            },
            ampCall: {
                type: Number,
                default() {
                    return 1
                }
            }
        },
        data() {
            return {
                id: null,
                ziffDavisAdSize: null,
                ziffDavisIsLoaded: false,
                reloadCount: 0,
                bucket: {
                    ad_name: null,
                    size: null
                },
                adStyle: {
                    width: 0,
                    height: '90px'
                }
            }
        },
        methods: {
            getIframeContent(provider, dimensions) {
                const useSSL = 'https:' == document.location.protocol
                const contents = {
                    doubleclick: `
                        <html>
                            <head>
                                <style type="text/css">
                                    html, body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                </style>
                                <script type="text/javascript" async src="` + useSSL + `//www.googletagservices.com/tag/js/gpt.js"><\/script>
                            </head>
                            <body>
                                <div id="ad-slot"></div>
                                <script type="text/javascript">
                                    if (typeof googletag !== 'undefined') {
                                        window.googletag = googletag
                                    } else {
                                        window.googletag = {}
                                    }
                                    if (googletag.cmd) {
                                        window.googletag.cmd = googletag.cmd
                                    } else {
                                        window.googletag.cmd = []
                                    }
                                    window.googletag.defineSlot('/` + this.$store.state.ads.account + `/` + this.bucket.ad_name + `', [` + dimensions.width + `, ` + dimensions.height + `], 'ad-slot')
                                <\/script>
                            </body>
                        </html>
                    `,
                    pubgalaxy: `
                        <html>
                            <head>
                                <style type="text/css">
                                    html, body {
                                        margin: 0;
                                        padding: 0;
                                    }
                                </style>

                                <script type="text/javascript" async src="` + (useSSL ? 'https:' : 'http:') + `//www.googletagservices.com/tag/js/gpt.js"><\/script>
                                <script type="text/javascript" src="` + (useSSL ? 'https:' : 'http:') + `//dsh7ky7308k4b.cloudfront.net/publishers/androidheadlinescom.min.js"><\/script>

                                <script type="text/javascript">
                                    if (typeof googletag !== 'undefined') {
                                        window.googletag = googletag
                                    } else {
                                        window.googletag = {}
                                    }
                                    if (googletag.cmd) {
                                        window.googletag.cmd = googletag.cmd
                                    } else {
                                        window.googletag.cmd = []
                                    }
                                    googletag.cmd.push(function() {
                                        window.googletag.defineSlot('/` + this.$store.state.ads.account + `/.2_` + this.bucket.slot + `_androidheadlines.com_tier1', [` + dimensions.width + `, ` + dimensions.height + `], 'ad-slot').addService(googletag.pubads());
                                        googletag.enableServices();
                                    });
                                <\/script>
                            </head>
                            <body>
                                <div id="ad-slot" style="width:` + dimensions.width + `px, height:` + dimensions.height + `px">
                                    <script>
                                        googletag.cmd.push(function() { googletag.display('ad-slot'); });
                                    <\/script>
                                </div>
                            </body>
                        </html>
                    `,
                    placeholder: `
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
                                <img src="` + (useSSL ? 'https:' : 'http:') + `//placehold.it/` + dimensions.width + `x` + dimensions.height + `" />
                            </body>
                        </html>
                    `
                }
                return contents[provider]
            },
            convertZiffDavisAdSize(size) {
                //https://support.google.com/adsense/answer/9739?hl=en
                switch (size) {
                    case 'leaderboard':
                    case 'banner':
                    case 'half_banner':
                    case 'button':
                    case 'skyscraper':
                    case 'wide_skyscraper':
                    case 'small_rectangle':
                    case 'vertical_banner':
                    case 'small_square':
                    case 'square':
                    case 'large_rectangle':
                    case 'portrait':
                    case 'mobile_banner':
                    case 'large_leaderboard':
                    case 'billboard':
                        return size;
                        break;
                    case 'half_page':
                        return 'halfpage';
                        break;
                    case 'medium_rectangle':
                    default:
                        return 'rectangle';
                        break;
                }
            },
            getDimensions(size) {
                //https://support.google.com/adsense/answer/9739?hl=en
                switch (size) {
                    case 'leaderboard': return {width: 728, height: 90}; break;
                    case 'banner': return {width: 468, height: 60}; break;
                    case 'half_banner': return {width: 234, height: 60}; break;
                    case 'button': return {width: 125, height: 125}; break;
                    case 'skyscraper': return {width: 120, height: 600}; break;
                    case 'wide_skyscraper': return {width: 160, height: 600}; break;
                    case 'small_rectangle': return {width: 180, height: 150}; break;
                    case 'vertical_banner': return {width: 120, height: 240}; break;
                    case 'small_square': return {width: 200, height: 200}; break;
                    case 'square': return {width: 250, height: 250}; break;
                    case 'medium_rectangle': default: return {width: 300, height: 250}; break;
                    case 'large_rectangle': return {width: 336, height: 280}; break;
                    case 'half_page': return {width: 300, height: 600}; break;
                    case 'portrait': return {width: 300, height: 1050}; break;
                    case 'mobile_banner': return {width: 320, height: 50}; break;
                    case 'large_leaderboard': return {width: 970, height: 90}; break;
                    case 'billboard': return {width: 970, height: 250}; break;
                }
            },
            getBucket() {
                const target = this.name.split('.')
                const map = this.$store.state.ads.map

                if (!this.amp) {
                    if (target.length === 3) {
                        if (map[target[0]]) {
                            if (map[target[0]][target[1]]) {
                                if (map[target[0]][target[1]][target[2]]) {
                                    if (this.$store.state.ads.bucket[map[target[0]][target[1]][target[2]]]) {
                                        return this.$store.state.ads.bucket[map[target[0]][target[1]][target[2]]]
                                    }
                                }
                            }
                        }
                    }
                } else {
                    const bucket = {}
                    bucket.account = 8095840
                    switch (this.ampCall) {
                        case 1: bucket.ad_name = '.2_6676.4_androidheadlines.com_tier1'; break;
                        case 2: bucket.ad_name = '.2_6677.4_androidheadlines.com_tier1'; break;
                        case 3: bucket.ad_name = '.2_6678.4_androidheadlines.com_tier1'; break;
                        default: bucket.ad_name = '.2_6676.4_androidheadlines.com_tier1'; break;
                    }
                    bucket.ad_name = '.2_6676.4_androidheadlines.com_tier1'
                    bucket.size = 'medium_rectangle'
                    // '.2_6675.5_androidheadlines.com_tier1' //300x50
                    // '.2_6677.4_androidheadlines.com_tier1'
                    // '.2_6678.4_androidheadlines.com_tier1'
                    return bucket
                }

                return {
                    account: null,
                    ad_name: null,
                    size: 'medium_rectangle'
                }
            },
            buildIframe() {
                const provider = this.$store.state.ads.provider
                const iframe = document.getElementById(this.id)
                this.bucket = this.getBucket()

                const dimensions = this.getDimensions(this.bucket.size)
                this.adStyle.width = dimensions.width + 'px'
                this.adStyle.height = dimensions.height + 'px'

                if (iframe) {
                    let doc
                    if (iframe.contentDocument) {
                        doc = iframe.contentDocument
                    } else {
                        doc = iframe.contentWindow.document
                    }
                    doc.open()
                    doc.write(this.getIframeContent(provider, dimensions))
                    doc.close()
                }
            },
            buildAmp() {
                this.bucket = this.getBucket()

                const dimensions = this.getDimensions(this.bucket.size)
                this.adStyle.width = dimensions.width
                this.adStyle.height = dimensions.height
            },
            buildZiffDavis() {
                if (window.NSGPT) {
                    this.bucket = this.getBucket()
                    this.ziffDavisAdSize = this.convertZiffDavisAdSize(this.bucket.size)
                    this.$nextTick(() => {
                        if (document.getElementById(this.id + '_container') && !this.ziffDavisIsLoaded) {
                            window.NSGPT.renderNewAdslot(this.id + '_container', this.ziffDavisAdSize)
                            this.ziffDavisIsLoaded = true
                        }
                    })
                } else {
                    setTimeout(() => {
                        if (this.reloadCount < 10) {
                            this.reloadCount = this.reloadCount + 1
                            this.buildZiffDavis()
                        }
                    }, 100)
                }
            },
            build() {
                if (this.$store.state.ads.provider !== 'ziffdavis') {
                    this.buildIframe()
                } else {
                    this.buildZiffDavis()
                }
            },
            killZiffDavisAd() {
                if (window.googletag) {
                    window.googletag.destroySlots(this.$refs[this.id]._gptSlot)
                    this.$refs[this.id]._gptSlot = null
                    this.$refs[this.id]._gptCollapse = null
                    this.$refs[this.id]._gptRendered = null
                    this.$refs[this.id]._adoptimization = null
                    this.$refs[this.id]._prebidding = null
                    this.$refs[this.id]._nsgptRendered = null
                    this.$refs[this.id]._nsgptViewable = null
                    this.$refs[this.id]._nsSlotName = null
                    this.$refs[this.id]._nsgptNumRendered = null
                    this.$refs[this.id]._refreshOnViewableTimeout && clearTimeout(this.$refs[this.id]._refreshOnViewableTimeout)
                    this.$refs[this.id]._refreshOnRenderedTimeout && clearTimeout(this.$refs[this.id]._refreshOnRenderedTimeout)
                    this.$refs[this.id]._nsgptWatchdog && clearTimeout(this.$refs[this.id]._nsgptWatchdog)
                    this.$refs[this.id]._refreshOnViewableTimeout = null
                    this.$refs[this.id]._refreshOnRenderedTimeout = null
                    this.$refs[this.id]._nsgptWatchdog = null
                    this.$refs[this.id]._nsgptTimeouts = null
                    this.$refs[this.id]._refreshOnViewableOverride = null
                    const children = this.$refs[this.id].children
                    for (let i = 0; i < this.$refs[this.id].length; i++) {
                        if (children[i]) {
                            children[i].parentNode.removeChild(children[i])
                        }
                    }
                    this.$refs[this.id].innerHTML = ''
                } else {
                    this.$refs[this.id].innerHTML = ''
                }
            }
        },
        created() {
            if (!this.id) {
                this.id = 'id-ads-' + Math.random().toString(36).substr(2, 16)
            }

            if (this.amp) {
                this.buildAmp()
            }
        },
        mounted() {
            if (!this.amp) {
                this.build()
            }
        },
        beforeDestroy() {
            if (this.$store.state.ads.provider === 'ziffdavis') {
                if (window.NSGPT) {
                    if (this.$refs[this.id] && this.ziffDavisIsLoaded) {
                        try {
                            window.NSGPT.killAdslot(this.id + '_container')
                        } catch (error) {
                            console.log(error)
                        }
                        //this.killZiffDavisAd()
                    }
                }
            }
        }
    }
</script>
