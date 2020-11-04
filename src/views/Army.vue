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
        v-for="(unit, i) in units"
        :key="i"
        :cols="unit.flex"
      >
        <v-card
          outlined
          class='unitCard'
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

          <v-card-actions>
            <v-btn
              color="orange lighten-2"
              text
            >
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              icon
              @click="unit.show = !show"
            >
              <v-icon>{{ unit.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="unit.show">
              <v-divider></v-divider>

              <v-card-text>
                I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { readSingleArmy, readUnits } from "@/api/firebaseMethods";

  export default Vue.extend({
    name: 'Army',

    data() {
      return {
        army: null,
        units: null,
      }
    },

    methods: {
      pushToArmy(id) {
        return this.$router.push({ name: 'Unit', params: { unitId, armyId } });
      },
    }

    async mounted() {
      const armyResponse = await readSingleArmy(this.$route.params.id);
      this.army = armyResponse;

      const unitResponse = await readUnits(this.$route.params.id)
      this.units = unitResponse;
    },
  })
</script>
