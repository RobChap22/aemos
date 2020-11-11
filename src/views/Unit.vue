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
      <v-col>

        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card-text>
            <v-row>

              <v-list-item-action>
                <v-item-text>Experience</v-item-text>

                <h1>{{ unit.experiencePoints }}</h1>
              </v-list-item-action>

              <v-divider
                class="mx-4"
                vertical
              ></v-divider>

              <v-list-item-action>
                <v-list-item-action-text>Crusade Points</v-list-item-action-text>
                <h1>{{ unit.crusadePoints }}</h1>
              </v-list-item-action>
            </v-row>
            <v-row>
              <v-list-item>{{ unit.rank }}</v-list-item>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>

    <v-row>
      <v-col>
        <h2 @click='pushToArmy(unit.armyRef)' >Back to Roster</h2>
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

</style>
