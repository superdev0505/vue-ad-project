<template>
    <div :class="$style.wrapper">
        <template v-for="(item, index) in $store.state.menus.footerMainMenu">
            <div :key="index">
                <nuxt-link :to="'/' + item.permalink" :class="$style.item" tag="div" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
            </div>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {

        .item {

            .anchor {
                color: $white;
                font-weight: 300;
                line-height: 2;
                text-decoration: none;
                transition: all .25s ease-in-out;
                opacity: 1;

                &:focus, &:hover {
                    opacity: .6;
                    text-decoration: none;
                }
            }
        }
    }
</style>

<script>
</script>