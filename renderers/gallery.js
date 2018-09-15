import { filter } from './utils'
import GalleryShortcode from '~/components/Shortcodes/GalleryShortcode'
import { Base64 } from 'js-base64'

export default function renderGallery(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    if (attributes.props.images) {
        attributes.props.images = JSON.parse(Base64.decode(attributes.props.images))
    }
    return createElement(GalleryShortcode, attributes)
}