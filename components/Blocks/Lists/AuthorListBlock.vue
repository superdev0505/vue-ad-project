<template>
    <div :class="$style.wrapper">
        <div :class="$style.avatar">
          <nuxt-link :to="'/author/' + author.slug">
              <image-element :class="$style.image" v-if="author.avatar" :obj="author.avatar" />
              <image-element :class="$style.image" v-else :src="author.avatar_urls['96']" />  
          </nuxt-link>
        </div>  
        <div :class="$style.details">
        <nuxt-link :to="'/author/' + author.slug">
            <span :class="$style.position">
                {{ author.position }}
            </span>        
            <h3 :class="$style.name">
                {{ author.name }}
            </h3>
        </nuxt-link>
        <author-social-list-block :social="author.social" />
        <span :class="$style.description">
            {{ author.description }}
        </span>
        <div :class="$style.post"  v-if="author.recent && author.recent.permalink" >
            <div :class="$style.title">
                Latest Post:            
            </div>
            <nuxt-link :to="'/' + author.recent.permalink">
              {{ author.recent.title }}
            </nuxt-link>
        </div>
        </div>
    </div>
</template>

<style lang="scss" module>
    .wrapper {
        padding: 1.5em 0;
        display: block;
        border-bottom: 1px solid $grey-bg;

        .avatar {
            padding: 0 1.5em 0 0;
            
            .image {
                width: 150px !important;
            }
        
        }
        
        .details {
          position: relative;
          width: 100%;
            
            a {
                &:hover {
                    text-decoration:none;        
                }              
              
                .position {
                  text-transform:uppercase;
                  margin-top:0;
                  font-family: Roboto;	
                  font-size: 12px;	
                  font-style: italic;	
                  font-weight: bold;              
                }
                            
                .name {
                  margin-top:0;
                  color: $color-primary;              
                }
            }
            
            .description {
              font-size: 1em;
              font-weight: normal;
            }
            
            .post {
                margin-top: 1.5rem;
                font-family: Roboto;	                
                
              .title {
                  text-transform:uppercase;
                  margin-bottom:0.25rem;
                  font-size: 14px;	
                  font-style: italic;	
                  font-weight: bold;                 
              }
              
              a {
                font-weight:500;
                color: $color-primary;
              }
              
            }
        }

    }
    
    // desktop and up
    @media screen and (min-width: 500px) {

        .wrapper {                 
            display:flex;
        }
        
    }    
</style>

<script>
    import ImageElement from '~/components/Elements/ImageElement'
    import AuthorSocialListBlock from '~/components/Blocks/Lists/AuthorSocialListBlock'

    export default {
        props: {
            author: {
                type: Object,
                required: true
            }
        },
        components: {
            ImageElement,
            AuthorSocialListBlock
        }
    }
</script>