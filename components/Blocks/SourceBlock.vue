<template>
    <div :class="$style.wrapper">
        <slot />
        <template v-if="acf.ah_source_url && !acf.ah_source_name">
            <a :href="sourceurl" target="_blank">Source</a>
        </template>
        <template v-else-if="acf.ah_source_url && acf.ah_source_name">
            Source: <a :href="sourceurl" target="_blank">{{ acf.ah_source_name }}</a> 
            <template v-if="acf.ah_via_name">
                Via: 
                <template v-if="acf.ah_via_url">
                    <a :href="viaurl" target="_blank">
                        {{ acf.ah_via_name }}
                    </a>
                </template>
                <template v-else>
                    {{ acf.ah_via_name }}
                </template>
            </template>
            <template v-if="acf.ah_image_name">
                Image: 
                <template v-if="acf.ah_image_url">
                    <a :href="imageurl" target="_blank">
                        {{ acf.ah_image_name }}
                    </a>
                </template>
                <template v-else>
                    {{ acf.ah_image_name }}
                </template>
            </template>
        </template>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        color: #9B9B9B;
        font-style: italic;
        font-size: 0.75em;

        a {
            color: #9B9B9B;
        }
    }
</style>

<script>
    export default {
        props: {
            acf: {
                default() {
                    return {
                        ah_source_name: null,
                        ah_source_url: null,
                        ah_via_name: null,
                        ah_via_url: null,
                        ah_image_name: null,
                        ah_image_url: null
                    }
                }
            }
        },
        methods: {
            properurl: function(url) {
                if (!url.match(/^[a-zA-Z]+:\/\//))
                {
                    url = 'http://' + url;
                }
                return url;
            }
        },
        computed: {
            sourceurl() {
                return this.properurl(this.acf.ah_source_url);
            },
            viaurl() {
                return this.properurl(this.acf.ah_via_url);
            },
            imageurl() {
                return this.properurl(this.acf.ah_image_url);
            }
        }
    }
</script>
