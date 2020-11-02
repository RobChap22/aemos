<template>
  <v-container>
    <v-row>
      <v-col>
        <v-banner
          sticky
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Army Name</v-list-item-title>

              <v-list-item-subtitle class="text--primary">Necron</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-list-item-action-text>Requisition</v-list-item-action-text>


              <h1>4</h1>
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

            <v-list-item-action-text>
              4
            </v-list-item-action-text>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Battles Won:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>
              2
            </v-list-item-action-text>
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

            <v-list-item-action-text>
              55
            </v-list-item-action-text>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Supply Used:</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action-text>
              51
            </v-list-item-action-text>
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

    data: () => ({
    }),
  })
</script>
