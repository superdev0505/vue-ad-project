import { filter } from './utils'
import SubscribeShortcode from '~/components/Shortcodes/SubscribeShortcode'

export default function renderProductBtn(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    return createElement(SubscribeShortcode, attributes)
}