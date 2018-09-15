export function filter(attributes, component = false, remove = [], params = {}) {
    const response = {
        attrs: {},
        props: {}
    }
    for (let index in attributes) {
        if (attributes.hasOwnProperty(index)) {
            if (['tag', 'children', 'style', 'class', ...remove].indexOf(index) === -1) {
                if (component) {
                    response['props'][index] = attributes[index]
                } else {
                    response['attrs'][index] = attributes[index]
                }
            }
            if (['style', 'class'].indexOf(index) !== -1) {
                response[index] = attributes[index]
            }
        }
    }
    for (let index in params) {
        if (params.hasOwnProperty(index)) {
            if (['style', 'class'].indexOf(index) === -1) {
                if (component) {
                    response['props'][index] = params[index]
                } else {
                    response['attrs'][index] = params[index]
                }
            }
            if (['style', 'class'].indexOf(index) !== -1) {
                response[index] = params[index]
            }
        }
    }

    return response
}

export function convertLink(instance, href) {
    if (instance.$root.$options.context.env) {
        const apiUrl = instance.$root.$options.context.env.API_URL.replace('/wp-json', '')

        return href.replace(apiUrl, '')
    }

    return href
}

export function isInternal(instance, href) {
    if (instance.$root.$options.context.env) {
        const apiUrl = instance.$root.$options.context.env.API_URL.replace('/wp-json', '')

        return href.includes(apiUrl)
    }

    return false
}