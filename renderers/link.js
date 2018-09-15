import { filter, convertLink, isInternal } from './utils'

export default function renderLink(instance, node, createElement) {
    let output = ''
    if (node.children) {
        output = instance.renderChildren(
            node.children, 
            createElement
        )
    } else if (node.html) {
        output = node.html
    }

    if (isInternal(instance, node.href)) {
        return createElement(
            'nuxt-link', filter(node, true, [], {
                to: convertLink(instance, node.href) || '/',
            }), 
            output
        )
    }

    return createElement('a', filter(node), output)
}