<template>
  <div :class="$style.wrapper">
    <span :class="[$style.prodBtn, $style[provider], $style[size]]">
        <a :href="link" target="_blank" rel="noopener">{{ text }}</a>
    </span>
  </div>
</template>

<style lang="scss" module>
    .wrapper {
      .prodBtn {
        margin: 1rem auto;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;

        a {
          display: block;
          color: white;
          padding: 1rem;
          font-size: 1rem;
          font-weight: 300;
          box-shadow: 0 1px 4px 0 rgba(0,0,0,.25);
          width: 100%;
          @include media(">=tablet") {
            width: 60%;
          }

          &:hover {
            text-decoration: none;
            box-shadow: none;
          }

          &:before {
            display: block;
            content: "";
            background-size: contain;
            background-repeat: no-repeat;
            height: 30px;
            position: relative;
            margin: 0 auto;
          }
        }

        &.large {

          a {
            font-size: 1.25em;
          }
        }

        &.small {

          a {
            font-size: 0.875em;
          }
        }

        &.amazon {
          a {
            background-color: #ff9900;

            &:hover {
              background-color: darken(#ff9900, 2%);
            }

            &:before {
              background-image: url('~/assets/images/logos/amazon_logo.png');
              width: 85px;
            }
          }
        }

        &.ebay {
          a {
            background-color: #0064d2;

            &:hover {
              background-color: darken(#0064d2, 2%);
            }

            &:before {
              background-image: url('~/assets/images/logos/ebay_logo.png');
              width: 80px;
            }
          }
        }

        &.googleplay {
          a {
            background-color: $black;
            width: auto;
            padding: 6px 8px 0;
            border-radius: 5px;

            &:hover {
              background-color: darken($black, 2%);
            }

            &:before {
              background-image: url('~/assets/images/logos/googleplay_logo.png');
              width: 150px;
              height: 50px;
            }
          }
        }

        &.other {
          a {
            background-color: $color-primary;

            &:hover {
              background-color: darken($color-primary, 2%);
            }

            &:before {
              background-image: url('~/assets/images/logos/mobile_logo.svg');
              width: 70px;
              height: 50px;
            }
          }
        }
      }
    }
</style>

<script>
    export default {
        props: {
            provider: {
                type: String,
                default() {
                    return 'amazon'
                }
            },
            size: {
                type: String,
                default() {
                    return 'large'
                }
            },
            text: {
                type: String,
                default() {
                    return ''
                }
            },
            link: {
                type: String,
                default() {
                    return ''
                }
            }
        }
    }
</script>
