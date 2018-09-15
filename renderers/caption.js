import { filter } from './utils'
import CaptionShortcode from '~/components/Shortcodes/CaptionShortcode'

export default function renderCaption(instance, node, createElement) {
    let output = ''
    if (node.children) {
        output = instance.renderChildren(
            node.children, 
            createElement
        )
    } else if (node.html) {
        output = node.html
    }
    return createElement(CaptionShortcode, filter(node, true), output)
}