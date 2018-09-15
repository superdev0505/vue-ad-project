export const state = () => ({
    root: {},
    isRoot: false,
    isArticle: false,
    data: [],
    color: '#607D8B'
})

export const getters = {
    root (state) {
        return state.root
    },
    data (state) {
        return state.data
    },
    color (state) {
        return state.color
    },
    isRoot (state) {
        return state.isRoot
    },
    isArticle (state) {
        return state.isArticle
    }
}

export const mutations = {
    insertRoot (state, root) {
        state.root = root
    },
    insertData (state, data) {
        state.data = data
    },
    insertColor (state, color) {
        state.color = color
    },
    clearColor (state) {
        state.color = '#607D8B'
    },
    setIsArticle (state, isArticle) {
        state.isArticle = isArticle
    },
    handleResponse (state, response) {
        let category = response
        if (response.parent > 0) {
            state.isRoot = false
            category = response.parent_term
        } else {
            state.isRoot = true
        }

        if (category.acf && category.acf.color) {
            state.color = category.acf.color
        } else {
            state.color = '#607D8B'
        }

        state.root = category
        if (category.children) {
            state.data = category.children.data
        }
    }
}