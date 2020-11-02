<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(army, i) in armies"
        :key="i"
        :cols="army.flex"
      >
        <v-card
          outlined
          @click='pushToArmy(army.sys.id)'
        >

          <v-list-item >
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">
                {{ army.fields.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ army.fields.faction}}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-text>{{ army.fields.battleTally }}</v-list-item-text>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { armiesIndex } from '@/api/apiClient.ts';

export default Vue.extend({
  name: 'Home',

  data() {
    return {
      armies: null,
    }
  },

  methods: {
    pushToArmy(id) {
      return this.$router.push({ name: 'Army', params: { id } });
    },
  },

  async mounted() {
    const response = await armiesIndex();
    this.armies = response.items;

    console.log(response.items);
  },

});
</script>
