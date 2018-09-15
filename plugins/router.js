import Vue from 'vue'

Vue.component('ah-link', {
    name: 'ah-link',
    functional: true,
    render (h, { data, children, parent, props }) {
        const response = h('nuxt-link', data, children)
        if (!response.data.on) {
            response.data.on = {}
        }
        const rootClick = response.data.on.click
        response.data.on.click = event => {
            const router = parent.$router
            const current = parent.$route
            const { route } = router.resolve(props.to, current, props.append)

            if (route.path === current.path) {
                event.preventDefault()
                window.location.reload()
                return false
            } else {
                if (rootClick) {
                    return rootClick(event)
                }
            }
        }

        return response
    }
})

export default ({ app, store }) => {
    if (process.client) {
        app.router.beforeEach((to, from, next) => {
            // if (window.stop) {
            //     window.stop()
            // }
            if (store.state.mobileMenuOpened) {
                store.commit('toggleMenu')
            }
            next()
        })
    }
}