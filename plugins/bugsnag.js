import bugsnag from 'bugsnag-js'
import Vue from 'vue'
import BugsnagVue from 'bugsnag-vue'

export default ({ env }) => {
    const bugsnagClient = bugsnag(env.bugsnagKey)
    bugsnagClient.use(BugsnagVue(Vue))

    bugsnagClient.notify(new Error('Test error'))
}