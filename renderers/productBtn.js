import { filter } from './utils'
import ProductBtnShortcode from '~/components/Shortcodes/ProductBtnShortcode'

export default function renderProductBtn(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    return createElement(ProductBtnShortcode, attributes)
}