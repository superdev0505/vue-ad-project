<template>
    <div :class="[$style.wrapper, {[$style.searchOpen]: searchOpen}]">
        <app-bar />
        <div :class="$style.content">
            <slot />
        </div>
        <app-footer v-if="!$store.state.amp" />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        overflow: hidden;

        &.searchOpen {
            height: 100%;
        }

        .content {
            margin: 0;
            position: relative;
        }
    }

    // tablet and up
    @include media('>=tablet') {

        .wrapper {
            padding-top: 80px;
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
    import AppBar from '~/components/AppBar'
    import AppFooter from '~/components/AppFooter'

    export default {
        computed: {
            ...mapGetters({
                searchOpen: 'search/searchOpen'
            })
        },
        methods: {
            openSearch() {
                this.$store.commit('search/openSearch')
            },
            closeSearch() {
                this.$store.commit('search/closeSearch')
            },
            hotkey(event) {
                if (event.ctrlKey && event.keyCode === 75) {
                    event.preventDefault()
                    this.searchOpen ? this.closeSearch() : this.openSearch()
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.hotkey)
        },
        beforeDestroy() {
            document.removeEventListener('keydown', this.hotkey)
        },
        components: {
            AppBar,
            AppFooter
        }
    }
</script>
