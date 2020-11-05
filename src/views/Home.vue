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
      <v-col
        v-for="(army, i) in armies"
        :key="i"
        :cols="army.flex"
      >
        <v-card
          outlined
          @click='pushToArmy(army.id)'
        >

          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ army.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ army.faction}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          outlined
          @click='pushToCreateArmy'
        >

          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Create
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { readArmies } from "@/api/firebaseMethods";

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      armies: null,
    }
  },

  methods: {
    pushToArmy(id) {
      return this.$router.push({ name: 'Army', params: { id } });
    },
    pushToCreateArmy() {
      return this.$router.push({ name: 'CreateArmy' })
    },
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
  },

  async mounted() {
    const response = await readArmies();
    this.armies = response;
  },

});
</script>
