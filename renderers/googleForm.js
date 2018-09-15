import { filter } from './utils'
import GoogleFormShortcode from '~/components/Shortcodes/GoogleFormShortcode'

export default function renderGoogleForm(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    return createElement(GoogleFormShortcode, attributes)
}