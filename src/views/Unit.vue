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
        </v-card>
      </v-col>

      <v-col
        v-if='unit.relic'
        cols="12"
      >
        <v-card
          color="info"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Relic:</v-list-item-title>

              <v-list-item-subtitle>{{ unit.relic }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        v-if='unit.warlordTrait'
        cols="12"
      >
        <v-card
          color="info"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Warlord Trait:</v-list-item-title>

              <v-list-item-subtitle>{{ unit.warlordTrait }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col
        v-if='unit.psychicPowers'
        cols="12"
      >
        <v-card
          color="info"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Psychic Powers:</v-list-item-title>

              <v-list-item-subtitle>{{ unit.psychicPowers.join(', ') }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols='12'>
        <v-card
          color='info'
          class="pa-2"
        >
          <div class='d-flex'>
            <div class='center-container'>
              <h3>{{rank}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class='center-container'>
              <p class="unit-supply-cost" :key='keyTrick'>{{ unit.experiencePoints }}</p>
            </div>
          </div>
          <div>
            <v-list-item v-if='unit.battleHonours && unit.battleHonours.length'>
              <v-list-item-content>
                <v-list-item-title>Battle Honours:</v-list-item-title>

                <v-list-item-subtitle>{{ unit.battleHonours.join(', ') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div>
            <v-list-item v-if='unit.battleScars && unit.battleScars.length'>
              <v-list-item-content>
                <v-list-item-title>Battlescars:</v-list-item-title>

                <v-list-item-subtitle>{{ unit.battleScars.join(', ') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>

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
          <v-card>
            <v-toolbar
              dark
              color="primary"
            >
              <v-btn
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn
                  dark
                  text
                  @click="updateCurrentUnit"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form>

              <p>XP</p>
              <number-input
                v-model='updateExperiencePoints'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>

              <p>Crusade points</p>
              <number-input
                v-model='updateCrusadePoints'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>

              <v-row>
                <v-col cols="12" md="6">
                  <v-textarea
                    name="input-7-1"
                    label="Equipment"
                    v-model='updateEquipment'
                  ></v-textarea>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    label="Add Battle Honour"
                    v-model='addBattleHonour'
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col
                  cols="12"
                  sm="6"
                  md="3"
                >
                  <v-text-field
                    label="Add Battlescar"
                    v-model='addBattleScar'
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>


            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </template>


  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateUnit } from "@/api/firebaseMethods";

  export default Vue.extend({
    name: 'Unit',

    data () {
      return {
        dialog: false,
        keyTrick: 0,
        updateEquipment: '',
        updateExperiencePoints: 0,
        updateCrusadePoints: 0,
        addBattleHonour: '',
        addBattleScar: '',
      }
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
        });
        this.$store.dispatch('setArmyUnits', this.unit.armyRef);
        this.dialog = false;
      },
    },

    computed: {
      unit() {
        return this.$store.getters.getUnitById(this.$route.params.id)
      },

      rank() {
        const xp = this.$store.getters.getUnitById(this.$route.params.id).experiencePoints
        if (xp <= 5) {
          return 'Battle-Ready';
        } else if (xp > 5 && xp <= 15) {
          return 'Blooded';
        } else if (xp > 15 && xp <= 30) {
          return 'Battle-Hardened';
        } else if (xp > 30 && xp <= 50) {
          return 'Heroic';
        } else {
          return 'Legendary';
        }
      },
    },

    mounted() {
      this.updateEquipment = this.$store.getters.getUnitById(this.$route.params.id).equipment;
      this.updateExperiencePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).experiencePoints, 10);
      this.updateCrusadePoints = parseInt(this.$store.getters.getUnitById(this.$route.params.id).crusadePoints, 10);
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
