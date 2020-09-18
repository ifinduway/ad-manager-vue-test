<template>
  <v-app>
    <v-container v-if="!loading">
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="(ad,i) in promoAds"
              :key="i"
              :src="ad.imageSrc"
              reverse-transition="fade-transition"
              transition="fade-transition"
            >
              <div 
                class="carousel-btt"
              >
                <v-btn class="error" :to="'/ad/' + ad.id">OPEN</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg v-if="!loading">
      <v-layout row wrap>
        <v-flex 
          xs12
          sm6
          md4
          mt-10
          v-for="(ad,i) of ads"
          :key="i"
          >
            <v-card
              class="mx-auto"
              max-width="400"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="ad.imageSrc"
              >
                <v-card-title>{{ad.title}}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0">{{ad.description}}</v-card-subtitle>

              <v-card-actions>
                <v-btn
                  color="success"
                >
                  Share
                </v-btn>

                <v-btn
                  class="primary"
                  raised
                  :to="'/ad/' + ad.id"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-else>
      <v-layout row>
        <v-flex xs12>
          <div class="text-xs-center">
            <v-progress-circular indeterminate :size="70" :width="7" color="purple"></v-progress-circular>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {

  data() {
    return {
    };
  },

  computed: {
    promoAds() {
      return this.$store.getters.promoAds
    },
    ads() {
      return this.$store.getters.ads
    },

    loading() {
      return this.$store.getters.loading
    }
  }

};
</script>

<style lang="stylus" scoped>
  .carousel-btt {
    position absolute
    bottom 50px
    left 50%
    background-color rgba(0,0,0,0.3)
    display flex
    justify-content center
    align-items center
    text-align center
    transform translate(-50%,0)
    cursor pointer
    padding 10px 20px
    border-top-left-radius 10px
    border-top-right-radius 10px
  }

  .text-xs-center {
    display flex
    justify-content center
  }
</style>
