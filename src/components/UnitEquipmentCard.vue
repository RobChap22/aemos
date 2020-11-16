<template>
  <v-row dense>
    <v-col cols="12">
      <v-card
        color="info"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Equipment:</v-list-item-title>

            <v-list-item-subtitle>{{ unit.equipment }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if='unit.character && unit.warlordTraits && unit.warlordTraits.length'>
          <v-list-item-content>
            <v-list-item-title>Warlord Trait:</v-list-item-title>

            <v-list-item-subtitle>{{ unit.warlordTraits.join(', ') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if='unit.character && unit.relics && unit.relics.length'>
          <v-list-item-content>
            <v-list-item-title>Relics:</v-list-item-title>
            <v-list-item-subtitle>{{ unit.relics.join(', ') }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if='unit.psyker'>
          <v-list-item-content>
            <v-list-item-title>Psychic Powers:</v-list-item-title>
            <v-list-item-subtitle>{{ unit.psychicPowers }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>



<script lang="ts">
  import Vue from 'vue'


  export default Vue.extend({
    name: 'UnitEquipmentCard',

    data () {
      return {
        //
      }
    },

    props: {
      unit: {
        type: Object,
        required: true,
      }
    },

    methods: {
      //
    },
  })
</script>

<style>
  .unit-numerical-display {
    justify-content: center;
    text-align: right;
  }
  .unit-supply-cost {
    font-size: 1.8rem;
  }
  .unit-crusade-points {
    opacity: 0.5;
  }

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
