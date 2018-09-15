<template>
    <div :class="$style.wrapper">
        <amp-accordion disable-session-states>
            <template v-for="(item, index) in $store.state.menus.mainMenu">
                <section v-if="!item.children" :key="index" :class="$style.item">
                    <h2>
                        <a :href="'/' + item.permalink" :class="$style.anchor">{{ item.name }}</a>
                    </h2>
                    <ul></ul>
                </section>
                <section v-else :key="index" :class="$style.item">
                    <h2>
                        {{ item.name }}
                        <span :class="$style.icon">
                            <i :class="[$style.carotIcon, 'icon-arrow-dropdown-carot', { [$style.carotFlip]: menu === index }]"></i>
                        </span>
                    </h2>
                    <ul :class="$style.subMenu">
                        <li v-for="(childItem, childIndex) in item.children" :key="'child_' + childIndex">
                            <a :href="'/' + childItem.permalink">{{ childItem.name }}</a>
                        </li>
                    </ul>
                </section>
            </template>
        </amp-accordion>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin: 0;
        padding: 0;
        display: block;

        .item {

            h2 {
                background: transparent;
                border: 0;
                border-bottom: 1px solid $color-accent-2;
                padding-right: 0;
                padding-left: 1em;
                color: white;
                font-weight: normal;
                font-size: 1em;
                vertical-align: middle;
                line-height: 4;
                font-weight: 300;
            }

            .subMenu {
                background: #222;
                padding: 1em 0;

                > li > a {
                    color: #999;
                    font-weight: 300;
                    font-size: 0.875em;
                    padding-left: 1.25em;
                    line-height: 2.5;

                    &:hover, &:focus, &:active {
                        text-decoration: none;
                        opacity: .6;
                        transition: opacity .25s ease-in-out;
                    }
                }
            }

            .icon {
                font-size: 0.25rem;

                .carotIcon:before {
                    position: relative;
                    top: -3px;
                    left: 1px;
                    transition: all .25s ease;
                }

                .carotFlip:before {
                    position: relative;
                    top: -3px;
                    left: 5px;
                    -ms-transform: rotate(180deg); /* IE 9 */
                    -webkit-transform: rotate(180deg); /* Safari 3-8 */
                    transform: rotate(180deg);
                    transition: all .25s ease;
                }
            }

            display: block;
            color: $color-white;

            .anchor {
                color: white;
                opacity: 1;

                &:hover, &:focus, &:active {
                    opacity: .6;
                    transition: opacity .25s ease-in-out;
                    text-decoration: none;
                }
            }
        }
    }
</style>

<script>
    /**
     * Amp menu component
     */
    export default {}
</script>