<template>
  <v-app>
    <v-navigation-drawer app temporary v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Promo application
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.url"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="loggedUser"
          @click="onLogout"
        >Logout</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark dense>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

      <router-link 
        tag="v-toolbar-title"
        class="pointer"
        to="/"
      >MY APPLICATION</router-link>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in links" :key="item.url" :to="item.url">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn v-if="loggedUser"
          @click="onLogout"
        >Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <router-view></router-view>
        </v-flex>
      </v-layout>
    </v-container>
    <template v-if="error">
      <v-snackbar
        :timeout="3500"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn dark @click.native="closeError">Закрыть</v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
import * as fb from 'firebase'

export default {
  data() {
    return {
      drawer: false,
    };
  },

  methods: {
    closeError() {
      this.$store.dispatch('clearError')
    },

    onLogout() {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  },

  computed: {
    error() {
      return this.$store.getters.error
    },

    loggedUser() {
      return this.$store.getters.loggedUser
    },

    links() {
      if (this.loggedUser) {
        return [
        {
          title: 'Orders',
          icon: 'mdi-eye',
          url: '/orders',
        },
        {
          title: 'New ad',
          icon: 'mdi-plus',
          url: '/create',
        },
        {
          title: 'My ads',
          icon: 'mdi-bell',
          url: '/list',
        },
        ]
      }

      return [
        {
          title: 'Login',
          icon: 'mdi-lock',
          url: '/login',
        },
        {
          title: 'Registration',
          icon: 'mdi-account',
          url: '/registration',
        },
      ]
    }
  },

  created() {
    fb.initializeApp({
        apiKey: "AIzaSyCtN2FOlrFSHmoJVMnYq5V0XL7732dkELY",
        authDomain: "ad-project-vue.firebaseapp.com",
        databaseURL: "https://ad-project-vue.firebaseio.com",
        projectId: "ad-project-vue",
        storageBucket: "ad-project-vue.appspot.com",
        messagingSenderId: "588515824026",
        appId: "1:588515824026:web:dcf0fe31126efca02eea23",
        measurementId: "G-HQD7KDVCSB"
    });

    fb.auth().onAuthStateChanged(user => {
      if(user && user !== undefined) {
        this.$store.dispatch('activeUser', user)
      }
    });

    this.$store.dispatch('fetchAds')
    
  }
};
</script>

<style lang="stylus">
  .pointer {
    cursor pointer
  }
</style>
