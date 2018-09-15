import { filter } from './utils'

export default function renderTag(instance, node, createElement) {
    let output = ''
    if (node.children) {
        output = instance.renderChildren(
            node.children, 
            createElement
        )
    } else if (node.html) {
        output = node.html
    }
    return createElement(node.tag, filter(node), output)
}