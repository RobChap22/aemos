<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card color='info' class="d-flex justify-space-between pa-2">
          <div>
            <v-card-title class="headline">
              {{ unit.name }}
            </v-card-title>
            <v-card-subtitle>{{ unit.unitType}}</v-card-subtitle>
          </div>
          <div>
            <div class="unit-numerical-display pr-3">
              <p class="unit-supply-cost">{{ unit.supplyCost }}</p>
              <p class="unit-crusade-points">0</p>
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
              <h3>Rank</h3>
            </div>
            <v-spacer></v-spacer>
            <div class='center-container'>
              <p class="unit-supply-cost">{{ unit.experiencePoints }}</p>
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
  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Unit',

    methods: {
      pushToArmy(id) {
        return this.$router.push({ name: 'Army', params: { id } });
      },
    },

    computed: {
      unit() {
        return this.$store.getters.getUnitById(this.$route.params.id)
      },

      // rank() {
        // const xp = this.$store.getters.getUnitById(this.$route.params.id).experiencePoints
        // if (xp <== 5) {return 'Battle-Ready';}
      // },
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
