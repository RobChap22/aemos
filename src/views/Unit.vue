<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card color='info' class="d-flex pa-2">
          <div class='center-container img-box'>
            <v-img
              max-height='80'
              max-width='80'
              :src='unit.roleImg'
            ></v-img>
          </div>
          <div>
            <v-card-title class="headline">
              {{ unit.name }}
            </v-card-title>
            <v-card-subtitle>{{ unit.unitType}}</v-card-subtitle>
          </div>
          <v-spacer></v-spacer>
          <div>
            <div class="unit-numerical-display pr-3">
              <p class="unit-supply-cost">{{ unit.supplyCost }}</p>
              <p class="unit-crusade-points">{{ unit.crusadePoints }}</p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <UnitEquipmentCard :unit="unit"></UnitEquipmentCard>

    <UnitExperienceCard :unit="unit"></UnitExperienceCard>

    <v-row>
      <v-col
        cols="4"
        align-self='center'
      >
        <v-card
          flat
          color='secondary'
        >
          <div class='center-container'>
            <v-btn
              class="mx-2"
              fab
              dark
              color="primary"
              @click="pushToArmy(unit.armyRef)"
            >
                 <v-icon color='secondary'>mdi-arrow-left-thick</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <v-col
        cols="4"
        align-self='center'
      >
        <v-card
          flat
          color='secondary'
        >
          <div class='center-container'>
            <v-btn
              class="mx-2"
              fab
              dark
              color="primary"
              @click="pushToDeleteUnit(unit.id)"
            >
                 <v-icon color='secondary'>mdi-delete-forever</v-icon>
            </v-btn>
          </div>

        </v-card>
      </v-col>
    </v-row>


    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              Update
            </v-btn>
          </template>
          <v-card color='info'>
            <v-toolbar
              color="primary"
            >
              <v-btn
                icon
                @click="dialog = false"
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

              <div class='center-container pt-4'>
                <v-text-field
                  label="Add Warlord Trait"
                  v-model='addWarlordTrait'
                  outlined
                ></v-text-field>
              </div>

              <div class='center-container pt-4'>
                <v-text-field
                  label="Add Relic"
                  v-model='addRelic'
                  outlined
                ></v-text-field>
              </div>

              <div class='center-container pt-4'>
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
      </v-row>
    </template>


  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateUnit, deleteUnit } from "@/api/firebaseMethods";
  import UnitExperienceCard from "@/components/UnitExperienceCard.vue";
  import UnitEquipmentCard from "@/components/UnitEquipmentCard.vue";


  export default Vue.extend({
    name: 'Unit',

    data () {
      return {
        dialog: false,
        updateEquipment: '',
        updateExperiencePoints: 0,
        updateCrusadePoints: 0,
        addBattleHonour: null,
        addBattleScar: null,
        updateSupplyCost: 0,
        addRelic: null,
        addWarlordTrait: null,
        updatePsychicPowers: '',
      }
    },

    components: {
      UnitExperienceCard,
      UnitEquipmentCard,

    },

    methods: {
      pushToArmy(id) {
        return this.$router.push({ name: 'Army', params: { id } });
      },
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
        });
        this.$store.dispatch('setArmyUnits', this.unit.armyRef);
        this.dialog = false;
      },
       async pushToDeleteUnit(id) {
        const armyId = this.unit.armyRef;
        console.log(armyId);
        await deleteUnit(id);
        return this.$router.push({ name: 'Army', params: { armyId } });
      }
    },

    computed: {
      unit() {
        return this.$store.getters.getUnitById(this.$route.params.id)
      },
    },

    mounted() {
      this.updateEquipment = this.$store.getters.getUnitById(this.$route.params.id).equipment;
      this.updatePsychicPowers = this.$store.getters.getUnitById(this.$route.params.id).psychicPowers;
      this.updateExperiencePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).experiencePoints, 10);
      this.updateCrusadePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).crusadePoints, 10);
      this.updateSupplyCost = parseInt(this.$store.getters.getUnitById(this.$route.params.id).supplyCost, 10);
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
