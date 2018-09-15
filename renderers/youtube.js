import { filter } from './utils'
import YoutubeShortcode from '~/components/Shortcodes/YoutubeShortcode'

export default function renderYoutube(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    return createElement(YoutubeShortcode, attributes)
}