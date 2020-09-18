<template>
  <v-app>
      <v-container>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            
            <v-card
              dark
              class="mt-4"
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="ad.title"
                  ></v-card-title>

                  <v-card-subtitle v-text="ad.description"></v-card-subtitle>
                  <v-card-actions>
                    <EditModal v-if="checkOwner" :ad='ad'></EditModal>
                    <v-btn class="ml-3" color="primary">Buy</v-btn>
                  </v-card-actions>

                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="ad.imageSrc"></v-img>
                </v-avatar>
              </div>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>

<script>
import EditModal from './EditModal'
export default {
  props: ['id'],

  components: {
    EditModal
  },
  
  computed: {
    ad() {
      const id = this.id
      return this.$store.getters.getById(id)
    },

    checkOwner() {
      return this.ad.ownerId == this.$store.getters.user.id
    }
  }
};
</script>

<style>

</style>
