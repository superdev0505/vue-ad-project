<template>
    <nuxt-link to="/join-our-team" :class="$style.link">
        <div :class="$style.wrapper">
            <img src="~/assets/images/logos/desktop_logo.svg" alt="Android Headlines" :class="$style.desktopLogo" />
        	<span :class="[$style.title, 'h1']">We Are <span :class="$style.big">Hiring</span></span>
        	<span :class="$style.apply">Apply Now <span class="icon-link-arrow-right"></span></span>
        </div>
    </nuxt-link>
</template>

<style lang="scss" module>
    .link {

        .wrapper {
            margin-top: 0.5em;
            margin-bottom: 1em;
            width: 300px;
            height: 250px;
            background: #222;
            position: relative;
            padding: 2em 3em;

            .desktopLogo {
                width: 100%;
                margin: auto;
            }

            .title {
            	color: $white;
            	text-align: center;
                text-transform: uppercase;
                font-weight: 500;
                line-height: 50px;
                margin-top: 0.25em;
                font-size: 3.125em;

                .big {
                    font-size: 3.5rem;
                }
            }

            .apply {
                margin-top: 0.25em;
                text-transform: uppercase;
                font-weight: 500;
                font-size: .875em;
                position: absolute;
                right: 1em;
                bottom: 1em;
                color: white;

                &:hover, &:active, &:focus {
                    text-decoration: none;
                }

                span:before {
                    color: $color-primary;
                    position: relative;
                    top: 2px;
                    right: 0;
                    transition: all .25s ease;
                }
            }
        }

        // hover state
        &:hover, &:focus {
            text-decoration: none;

            .apply span:before {
                right: -7px;
                transition: all .25s ease;
            }

        }
    }
</style>

<script>
    export default {

    }
</script>
