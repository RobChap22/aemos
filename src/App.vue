<template>
  <v-app>
    <v-app-bar
      color="primary"
      dark
      app
    >
      <v-toolbar-title id="navbar-app-name">AEMOS</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link v-if="$auth.isAuthenticated" to="/profile" color='secondary'>Profile</router-link>
      <v-btn icon to="/">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
});
</script>

<style>
  #navbar-app-name {
    font-family: 'Orbitron', sans-serif;
  }
</style>
