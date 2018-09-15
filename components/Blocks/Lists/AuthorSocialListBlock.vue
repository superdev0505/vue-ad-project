<template>
    <div :class="[$style.wrapper]">
        <a v-for="(socialURL, socialAccount) in social" :key="socialAccount" v-if="socialURL" :href="socialURL" :class="$style.socialLink" target="_blank">
            <span :class="'icon-social-' + socialAccount"></span>
        </a>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        display: flex;
        justify-content: flex-start;
        text-align: center;
        margin-bottom: 2rem;

        .socialLink {
            background: $color-primary;
            transition: all .25s ease-in-out;
            border-radius: 50%;
            width: 2.25rem;
            height: 2.25rem;
            color: $white;
            vertical-align: middle;
            line-height: 37px;
            margin-left:0.25rem;

            &:hover, &:focus {
                background: darken($color-primary, 10%);
                transition: all .25s ease-in-out;
            }
        }
    }
    // desktop and up
    @include media(">tablet") {

        .wrapper {
            position: absolute;
            right: 0;
            top:0.5rem;    
            justify-content: flex-end;                  
            
        }
        
    } 
    
</style>

<script>
    import { mixin as clickaway } from 'vue-clickaway'

    export default {
        mixins: [ clickaway ],
        props: {
            social: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            toggle() {
                this.opened = !this.opened
            },
            toggleAway() {
                this.opened = false
            }
        }
    }
</script>