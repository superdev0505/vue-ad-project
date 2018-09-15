<template>
    <div :class="$style.wrapper">
        <div :class="$style.title"><span>Trusted by Millions</span></div>
        <social-proof-list-block />
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        margin-top: 1em;

        .title {
            text-align: center;
            margin-bottom: 1em;
            font-family: $second-font-family;
            font-weight: 700;
            font-size: 0.875rem;            
            text-transform: uppercase;
            font-style: italic;

            span {
                display: inline-block;
                position: relative;  

                &:before, &:after {
                    content: "";
                    position: absolute;
                    height: 11px;
                    border-bottom: 1px solid #DDD;
                    top: 0;
                    width: 5em;
                }

                &:before {
                    right: 100%;
                    margin-right: 0.75em;
                }

                &:after {
                    left: 100%;
                    margin-left: 0.75em;
                }
            }
        }
    }
</style>

<script>
    import SocialProofListBlock from '~/components/Blocks/Lists/SocialProofListBlock'

    export default {
        components: {
            SocialProofListBlock
        }
    }
</script>
