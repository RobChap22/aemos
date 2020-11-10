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
        :cols="unit.flex"
      >
        <v-card
          outlined
          class='unitCard'
          @click="pushToUnit(unit.id)"
        >

          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ unit.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ unit.role}}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-text>{{ unit.supplyCost }}</v-list-item-text>
          </v-list-item>

        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          outlined
          class='unitCard'
          @click="pushToCreateUnit(army.id)"
        >
          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                Add Unit
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

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
</style>
