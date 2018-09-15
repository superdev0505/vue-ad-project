<script>
    import renderGallery from '~/renderers/gallery'
    import renderPoll from '~/renderers/poll'
    import renderYoutube from '~/renderers/youtube'
    import renderGoogleForm from '~/renderers/googleForm'
    import renderLink from '~/renderers/link'
    import renderSubscribe from '~/renderers/subscribe'
    import renderProductBtn from '~/renderers/productBtn'
    import renderCaption from '~/renderers/caption'
    import renderAd from '~/renderers/ad'
    import renderImage from '~/renderers/image'
    import renderTag from '~/renderers/tag'

    export default {
        props: {
            body: {
                type: Object
            },
            itemprop: {
                type: String
            },
            adParagraphCount: {
                type: Number,
                default: 1
            },
            adMax: {
                type: Number,
                default: 5
            },
            adNamespace: {
                type: String,
                default() {
                    return 'content'
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        methods: {
            renderChildren(nodes, createElement) {
                const elements = []
                const allowedTags = [
                    'table', 'thead', 'tfoot',
                    'caption', 'col', 'colgroup',
                    'tbody', 'tr', 'td', 
                    'th', 'div', 'dl',
                    'dd', 'dt', 'ul',
                    'ol', 'li', 'pre',
                    'select', 'option', 'form',
                    'map', 'area', 'blockquote',
                    'address', 'math', 'style',
                    'p', 'h1', 'hr',
                    'fieldset', 'noscript', 'samp',
                    'legend', 'section', 'article',
                    'aside', 'hgroup', 'header',
                    'footer', 'nav', 'figure',
                    'figcaption', 'details', 'menu',
                    'summary', 'strong', 'em',
                    'i', 'b', 'span',
                    'img', 'a', 'h2',
                    'h3', 'h4', 'h5',
                    'h6', 'br', 'center',
                    'iframe'
                ]
                const shortcodes = [
                    'gallery-shortcode',
                    'product-btn-shortcode',
                    'google-form-shortcode',
                    'caption-shortcode',
                    'youtube-shortcode',
                    'subscribe-shortcode',
                    'poll-shortcode'
                ]
                let pCount = 0
                let adsCount = 0
                for (let index in nodes) {
                    if (nodes.hasOwnProperty(index)) {
                        if (typeof nodes[index] === 'string' || nodes[index] instanceof String) {
                            elements.push(nodes[index])
                        } else {
                            if (allowedTags.indexOf(nodes[index].tag) !== -1) {
                                switch(nodes[index].tag) {
                                    case 'a':
                                        elements.push(renderLink(this, nodes[index], createElement))
                                        break;
                                    case 'p':
                                        if (JSON.stringify(nodes[index]).length > 500) {
                                            if (pCount === this.adParagraphCount) {
                                                if (adsCount < this.adMax) {
                                                    elements.push(renderAd(this, createElement, adsCount))
                                                    adsCount++
                                                }
                                                pCount = 1
                                            } else {
                                                pCount++
                                            }
                                        }
                                        elements.push(renderTag(this, nodes[index], createElement))
                                        break;
                                    case 'img':
                                        elements.push(renderImage(this, nodes[index], createElement))
                                        break;
                                    default:
                                        elements.push(renderTag(this, nodes[index], createElement))
                                        break;
                                }
                            } else if (shortcodes.indexOf(nodes[index].tag) !== -1) {
                                switch(nodes[index].tag) {
                                    case 'gallery-shortcode':
                                        elements.push(renderGallery(this, nodes[index], createElement))
                                        break;
                                    case 'product-btn-shortcode':
                                        elements.push(renderProductBtn(this, nodes[index], createElement))
                                        break;
                                    case 'google-form-shortcode':
                                        elements.push(renderGoogleForm(this, nodes[index], createElement))
                                        break;
                                    case 'caption-shortcode':
                                        elements.push(renderCaption(this, nodes[index], createElement))
                                        break;
                                    case 'youtube-shortcode':
                                        elements.push(renderYoutube(this, nodes[index], createElement))
                                        break;
                                    case 'subscribe-shortcode':
                                        elements.push(renderSubscribe(this, nodes[index], createElement))
                                        break;
                                    case 'poll-shortcode':
                                        elements.push(renderPoll(this, nodes[index], createElement))
                                        break;
                                }
                            }
                        }
                    }
                }
                return elements
            }
        },
        render(createElement) {
            const rootProps = {}
            if (this.itemprop) {
                rootProps['itemprop'] = this.itemprop
            }

            let tag = this.body.tag
            if (tag) {
                let content = ''
                if (tag = 'body') {
                    tag = 'div'
                }
                if (this.body.children) {
                    content = this.renderChildren(this.body.children, createElement)
                }
                return createElement(tag, { attrs: rootProps }, content)
            }

            return createElement('div', { attrs: rootProps }, '')
        }
    }
</script>