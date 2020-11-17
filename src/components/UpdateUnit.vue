<template>
  <div>
    <v-dialog
      v-model="isDialogueOpen"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mx-2"
          fab
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color='secondary'>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card color='info'>
        <v-toolbar
          color="primary"
        >
          <v-btn
            icon
            @click="isDialogueOpen = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              text
              @click="updateCurrentUnit"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <v-form>
          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Kill Tally</h3>
              <number-input
                v-model='updateKillTally'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>

          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Experience Points</h3>
              <number-input
                v-model='updateExperiencePoints'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>

          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Crusade Points</h3>
              <number-input
                v-model='updateCrusadePoints'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>

          <div class='center-container pt-4'>
            <v-textarea
              label="Equipment"
              v-model='updateEquipment'
              outlined
            ></v-textarea>
          </div>

          <div class='center-container pt-4'>
            <v-text-field
              label="Add Battle Honour"
              v-model='addBattleHonour'
              outlined
            ></v-text-field>
          </div>

          <div class='center-container pt-4'>
            <v-text-field
              label="Add Battlescar"
              v-model='addBattleScar'
              outlined
            ></v-text-field>
          </div>

          <div class='center-container pt-4' v-if='unit.character'>
            <v-text-field
              label="Add Warlord Trait"
              v-model='addWarlordTrait'
              outlined
            ></v-text-field>
          </div>

          <div class='center-container pt-4' v-if='unit.character'>
            <v-text-field
              label="Add Relic"
              v-model='addRelic'
              outlined
            ></v-text-field>
          </div>

          <div class='center-container pt-4' v-if='unit.psyker'>
            <v-text-field
              label="Psychic Powers"
              v-model='updatePsychicPowers'
              outlined
            ></v-text-field>
          </div>

          <div class='center-container py-4'>
            <div>
              <h3 class='text-center'>Power Level</h3>
              <number-input
                v-model='updateSupplyCost'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>


        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateUnit } from "@/api/firebaseMethods";



  export default Vue.extend({
    name: 'UnitExperienceCard',

    data () {
      return {
        isDialogueOpen: false,
        updateEquipment: '',
        updateExperiencePoints: 0,
        updateCrusadePoints: 0,
        addBattleHonour: null,
        addBattleScar: null,
        updateSupplyCost: 0,
        addRelic: null,
        addWarlordTrait: null,
        updatePsychicPowers: '',
        updateKillTally: 0,
      }
    },

    props: {
      unit: {
        type: Object,
        required: true
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
          psychicPowers: this.updatePsychicPowers,
          killTally: this.updateKillTally,
        });
        this.$store.dispatch('setArmyUnits', this.unit.armyRef);
        this.isDialogueOpen = false;
      },
    },

    computed: {
      //
    },

    mounted() {
      this.updateEquipment = this.$store.getters.getUnitById(this.$route.params.id).equipment;
      this.updatePsychicPowers = this.$store.getters.getUnitById(this.$route.params.id).psychicPowers;
      this.updateExperiencePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).experiencePoints, 10);
      this.updateCrusadePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).crusadePoints, 10);
      this.updateSupplyCost = parseInt(this.$store.getters.getUnitById(this.$route.params.id).supplyCost, 10);
      this.updateKillTally = parseInt(this.$store.getters.getUnitById(this.$route.params.id).killTally, 10);
    },
  })
</script>
