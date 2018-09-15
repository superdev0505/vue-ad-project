<template>
    <div :class="$style.wrapper">
        <div :class="$style.header">
            <div v-for="(block, name) in blocks" :class="[$style.tab, {[$style.active]: activeBlock === name}]" :key="name" @click="activate(name)">{{ block }}</div>
        </div>
        <div :class="$style.content">
            <div v-for="(block, name) in blocks" :key="name" v-show="activeBlock === name">
                <slot :name="name"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {

        .header {
            display: flex;
            flex-direction: row;

            .tab {
                display: inline-block;
                flex: 0 0 100%;
                -webkit-box-flex: 1;
                flex-grow: 1;
                flex-basis: 0;
                max-width: 100%;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                user-select: none;
                border-bottom: 3px solid $color-accent-3;
                margin: 0;
                padding: 0.5rem 2rem;
                text-transform: uppercase;
                cursor: pointer;
                font-weight: 500;
                background-color: $color-accent-4;
                color: $color-accent-1;
                transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;

                &.active {
                    border-bottom: 3px solid $color-primary;
                    background-color: #fff;
                    color: #000;
                }
            }
        }
        .content {
            display: block;
            padding: 1.5rem 0;
        }
    }
</style>

<script>
    export default {
        name: 'Tabs',
        props: {
            blocks: {
                type: Object,
                default () {
                    return {}
                }
            },
            first: {
                type: String,
                default () {
                    return null
                }
            }
        },
        data () {
            return {
                activeBlock: null
            }
        },
        methods: {
            activate(tab) {
                this.activeBlock = tab
            }
        },
        created () {
            if (!this.first) {
                this.activeBlock = null
            } else {
                this.activeBlock = this.first
            }
        }
    }
</script>