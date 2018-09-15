export default ({ app }) => {
    app.router.beforeEach((to, from, next) => {
        for (let i = 0; i < document.body.children.length; i++) {
            if (document.body.children[i]) {
                if (document.body.children[i].tagName === 'IFRAME') {
                    console.log(document.body.children[i].tagName)
                    document.body.children[i].setAttribute('src', 'about:blank')
                    document.body.children[i].parentNode.removeChild(document.body.children[i])
                }
            }
        }
        next()
    })
}