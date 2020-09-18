<template>
    <v-row justify="center" row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="warning"
          class="ml-3"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Изменение товара</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col>
                <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ad.title" label="Название товара" required></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="ad.description" label="Описание товара" required></v-text-field>
                </v-col>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="updateAd">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    props: ['ad'],
    data() {
        return {
            dialog: false,
        };
    },

    methods: {
        updateAd() {
            if(this.ad.title !== '' || this.ad.description !== '') {
                const data = {
                    title: this.ad.title,
                    description: this.ad.description,
                    id: this.ad.id,
                }
                this.$store.dispatch('updateAd', data)
                this.dialog = false
            }
        }
    }

}
</script>

<style>

</style>