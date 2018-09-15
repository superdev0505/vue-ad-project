export default ({ store, req, app: { router } }) => {
    if (!process.server) {
        if (window.matchMedia('(min-width: 768px)').matches) {
            store.commit('insertIsMobile', false)
        }  else {
            store.commit('insertIsMobile', true)
        }
        var resizeTimeout = null
        window.addEventListener('resize', event => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(() => {
                if (window.matchMedia('(min-width: 768px)').matches) {
                    store.commit('insertIsMobile', false)
                }  else {
                    store.commit('insertIsMobile', true)
                }
            }, 100)

        })

        router.beforeEach(function(to, from, next) {
            if (window.matchMedia('(min-width: 768px)').matches) {
                store.commit('insertIsMobile', false)
            }  else {
                store.commit('insertIsMobile', true)
            }
            next()
        })
    } else {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
        store.commit('insertIsMobile', /mobile/i.test(userAgent))
    }
}