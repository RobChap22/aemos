<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card color='info' class="d-flex pa-2">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ army.name }}</v-list-item-title>

              <v-list-item-subtitle class="text--primary">{{ army.faction }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <div>
            <div class="fraction">
              <span class="numerator">{{ army.supplyUsed }}</span>
              <span class="divide">/</span>
              <span class="denominator">{{ army.supplyLimit }}</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify='space-between' align='center'>
      <v-col cols='7'>
        <v-card color='info'>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Battle Tally:</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action-text>{{ army.battleTally }}</v-list-item-action-text>
          </v-list-item>



          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Battles Won:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>{{ army.battlesWon }}</v-list-item-action-text>
          </v-list-item>
        </v-card>
      </v-col>

      <v-col cols='4'>
        <v-card color='info' class="d-flex align-center pa-2">
          <div>
            <h2>Req</h2>
          </div>
          <v-spacer></v-spacer>
          <div>
            <div class="fraction">
              <span class="numerator">{{ army.requisition }}</span>
              <span class="divide">/</span>
              <span class="denominator">5</span>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        v-for="(unit, i) in $store.state.armyUnits"
        :key="i"
        cols="4"
      >



        <v-card
          color='info'
          class='unitCard'
          @click="pushToUnit(unit.id)"
        >
          <div class='center-container img-box'>
            <v-img
              lazy-src="@/assets/HQ.png"
              max-height="44"
              max-width="44"
              src="@/assets/HQ.png"
            ></v-img>
          </div>

          <div class='center-container'>
            <h4>{{ unit.name }}</h4>
          </div>

          <div class='card-unit-info'>
            <div class='crusade-points-display'>
              <h4>1</h4>
              <p>Crusade</p>
            </div>

            <div class='power-cost-display'>
              <h4>{{ unit.supplyCost }}</h4>
              <p>Power</p>
            </div>
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
              @click="pushToCreateUnit(army.id)"
            >
                 <v-icon dark>mdi-plus</v-icon>
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
    name: 'Army',

    methods: {
      pushToUnit(id) {
        return this.$router.push({ name: 'Unit', params: { id } });
      },
      pushToCreateUnit(id) {
        return this.$router.push({ name: 'CreateUnit', params: { id } })
      }
    },

    computed: {
      army() {
        return this.$store.getters.getArmyById(this.$route.params.id)
      },
    },

    mounted() {
      this.$store.dispatch('setArmyUnits', this.$route.params.id)
    },
  })
</script>


<style>
  .fraction {
    display: flex;
    justify-content: center;
    width: 50px;
    transform: rotate(16deg);
    font-size: 1.8rem;
  }

  .denominator,
  .numerator {
    transform: rotate(-16deg);
  }

  .denominator {
    display: flex;
    align-items: flex-end;
  }

  .divide {
    font-size: 3rem;
  }

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-box {
    padding: 7px;
  }


  .card-unit-info{
    display: flex;
    justify-content: space-between;
    padding-left: 6px;
    padding-right: 6px;
  }

  .crusade-points-display {
    opacity: 0.5;
  }
  .crusade-points-display p {
    font-size: 0.8em;
  }

  .power-cost-display {
    padding-left: 1em;
  }
  .power-cost-display h4 {
    text-align: right;
  }
  .power-cost-display p {
    font-size: 0.8em;
  }

  #new-unit-card-text {
    color: #eb5e28;
  }

  .divide {
    color: #eb5e28;
  }
</style>

