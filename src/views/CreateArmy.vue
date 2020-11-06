<template>
  <v-container>

    <v-row>
      <v-col>
        <v-form>
          <v-text-field label='Name' v-model='formName'></v-text-field>
          <v-autocomplete label='Faction' :items='$store.state.factions' v-model='formFaction'></v-autocomplete>

          <v-btn
            color='primary'
            @click='createNewArmy'
          >
            Create
          </v-btn>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { createArmy } from "@/api/firebaseMethods";



  export default Vue.extend({
    name: 'Firebase',

    data() {
      return {
        formName: '',
        formFaction: '',
      }
    },

    methods: {
      async createNewArmy() {
        const id = await createArmy({ name: this.formName, faction: this.formFaction, userId: this.$auth.user.sub });
        this.$store.dispatch('setUserArmies', this.$auth.user.sub)
        return this.$router.push({ name: 'Army', params: { id } });
      },
    },
  })
</script>

