<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(army, i) in armies"
        :key="i"
        :cols="army.flex"
      >
        <v-card>
          <h1>{{ army.name }}</h1>
          <p>{{ army.faction }}</p>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form>
          <v-text-field label='Name' v-model='formName'></v-text-field>
          <v-autocomplete label='Faction' :items='factions' v-model='formFaction'></v-autocomplete>

          <v-btn
            type='submit'
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
  import { readArmies, createArmy } from "@/api/firebaseMethods";



  export default Vue.extend({
    name: 'Firebase',

    data() {
      return {
        armies: null,
        factions: ['Imperium', 'Chaos', 'Aeldari', 'Tyranids', 'Orks', 'Necrons', 'Tau Empire'],
        formName: '',
        formFaction: '',
      }
    },

    methods: {
      createNewArmy() {
        createArmy({ name: this.formName, faction: this.formFaction});
      },
    },

    async mounted() {
      const response = await readArmies();
      this.armies = response;
    }
  })
</script>

