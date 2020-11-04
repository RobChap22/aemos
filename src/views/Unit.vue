<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner
          sticky
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{ unit.name }}</v-list-item-title>

              <v-list-item-subtitle class="text--primary">{{ unit.role }}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Cost</v-list-item-action-text>
              <h1>{{ unit.supplyCost }}</h1>
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

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { readSingleUnit } from "@/api/firebaseMethods";

  export default Vue.extend({
    name: 'Unit',

    data() {
      return {
        unit: null,
      }
    },

    async mounted() {
      const response = await readSingleUnit(this.$route.params.id);
      this.unit = response;
      console.log(response);
    },
  })
</script>
