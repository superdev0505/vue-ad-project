import menus from '~/json/menus.json'

export const state = () => ({
    clientUrl: null,
    cdnUrl: null,
    ads: {
        console: false,
        provider: 'none',
        account: null,
        map: {},
        bucket: []
    },
    menus: menus,
    mobileMenuOpened: false,
    socialCount: {},
    sponsoredAds: {
        link: null,
        image: null,
        text: null
    },
    isMobile: false
})

export const getters = {
    isMobile (state) {
        return state.isMobile
    }
}

export const mutations = {
    insertClientUrl (state, url) {
        state.clientUrl = url
    },
    insertAdSettings (state, settings) {
        state.ads = settings
    },
    insertMenu (state, menus) {
        for (let index in menus) {
            if (menus.hasOwnProperty(index)) {
                state.menus[index] = menus[index]
            }
        }
    },
    toggleMenu (state) {
        state.mobileMenuOpened = !state.mobileMenuOpened
    },
    insertSocialCount (state, social_count) {
        state.socialCount = social_count
    },
    insertIsMobile (state, isMobile) {
        state.isMobile = isMobile
    },
    insertCdnUrl (state, cdnUrl) {
        state.cdnUrl = cdnUrl
    },
    insertSponsoredAds (state, sponsored_ads,) {
        for (let index in sponsored_ads) {
            if (sponsored_ads.hasOwnProperty(index)) {
                state.sponsoredAds[index] = sponsored_ads[index]
            }
        }
    }
}

export const actions = {
    async nuxtServerInit ({ commit }, { app, env }) {
        const system = await app.$axios.$get('v1/system')
        commit('insertClientUrl', env.clientUrl)
        if (env.cdnEnabled) {
            commit('insertCdnUrl', env.cdnUrl)
        }
        commit('insertMenu', system.menus)
        commit('insertAdSettings', system.ads)
        //add in ad script
        if (system.ads.provider === 'ziffdavis') {
            if (!app.head.script.find(script => script['data-hid'] === 'ad-script')) {
                app.head.script.push({
                    src: '//cdn.nsstatic.net/ns/androidheadlines.com.js',
                    async: true,
                    id: 'nsgpt',
                    'data-hid': 'ad-script'
                })
            }
        }
        commit('search/insertSearchSettings', system.search)
        commit('insertSocialCount', system.social_count)
        commit('insertSponsoredAds', system.sponsored_ads)

    }
}