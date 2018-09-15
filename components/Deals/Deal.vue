<template>
    <div :class="$style.wrapper">
        <div :class="$style.top">
            <div v-if="deal.image" :class="deal.content ? [$style.left, $style.featured] : $style.left">
                <image-element :obj="deal.image" :amp="amp" />
            </div>
            <div :class="$style.middleLeft">
                <span :class="[$style.title, 'h4']">{{ deal.title }}</span>
                <p v-if="deal.content" :class="$style.content">{{ deal.content }}</p>

                <div v-if="deal.expiry" :class="$style.expiryWrapper">
                  <span v-if="deal.expiry" :class="[$style.label, 'h5']">Expires</span>
                  <p v-if="deal.expiry" :class="$style.data">{{ deal.expiry }}</p>
                </div>

                <div v-if="deal.code" :class="$style.codeWrapper">
                  <span v-if="deal.code" :class="[$style.label, 'h5']">Coupon Code</span>
                  <p v-if="deal.code" :class="$style.data">{{ deal.code }}</p>
                </div>

            </div>
            <div :class="$style.middleRight">
                <div v-if="deal.teaser_text" :class="$style.teaserText">{{ deal.teaser_text }}</div>
                <div :class="$style.price">{{ deal.price }}</div>
            </div>
            <div :class="$style.right">
                <a v-if="deal.url" :id="$style.dealBtn" class="btn btn--primary btn--block" :href="deal.url" rel="noopener" target="_blank">{{ buttonText }}</a>
                <div v-else :class="$style.html">{{ deal.html }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        border-bottom: 1px solid $grey-bg;
        padding: 0.5rem 0.5rem 1.5rem 0.5rem;
        margin-bottom: 1.5rem;
        @include media(">tablet") {
          padding: 0.5rem 0;
          margin-bottom: 0.5rem;
        }

        &:last-child {
          border-bottom: none;
        }

        .top {
            display: flex;
            flex-direction: column;
            @include media(">tablet") {
              flex-direction: row;
            }

            .left {
              order: 0;
              margin: 0 auto;
              width: 15em;
              height: 15em;
              overflow: hidden;
              @include media(">tablet") {
                margin-right: 1rem;
                box-shadow: 0 0 4px 0 rgba(0, 0, 0, .15);
                padding: 0.25em;
                width: 5em;
                height: 5em;
              }

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }

            .middleLeft {
                flex: 3;
                order: 2;
                display: flex;
                flex-wrap: wrap;
                padding: 0 0 1rem;
                @include media(">tablet") {
                  order: 1;
                }

                .title {
                  font-weight: 500;
                  margin: 0 0 1rem 0;
                  width: 100%;
                }

                .content {
                  font-size: 0.9rem;
                  line-height: 1.5;
                  margin-top: 0;
                  width: 100%;
                }

                .expiryWrapper {
                  padding-right: 2em;
                }

                .label {
                  font-size: 0.75rem;
                  margin: 0;
                  color: #999;
                  font-weight: 400;
                  text-transform: uppercase;
                }

                .data {
                  font-size: 0.875rem;
                  font-weight: 400;
                  margin: 0;
                }
            }

            .middleRight {
              flex: 1;
              order: 1;
              display: flex;
              flex-direction: column;
              text-align: right;
              padding: 0 1rem 1rem;
              @include media(">tablet") {
                order: 2;
              }
              .teaserText {
                  padding: 0 0.75em;
                  margin-bottom: 0.5em;
                  background-color: $font-color;
                  color: white;
                  text-align: center;
                  font-weight: 500;
                  font-size: 0.75rem;
                  text-transform: uppercase;
                  font-family: $second-font-family;
                  display: inline-block;
                  transform: skew(-10deg);
                  width: fit-content;
                  align-self: flex-end;
              }
              .price {
                font-size: 1.25rem;
                font-weight: bold;
                text-align: center;
                @include media(">tablet") {
                  text-align: right;
                }
              }
            }

            .right {
                flex: 1;
                order: 4;
                text-align: center;

                #dealBtn {
                    margin: 0;
                }
            }
        }
    }
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'

    export default {
        props: {
            deal: {
                type: Object,
                default() {
                    return {
                        code: null,
                        expiry: null,
                        html: null,
                        image: null,
                        price: null,
                        title: null,
                        url: null,
                        content: null,
                        button_text: null,
                        teaser_text: null,
                    }
                }
            },
            amp: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        computed: {
            buttonText() {
                if(this.deal) {
                    if(this.deal.button_text) {
                        if(this.deal.button_text.length == 0) {
                            return 'BUY NOW'
                        } else {
                            return this.deal.button_text
                        }
                    }
                    return 'BUY NOW'
                }
            }
        },
        components: {
            ImageElement
        }
    }
</script>
