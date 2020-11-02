<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner
          sticky
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ army[0].fields.name }}</v-list-item-title>

              <v-list-item-subtitle class="text--primary">{{ army[0].fields.faction }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Requisition</v-list-item-action-text>


              <h1>{{ army[0].fields.requisition }}</h1>
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

            <v-list-item-action-text>{{ army[0].fields.battleTally }}</v-list-item-action-text>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Battles Won:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>{{ army[0].fields.battlesWon }}</v-list-item-action-text>
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

            <v-list-item-action-text>{{ army[0].fields.supplyLimit }}</v-list-item-action-text>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Supply Used:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>{{ army[0].fields.supplyUsed }}</v-list-item-action-text>
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
          @click='pushToUnit(unit.sys.id)'
        >

          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ unit.fields.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ unit.fields.role}}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-text>{{ unit.fields.cost }}</v-list-item-text>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import * as Contentful from 'contentful';
  import { armiesShow, unitsShow } from '@/api/apiClient.ts';

  export default Vue.extend({
    name: 'Army',

    data() {
      return {
        army: null,
        units: null
      }
    },

    methods: {
      pushToUnit(id) {
        return this.$router.push({ name: 'Unit', params: { id } });
      },
    },

    async mounted() {
      const armyResponse = await armiesShow();
      this.army = armyResponse.items;

      const unitResponse = await unitsShow();
      this.units = unitResponse.items;
      console.log(unitResponse.items);
    },
  })
</script>
