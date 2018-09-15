import { filter } from './utils'
import ImageElement from '~/components/Elements/ImageElement'

export default function renderImage(instance, node, createElement) {
    return createElement(ImageElement, filter(node, true, [], {
        amp: instance.amp,
        style: {
            'max-width': '100%'
        }
    }))
}