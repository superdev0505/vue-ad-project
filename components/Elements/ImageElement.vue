<script>
    export default {
        props: {
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            },
            lazy: {
                type: Boolean,
                default() {
                    return true
                }
            },
            fit: {
                type: String,
                default() {
                    return null
                }
            },
            overlay: {
                type: String,
                default() {
                    return null
                }
            },
            obj: {
                type: Object,
                default() {
                    return {}
                }
            },
            src: {
                type: String,
                default() {
                    return null
                }
            },
            width: {
                type: String,
                default() {
                    return '200'
                }
            },
            height: {
                type: String,
                default() {
                    return '200'
                }
            },
            srcset: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            let directives = []
            if (this.overlay) {
                if (this.obj) {
                    directives.push({
                        name: 'img',
                        value: {
                            src: this.obj.source_url,
                            group: this.overlay
                        }
                    })
                }
            }
            return {
                elem: {
                    directives: directives,
                    class: [],
                    attrs: {},
                    style: {}
                },
                img: {
                    alt: null,
                    src: null,
                    width: null,
                    height: null,
                    srcset: null
                }
            }
        },
        methods: {
            buildImage() {
                if (this.obj.media_details) {
                    if (this.obj.alt_text) {
                        this.img.alt = this.obj.alt_text
                    } else {
                        this.img.alt = this.obj.media_details.file
                    }
                    this.img.src = this.obj.source_url
                    this.img.width = this.obj.media_details.width
                    this.img.height = this.obj.media_details.height

                    if (this.obj.media_details.sizes) {
                        if (this.obj.media_details.sizes.thumbnail) {
                            this.img.src = this.obj.media_details.sizes.thumbnail.source_url
                            this.img.width = this.obj.media_details.sizes.thumbnail.width
                            this.img.height = this.obj.media_details.sizes.thumbnail.height
                        }
                        let srcset = []
                        for (let index in this.obj.media_details.sizes) {
                            if (this.obj.media_details.sizes.hasOwnProperty(index)) {
                                srcset.push(
                                    this.obj.media_details.sizes[index].source_url +
                                    ' ' +
                                    this.obj.media_details.sizes[index].width + 'w' +
                                    ' ' +
                                    this.obj.media_details.sizes[index].height + 'h'
                                )
                            }
                        }
                        this.img.srcset = srcset.join(', ')
                    }
                } else {
                    if (this.src) {
                        this.img.src = this.src
                    }

                    if (this.srcset.length) {
                        let src = null
                        let srcset = []
                        for (let i = 0; i < this.srcset.length; i++) {
                            src = this.srcset[i].split(' ')
                            srcset.push(src[0] + ' ' + src[1])
                        }
                        this.img.srcset = srcset.join(', ')
                    }
                }
            },
            buildAmp() {
                this.elem.attrs.src = this.img.src
                this.elem.attrs.layout = 'responsive'
                this.elem.attrs.width = this.img.width ? this.img.width : parseInt(this.width)
                this.elem.attrs.height = this.img.height ? this.img.height : parseInt(this.height)

                if (this.fit) {
                    this.elem.style.position = 'absolute'
                    this.elem.style['object-fit'] = this.fit
                    this.elem.style['object-position'] = '50% 50%'
                    this.elem.style.top = 0
                    this.elem.style.left = 0
                    this.elem.style.width = '100%'
                    this.elem.style.height = '100%'
                }

                if (this.img.srcset) {
                    this.elem.attrs.srcset = this.img.srcset
                    // this.elem.attrs.sizes = '(min-width: 650px) 100vw, 100vw'
                    // this.elem.attrs.sizes = '640px'
                }
            },
            buildLazy() {
                this.elem.class.push('lazyload')
                //attrs.src = this.img.src
                //attrs['data-src'] = this.img.src
                //attrs['data-src'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                if (this.img.srcset) {
                    //attrs.srcset = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    this.elem.attrs['data-srcset'] = this.img.srcset
                    this.elem.attrs['data-sizes'] = 'auto'
                    if (!this.fit) {
                        this.elem.attrs['data-parent-fit'] = 'width'
                    }
                }
                if (this.fit) {
                    this.elem.style.position = 'absolute'
                    this.elem.style['object-fit'] = this.fit
                    this.elem.style['object-position'] = '50% 50%'
                    this.elem.style.top = 0
                    this.elem.style.left = 0
                    this.elem.style.width = '100%'
                    this.elem.style.height = '100%'
                }
            },
            buildDefault() {
                this.elem.attrs.src = this.img.src
                if (this.img.srcset) {
                    this.elem.attrs.srcset = this.img.srcset
                    this.elem.attrs.sizes = '(min-width: 320px) and (max-width: 768px) 320px, (min-width: 768px) and (max-width: 1024px) 768px, (min-width: 1024px) and (max-width: 1280px) 1024px, 100vw'
                    this.elem.style.width = '100%'
                }
                if (this.fit) {
                    this.elem.style.position = 'absolute'
                    this.elem.style['object-fit'] = this.fit
                    this.elem.style['object-position'] = '50% 50%'
                    this.elem.style.top = 0
                    this.elem.style.left = 0
                    this.elem.style.width = '100%'
                    this.elem.style.height = '100%'
                }
            }
        },
        created() {
            this.buildImage()

            this.elem.attrs.alt = this.img.alt
            this.elem.style.border = 'none'

            if (this.img.width > this.img.height) {
                this.elem.class.push('horizontal')
            } else if (this.img.width < this.img.height) {
                this.elem.class.push('vertical')
            } else if (this.img.width == this.img.height) {
                this.elem.class.push('square')
            }

            if (this.amp) {
                this.buildAmp()
            } else {
                if (this.lazy && this.obj.media_details) {
                    this.elem.attrs.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
                    //this.buildLazy()
                } else {
                    this.buildDefault()
                }
            }
        },
        mounted() {
            if (this.lazy) {
                this.buildLazy()
                if (window.lazySizes) {
                    this.$nextTick(() => {
                        if (window.imageSizes) {
                            clearTimeout(window.imageSizes)
                        }
                        window.imageSizes = setTimeout(() => {
                            window.lazySizes.autoSizer.checkElems()
                        }, 0)
                    })
                }
                // Force trigger full screen galleries
                // if (this.overlay) {
                //     if (window.clickTimeout) {
                //         clearTimeout(window.clickTimeout)
                //     }
                //     window.clickTimeout = setTimeout(() => {
                //         this.$el.click()
                //     }, 2000)
                // }
            }
        },
        render(createElement) {
            return createElement(this.amp ? 'amp-img' : 'img', Object.assign({}, this.elem))
        }
    }
</script>
