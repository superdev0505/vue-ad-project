<template>
    <nav :class="$style.wrapper">
        <div :class="$style.header">
            <div :class="$style.icon" on='tap:amp_sidebar.toggle'>
                <span class="icon-menu-hamburger" v-if="!$store.state.mobileMenuOpened"></span>
            </div>
            <div :class="$style.logo">
                <img src="~/assets/images/logos/desktop_logo.svg" />
            </div>
        </div>
    </nav>
</template>

<style lang="scss" module>
    .wrapper {
        background: $color-black;
        color: $color-white;

        .header {
            text-align: center;
            max-width: 640px;
            padding: 0.8em 1em 0.5em;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            position:relative;

            .icon {
              position: absolute;
              left: 1em;
            }

            .logo {
                max-width: 12em;
                @include media(">330px") {                
                  max-width: 15em;
                }
                img {
                    width: 100%;
                }
            }
        }
    }
</style>

<script>
    export default {
    }
</script>
