<template>
    <div :class="$style.wrapper">
        <span @click="openSearch" :class="['icon-search', $style.headerIcon]"></span>
        <transition name="grow">
            <div v-if="open" :class="$style.container">
                <div :class="$style.box">
                    <input type="text" ref="search" :class="$style.input" placeholder="Start Typing" v-model="field" @keyup.enter="search" />
                    <span :class="$style.button">
                        <span @click="search" :class="$style.icon">
                            <span class="icon-search"></span>
                        </span>
                    </span>
                </div>
                <div @click="closeSearch" :class="$style.close">
                    <div :class="$style.icon">
                        <span class="icon-close"></span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss" module>

    .wrapper {
        cursor: pointer;
        margin-left: 1rem;
        position: absolute;
        right: 1em;

        .headerIcon {
            margin: 0;
            font-size: 1.25rem;
            line-height: 2.25;
            opacity: .6;
            transition: opacity .25s ease-in-out;
            -moz-transition: opacity .25s ease-in-out;
            -webkit-transition: opacity .25s ease-in-out;
            -o-transition: opacity .25s ease-in-out;

            &:hover {
                opacity: 1;
            }
        }

        .container {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: $color-primary;
            z-index: 99;
            overflow: hidden;
            justify-content: center;
            display: flex;

            .box {
                background: rgba(0,0,0,.1);
                margin: auto;
                display: flex;
                width: 90%;
            }

            .input {
                width: 88%;
                padding-left: 0.5em;
                border: none;
                background: transparent;
                font-family: $second-font-family;
                font-size: 1.5rem;
                line-height: 2.25;
                font-weight: 300;
                outline: none;
                color: $color-white;

                &:focus {
                    outline: none;
                }

                &::placeholder {
                    color: $color-white;
                    opacity: 0.4;
                }
            }

            .button {
                width: 13%;
                position: relative;
                height: 2.25em;

                .icon {
                    font-size: 1.5rem;
                    position: absolute;
                    top: 12px;
                    right: 12px;

                    &:hover, &:focus {
                        opacity: .8;
                    }
                }
            }

            .close {
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 100;

                .icon {
                    font-size: 1.75rem;
                    color: $color-white;

                    &:hover, &:focus {
                        opacity: .8;
                    }
                }
            }
        }
    }

    //tablet and up
    @include media(">=tablet") {

        .wrapper {
            position: initial;
            right: auto;

            .container {

                .input {
                    font-size: 2.75rem;
                    line-height: 2;
                }

                .button {
                    height: 3.75em;

                    .icon {
                        font-size: 2.75rem;
                        top: 18px;
                    }
                }

                .close {
                    top: 1.25em;
                    right: 1.25em;

                    .icon {
                        font-size: 1.75em;
                    }
                }
            }
        }
    }

    //desktop and up
    @include media(">=desktop") {

        .wrapper {

            .container {

                .box {
                    max-width: 1024px;
                }

                .input {
                    font-size: 3.75rem;
                    line-height: 2;
                }

                .button {
                    height: 5em;

                    .icon {
                        font-size: 3.75rem;
                        top: 23px;
                    }
                }

                .close {
                    top: 1.25em;
                    right: 1.25em;

                    .icon {
                        font-size: 2em;
                    }
                }
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                field: null
            }
        },
        computed: {
            ...mapGetters({
                open: 'search/searchOpen'
            })
        },
        methods: {
            search() {
                this.$router.push({
                    name: 'search', 
                    query: {
                        s: this.field ? encodeURIComponent(this.field) : ''
                    }
                })
                this.$store.commit('search/closeSearch')
            },
            openSearch() {
                this.$store.commit('search/openSearch')
            },
            closeSearch() {
                this.$store.commit('search/closeSearch')
            }
        },
        watch: {
            open() {
                if (this.open) {
                    this.$nextTick(() => {
                        this.$refs.search.focus()
                    })
                }
            }
        }
    }
</script>