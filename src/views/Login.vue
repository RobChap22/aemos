<template>
  <v-container>

    <v-row>
      <div v-if="!$auth.loading">
        <!-- show login when not authenticated -->
        <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <!-- show logout when authenticated -->
        <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
      </div>
    </v-row>


    <v-row>
      <v-btn @click="showAuth">
        SHOW USER
      </v-btn>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { readArmies } from "@/api/firebaseMethods";

export default Vue.extend({
  name: 'Login',

  data() {
    return {
      armies: null,
    }
  },

  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    showAuth() {
      console.log(this.$auth.user.sub);
    }
  },

});
</script>
