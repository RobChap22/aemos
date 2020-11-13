<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      app
    >
      <v-toolbar-title class="secondary--text" id="navbar-app-name">AEMOS</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on"
          ></v-app-bar-nav-icon>
        </template>
        <v-list
          dense
          nav
          color='info'
        >
          <v-list-item link to='/'>
            <v-list-item-icon>
              <v-icon color='primary'>mdi-home-roof</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link @click='logout' >
            <v-list-item-icon>
              <v-icon color='primary'>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>



    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer padless color='secondary'>
      <v-col
        class="text-center"
        cols="12"
      >
        <div class='center-container'>
          <v-img
            lazy-src="@/assets/ikonography.png"
            max-height="44"
            max-width="44"
            src="@/assets/ikonography.png"
          ></v-img>
        </div>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import Vue from 'vue';
import { useAuth0 } from "./auth/index";

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  methods: {
    logout() {
      // useAuth0.logout({
      //  returnTo: 'https://nervous-knuth-431792.netlify.app',
      //  client_id: 'w3I4k0TPJTRaRcCAYJQla2mZycp7ypcx'
      // });
    }
  }
});
</script>

<style>

  #navbar-app-name {
    font-family: 'Orbitron', sans-serif;
    color: secondary;
  }

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

