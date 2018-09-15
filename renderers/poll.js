import { filter } from './utils'
import PollShortcode from '~/components/Shortcodes/PollShortcode'

export default function renderPoll(instance, node, createElement) {
    const attributes = filter(node, true, [], {
        amp: instance.amp
    })
    return createElement(PollShortcode, attributes)
}