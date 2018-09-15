const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins')

require('dotenv').config()

const AMP = function () {
    const scripts = [
        '<script async src="https://cdn.ampproject.org/v0.js"></script>',
        '<script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script>',
        '<script async custom-element="amp-accordion" src="https://cdn.ampproject.org/v0/amp-accordion-0.1.js"></script>',
        '<script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>',
        '<script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>',
        '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>',
        '<script async custom-element="amp-iframe" src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"></script>',
        '<script async custom-element="amp-lightbox-gallery" src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"></script>',
        '<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"></script>',
        '<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>'
    ]
    const styles = [
        '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'
    ]

    this.setScript = function (script) {
        scripts.push(script)
    }

    this.getScripts = function () {
        return scripts.reduce((tags, tag) => {
            return tags + tag
        })
    }
    this.getStyles = function () {
        return styles.reduce((tags, tag) => {
            return tags + tag
        })
    }

    this.transform = function (html) {
        const schemaMatch = html.match(/<script[^>]*type=\"application\/ld\+json\"[^>]*>.*?<\/script>/i)
        if (schemaMatch.length) {
            this.setScript(schemaMatch[0])
        }
        // Add amp tag to html
        html = html.replace(/<html/g, '<html amp')
        // Add amp-custom tag to added CSS
        html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
        // Remove every script tag from generated HTML
        html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        // Remove preload scripts
        html = html.replace(/<link rel=\"preload\" href=\"\S[^<]*\" as=\"script\">/gi, '')
        html = html.replace(/<link rel=\"prefetch\" href=\"\S[^<]*\">/gi, '')
        // Add AMP script before </head>
        html = html.replace('</head>', this.getScripts() + this.getStyles() + '</head>')

        return html
    }

    return this
}

module.exports = {
    head: {
        title: 'Android Headlines',
        script: [
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.4/lazysizes.min.js', async: true},
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.4/plugins/respimg/ls.respimg.min.js', async: true},
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.4/plugins/attrchange/ls.attrchange.min.js', async: true},
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.4/plugins/object-fit/ls.object-fit.min.js', async: true},
            {src: 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.0.4/plugins/parent-fit/ls.parent-fit.min.js', async: true},
            {src: 'https://cdn.polyfill.io/v2/polyfill.min.js', async: true},
            {src: 'https://platform.twitter.com/widgets.js', async: true},
            //{innerHTML: require('./external/gdpr'), async: true},
            {src: '//cdn.geni.us/snippet.min.js', defer: true},
            {innerHTML: require('./external/georiot'), async: true}
        ],
        meta: [
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Android Headlines'},
            {name: 'msapplication-TileColor', content: '#b91d47'},
            {name: 'theme-color', content:'#ffffff'}
        ],
        link: [
            {rel: 'dns-prefetch', href: '//api.google.com'},
            {rel: 'dns-prefetch', href: '//fonts.googleapis.com'},
            {rel: 'dns-prefetch', href: '//cdn0.tnwcdn.com'},
            {rel: 'dns-prefetch', href: '//www.googletagmanager.com'},
            {rel: 'preconnect', href: '//cdn0.tnwcdn.com'},
            {rel: 'preconnect', href: '//www.googletagmanager.com'},
            {rel: 'apple-touch-icon', sizes:'180x180', href:'/apple-touch-icon.png?v=Jy7z7ePpAd'},
            {rel: 'icon', type:'image/png', sizes:'32x32', href:'/favicon-32x32.png?v=Jy7z7ePpAd'},
            {rel: 'icon', type:'image/png', sizes:'16x16', href:'/favicon-16x16.png?v=Jy7z7ePpAd'},
            {rel: 'mask-icon', color: '#e71e25', href:'/safari-pinned-tab.svg?v=Jy7z7ePpAd'},
            {rel: 'shortcut icon', href:'/favicon.ico?v=Jy7z7ePpAd'}
        ],
        __dangerouslyDisableSanitizers: ['script']
    },
    css: [
        '@/assets/scss/app.scss'
    ],
    loading: '~/components/Loading.vue',
    transition: {
        name: 'vanish',
        mode: 'out-in',
        css: false,
        duration: 200,
        beforeEnter(el) {
            el.style.opacity = 0
        },
        enter(el, done) {
            el.style.opacity = 0
            setTimeout(() => {
                el.style.opacity = 1
                done()
            }, 200)
        },
        beforeLeave(el) {
            el.style.opacity = 0
        },
        leave(el, done) {
            el.style.opacity = 0
            done()
        }
    },
    modules: [
        'nuxt-express-module',
        '@nuxtjs/dotenv',
        'nuxt-sass-resources-loader',
        '@nuxtjs/router',
        '@nuxtjs/pwa',
        '@nuxtjs/axios',
        '@nuxtjs/moment',
        ['@nuxtjs/google-analytics', {
            id: process.env.GOOGLE_ANALYTICS
        }]
    ],
    plugins: [
        //{src: '~/plugins/bugsnag', ssr: false},
        {src: '~/plugins/router'},
        {src: '~/plugins/vimg', ssr: false},
        {src: '~/plugins/userAgent'},
        {src: '~/plugins/swiper', ssr: false},
        //{src: '~/plugins/gc', ssr: false}
    ],
    sassResources: [
        '@/assets/scss/_variables.scss'
    ],
    axios: {
        credentials: false,
        baseURL: process.env.API_URL,
        browserBaseURL: '',
        proxyHeaders: true,
        redirectError: {
            401: '/'
        },
        requestInterceptor: (config, {store}) => {
            config.headers.common['X-Requested-With'] = 'XMLHttpsRequest'
            config.headers.common['SupportsCredentials'] = true
            return config
        }
    },
    env: {
        formID: process.env.FORM_ID,
        apiToken: process.env.API_TOKEN,
        clientUrl: process.env.CLIENT_URL,
        cdnEnabled: process.env.CDN_ENABLED,
        cdnUrl: process.env.CDN_URL,
        bugsnagKey: process.env.BUGSNAG_KEY
    },
    manifest: {
        name: 'Android Headlines',
        theme_color: '#E71E25',
        lang: 'en'
    },
    workbox: {
        autoRegister: true,
        runtimeCaching: []
    },
    meta: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        mobileApp: true,
        mobileAppIOS: false,
        appleStatusBarStyle: 'default',
        favicon: true,
        theme_color: '#E71E25',
        lang: 'en',
        nativeUI: false,
        name: 'AH Tech News'
    },
    icon: {
        sizes: [144, 192, 384, 512]
    },
    build: {
        vendor: ['axios', 'moment', 'v-img'],
        watch: ['express'],
        // postcss: [
        //     require('autoprefixer')({
        //         browsers: ['> 5%']
        //     })
        // ],
        extend (config, {isDev, isClient}) {
            config.node = {
                fs: 'empty'
            }
            if (isClient) {
                // if (Array.isArray(config.entry)) {
                //     config.entry = ['babel-polyfill'].concat(config.entry)
                // } else {
                //     config.entry = ['babel-polyfill', config.entry]
                // }
            }
            if (isDev && isClient) {
                config.devtool = 'source-map' // create sourcemaps
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
            if (isDev) {
                const vueLoader = config.module.rules.find(({loader}) => loader === 'vue-loader')
                vueLoader.options.cssModules = {
                    localIdentName: '[name]__[local]___[hash:base64:5]',
                    camelCase: true
                }
            }
        }
    },
    hooks: {
        'render:route': function (url, page) {
            const amp = new AMP
            const path = url.split('/')
            let isAmp = false
            for (let i = 0; i < path.length; i++) {
                if (path[i] === 'amp') {
                    isAmp = true
                    continue
                }
            }
            if (isAmp) {
                page.html = amp.transform(page.html)
            }
        }
    }
}
