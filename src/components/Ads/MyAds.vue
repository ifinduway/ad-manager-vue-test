<template>
  <v-app>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <h1>MyAds</h1>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <v-flex 
                  xs12
                  sm6
                  md4
                  mt-10
                  v-for="(ad,i) of myAds"
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
                          class="primary"
                          raised
                          :to="'/ad/' + ad.id"
                        >
                          Open this ad
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
export default {
  computed: {
    myAds() {
      const userID = this.$store.state.user.user.id
      return this.$store.getters.myAds(userID)
    }
  }
};
</script>

<style>

</style>
