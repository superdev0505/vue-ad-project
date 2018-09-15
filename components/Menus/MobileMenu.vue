<template>
    <div :class="$style.wrapper">
        <template v-for="(item, index) in $store.state.menus.mobileMenu">
            <div :key="index">
                <nuxt-link :to="'/' + item.permalink" :class="$style.item" tag="div" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name">
                    </a>
                </nuxt-link>
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        display: flex;

        .item {
            max-width: 12rem;
            display: inline-block;
            padding: 0;
            margin: 0;

            .anchor {
                display: block;
                color: $white;
                font-size: 1rem;
                line-height: 1;
                font-weight: 300;
                padding: 0 1rem;
                margin: 0;
                opacity: .6;
                transition: opacity .25s ease-in-out;
                -moz-transition: opacity .25s ease-in-out;
                -webkit-transition: opacity .25s ease-in-out;
                -o-transition: opacity .25s ease-in-out;

                &:visited, &:hover {
                    color: $white;
                    text-decoration: none;
                    opacity: 1;
                }
            }
        }
    }
</style>

<script>
    /**
     * Mobile menu component
     */
    export default {
        data() {
            return {
                menu: -1
            }
        }
    }
</script>