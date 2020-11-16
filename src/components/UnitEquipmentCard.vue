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
  import { updateUnit } from "@/api/firebaseMethods";


  export default Vue.extend({
    name: 'UnitEquipmentCard',

    data () {
      return {
        dialog: false,
        keyTrick: 0,
        updateEquipment: '',
        updateExperiencePoints: 0,
        updateCrusadePoints: 0,
        addBattleHonour: null,
        addBattleScar: null,
        updateSupplyCost: 0,
        addRelic: null,
        addWarlordTrait: null,
        addPsychicPower: null,
      }
    },

    props: {
      unit: {
        type: Object,
        required: true,
      }
    },

    methods: {
      async updateCurrentUnit() {
        await updateUnit({
          unitId: this.$route.params.id,
          equipment: this.updateEquipment,
          experiencePoints: this.updateExperiencePoints,
          crusadePoints: this.updateCrusadePoints,
          battleHonours: this.addBattleHonour,
          battleScars: this.addBattleScar,
          supplyCost: this.updateSupplyCost,
          relics: this.addRelic,
          warlordTraits: this.addWarlordTrait,
          psychicPowers: this.addPsychicPower,
        });
        this.$store.dispatch('setArmyUnits', this.unit.armyRef);
        this.dialog = false;
      },
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
