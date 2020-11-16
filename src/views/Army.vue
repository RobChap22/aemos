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
            <div class="fraction pr-3">
              <span class="numerator">{{ supplyUsed }}</span>
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

      <v-col cols='4' v-if='army.requisition'>
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

    <v-row v-if='$store.state.armyUnits'>
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
              max-height='44'
              max-width='44'
              :src='unit.roleImg'
            ></v-img>
          </div>
          <div class='center-container'>
            <h4>{{ unit.name }}</h4>
          </div>

          <div class='card-unit-info'>
            <div class='crusade-points-display'>
              <h4>{{ unit.crusadePoints }}</h4>
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
                 <v-icon color='secondary'>mdi-plus</v-icon>
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
              @click="pushToDeleteArmy(army.id)"
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
                  @click="updateCurrentArmy"
                >
                  Save
                </v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-form>
              <p>requisition</p>
              <number-input
                v-model='updateRequisition'
                :min="0"
                :max="5"
                inline
                center
                controls
                size="large"
              ></number-input>

              <p>supply limit</p>
              <number-input
                v-model='updateSupplyLimit'
                :min="50"
                :step="5"
                inline
                center
                controls
                size="large"
              ></number-input>

              <p>Battle tally</p>
              <number-input
                v-model='updateBattleTally'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>

              <p>Battles won</p>
              <number-input
                v-model='updateBattlesWon'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>

            </v-form>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateArmy, deleteArmy } from "@/api/firebaseMethods";


  export default Vue.extend({
    name: 'Army',

    data () {
      return {
        dialog: false,
        updateRequisition: 0,
        updateSupplyLimit: 0,
        updateBattleTally: 0,
        updateBattlesWon: 0,
      }
    },

    methods: {
      pushToUnit(id) {
        return this.$router.push({ name: 'Unit', params: { id } });
      },
      pushToCreateUnit(id) {
        return this.$router.push({ name: 'CreateUnit', params: { id } })
      },
      async updateCurrentArmy() {
        await updateArmy({
          armyId: this.$route.params.id,
          requisition: this.updateRequisition,
          supplyLimit: this.updateSupplyLimit,
          battleTally: this.updateBattleTally,
          battlesWon: this.updateBattlesWon,
        });
        this.$store.dispatch('setUserArmies', this.$auth.user.sub);
        this.dialog = false;
      },
      async pushToDeleteArmy(id) {
        await deleteArmy(id)
        return this.$router.push({ name: 'Home' })
      }
    },

    computed: {
      army() {
        return this.$store.getters.getArmyById(this.$route.params.id)
      },
      supplyUsed() {
        let sum = 0;
        const units = this.$store.state.armyUnits
        units.forEach(unit => {
          sum += parseInt(unit.supplyCost)
        });
        return sum;
      },
    },

    mounted() {
      this.$store.dispatch('setArmyUnits', this.$route.params.id);
      this.updateRequisition = parseInt(this.$store.getters.getArmyById(this.$route.params.id).requisition, 10);
      this.updateSupplyLimit = parseInt(this.$store.getters.getArmyById(this.$route.params.id).supplyLimit, 10);
      this.updateBattleTally = parseInt(this.$store.getters.getArmyById(this.$route.params.id).battleTally, 10);
      this.updateBattlesWon = parseInt(this.$store.getters.getArmyById(this.$route.params.id).battlesWon, 10);
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

