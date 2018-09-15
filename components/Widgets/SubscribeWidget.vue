<template>
    <div :class="$style.wrapper">
        <div :class="[$style.title, 'h2']">Subscribe to Our Newsletter</div>
        <!-- <input name="email" type="email" v-model="email" placeholder="Your email address" :class="$style.input"/> -->
        <button @click="subscribe" :class="$style.link">Subscribe <span class="icon-link-arrow-right"></span></button>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        width: fit-content;
        height: auto;
        background: #222;
        position: relative;
        padding: 1em;
        margin: 0 auto 1em;

        .title {
            color: $white;
            margin: 0;
            font-family: $second-font-family;
            font-weight: 500;
            font-size: 0.875rem;
            text-transform: uppercase;
            font-style: italic;
        }

        .input {
            margin: 1em 0 2em;
            padding: 0.75em;
            font-weight: 300;
            font-size: 0.875em;
            width: 100%;
            border-radius: 2px;
            border: none;
            box-shadow: none;

            ::-webkit-input-placeholder {
                color: #CCC;
            }
        }

        .link {
            margin: 1em 0 0;
            padding: 0.75em;
            font-weight: 300;
            font-size: 0.875em;
            width: 100%;
            border-radius: 2px;
            border: none;
            box-shadow: none;
            text-transform: uppercase;
            font-weight: 500;
            font-size: .875em;
            color: white;
            border: 0;
            background: $color-primary;
            cursor: pointer;

            &:hover, &:active, &:focus {
                text-decoration: none;
            }

            span:before {
                color: white;
                position: relative;
                top: 2px;
                right: 0;
                transition: all .25s ease;
            }

            &:hover, &:focus {

                span:before {
                    right: -7px;
                    transition: all .25s ease;
                }
            }
        }
    }
</style>

<script>
    export default {
        data() {
            return {
                email: null
            }
        },
        methods: {
            subscribe() {
                var x = screen.width/2 - 700/2;
                var y = screen.height/2 - 450/2;
                window.open('http://eepurl.com/b0A-95', '_blank', 'location=no,height=570,width=520,scrollbars=yes,status=no,left='+x+',top='+y)
            }
        },
    }
</script>
