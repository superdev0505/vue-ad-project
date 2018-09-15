<template>
    <div :class="$style.wrapper" v-if="loading">
        <div :class="$style.container">
            <div :class="$style.loader"></div>
            <div :class="$style.percent" v-if="increment > 0">{{ increment }}%</div>
        </div>
    </div>
</template>

<style lang="scss" module>

    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(25, 25, 25, 0.75);
        z-index: 9999;

        .container {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -2.5rem;
            margin-top: -2.5 rem;
            width: 5rem;
            height: 5rem;

            .loader,
            .loader:after {
                border-radius: 50%;
                width: 5rem;
                height: 5rem;
            }
            .loader {
                margin: 0 auto;
                font-size: 0.6rem;
                position: relative;
                text-indent: -9999rem;
                border-top: 1.1rem solid rgba(red($color-secondary), green($color-secondary), blue($color-secondary), 0.4);
                border-right: 1.1rem solid rgba(red($color-secondary), green($color-secondary), blue($color-secondary), 0.4);
                border-bottom: 1.1rem solid rgba(red($color-secondary), green($color-secondary), blue($color-secondary), 0.4);
                border-left: 1.1rem solid rgba(red($color-primary), green($color-primary), blue($color-primary), 0.8);
                -webkit-transform: translateZ(0);
                -ms-transform: translateZ(0);
                transform: translateZ(0);
                -webkit-animation: load8 1.1s infinite linear;
                animation: load8 1.1s infinite linear;
            }

            .percent {
                position: absolute;
                left: 50%;
                top: 50%;
                margin-top: -0.4rem;
                margin-left: -0.4rem;
                text-align: center;
                color: $white;
                font-size: 0.8rem;
            }
        }
    }
    @-webkit-keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
        }
        @keyframes load8 {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

</style>

<script>
    export default {
        data() {
            return {
                increment: 0,
                loading: false
            }
        },
        methods: {
            start() {
                this.loading = true
                this.increment = 0
            },
            finish() {
                this.loading = false
                this.increment = 0
            },
            increase(num) {
                this.increment = num
            }
        }
    }
</script>