<template>
    <div :class="$style.wrapper">
        <template v-for="(item, index) in $store.state.menus.footerFootnoteMenu">
            <div :key="index" :class="$style.item">
                <nuxt-link :to="'/' + item.permalink" tag="div" :active-class="$style.active" :exact-active-class="$style.exact" exact>
                    <a :class="$style.anchor" v-html="item.name"></a>
                </nuxt-link>
            </div>
        </template>
        <div :class="$style.item">
            <div>
                <a :class="$style.anchor" style="cursor:pointer" onclick="window.__cmp(&quot;displayConsentUi&quot;)">Change Ad Consent</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {

        .item {
            display: inline-block;
            margin-right: 5%;

            .anchor {
                color: $white;
                font-weight: 300;
                font-size: 0.75em;
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