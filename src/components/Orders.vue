<template>
  <v-app>
    <v-container>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3 mt-15>
          <h1 class="text--secondary">Orders</h1>
          <v-list
            subheader
            two-line
            flat
            mt-30
          >
            <v-list-item-group
              multiple
            >
              <v-list-item
                v-for="order of orders"
                :key="order.id"
              >
                <template>
                  <v-list-item-action>
                    <v-checkbox
                      :input-value="order.done"
                      color="success"
                      @change="markDone(order)"
                    ></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{order.name}}</v-list-item-title>
                    <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-tile-action>
                    <v-btn class="primary" :to="'/ad/' + order.adID">OPEN</v-btn>
                  </v-list-tile-action>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id:"ord1",
          name: "Elmore",
          phone: "8(920)834-25-37",
          adID: '1',
          done: false,
        }
      ]
    }
  },

  methods: {
    markDone(order) {
      order.done = true;
    },
  },

};
</script>

<style>

</style>
