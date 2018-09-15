import AdBlock from '~/components/Blocks/AdBlock'

export default function renderCaption(instance, createElement, count) {
    return createElement(AdBlock, {
        props: {
            amp: instance.amp,
            name: instance.adNamespace + (count + 1),
            ampCall: (count + 2),
            center: true
        }
    })
}