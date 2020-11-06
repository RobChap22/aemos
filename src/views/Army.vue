<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner
          sticky
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ army.name }}</v-list-item-title>

              <v-list-item-subtitle class="text--primary">{{ army.faction }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Requisition</v-list-item-action-text>


              <h1>{{ army.requisition }}</h1>
            </v-list-item-action>
          </v-list-item>
        </v-banner>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
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

      <v-col>
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Supply Limit:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>{{ army.supplyLimit }}</v-list-item-action-text>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Supply Used:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>{{ army.supplyUsed }}</v-list-item-action-text>
          </v-list-item>
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
