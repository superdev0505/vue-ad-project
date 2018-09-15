export const state = () => ({
    searchOpen: false,
    google: {
        cse: null
    }
})

export const getters = {
    searchOpen (state) {
        return state.searchOpen
    }
}

export const mutations = {
    openSearch (state) {
        state.searchOpen = true
    },
    closeSearch (state) {
        state.searchOpen = false
    },
    insertSearchSettings (state, settings) {
        state.google = settings.google
    }
}