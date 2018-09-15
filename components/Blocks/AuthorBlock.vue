<template>
    <div :class="[$style.wrapper, {[$style.invert]: invert}, {[$style.article]: article}, {[$style.amp]: amp}]" :article="article" :amp="amp">
        <template v-if="!noAvatar">
            <div :class="$style.imageWrapper">
                <image-element :amp="amp" :class="$style.image" fit="cover" v-if="author.avatar" :obj="author.avatar"/>
                <image-element :amp="amp" :class="$style.image" fit="cover" v-else :src="author.avatar_urls['96']"/>     
            </div>
        </template>   
        <nuxt-link v-if="!noLink" :to="'/author/' + author.slug">
            <span :class="$style.name" v-if="noBy">
                {{ author.name }}
            </span>
            <span :class="$style.name" v-else>
                By {{ author.name }}
            </span>
        </nuxt-link>
        <template v-else>
            <span :class="$style.name" v-if="noBy">
                {{ author.name }}
            </span>
            <span :class="$style.name" v-else>
                By {{ author.name }}
            </span>
        </template>
        <span :class="$style.date">
            <slot />
        </span>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        font-size: 0.75em;
        font-family: $second-font-family;

        .name {
            color: $font-color;
            margin-right: 0.5em;
        }

        .date {
            font-weight: 300;
            opacity: .5;
        }

        &.invert {
            .name {
                color: $color-white;
            }
        }

        // article pages
        &.article {
            margin: 2em auto;
            display: flex;
            align-items: center;

            .imageWrapper {
                border-radius: 50%;
                margin-right: 1em;
                vertical-align: middle;
                width: 56px;     
                height: 56px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                background: #EEE;
                position: relative;
            }

            .image {
                min-height: 56px;
                // min-width: 56px;
            }

            .name {
                font-size: 1.25em;
                display: inline-block;
            }
        }

        &.amp {
            margin: 2em auto;
            display: flex;
            align-items: center;

            .imageWrapper {
                border-radius: 50%;
                margin-right: 1em;
                //vertical-align: middle;
                width: 56px;     
                height: 56px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                background: #EEE;
                position: relative;
            }

            .image {
                object-fit: contain;
            }

            .name {
                font-size: 1.25em;
            }
        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            invert: {
                type: Boolean,
                default() {
                    return false
                }
            },
            noBy: {
                type: Boolean,
                default() {
                    return false
                }
            },
            noAvatar: {
                type: Boolean,
                default() {
                    return false
                }
            },
            noLink: {
                type: Boolean,
                default() {
                    return false
                }
            },
            author: {
                type: Object,
                required: true
            },
            article: {
                type: Boolean,
                default() {
                    return false
                }
            },
            amp: {
                type: Boolean,
                default() {
                  return false
                }
            }
        },
        components: {
            ImageElement
        }
    }
</script>