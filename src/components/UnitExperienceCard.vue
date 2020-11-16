<template>
  <div class='unit-experience-card'>
    <v-row>
      <v-col cols='12'>
        <v-card
          color='info'
          class="pa-2"
        >
          <div class='d-flex'>
            <div class='center-container'>
              <h3>{{rank}}</h3>
            </div>
            <v-spacer></v-spacer>
            <div class='center-container'>
              <p class="unit-supply-cost">{{ unit.experiencePoints }}</p>
            </div>
          </div>
          <div>
            <v-list-item v-if='unit.battleHonours && unit.battleHonours.length'>
              <v-list-item-content>
                <v-list-item-title>Battle Honours:</v-list-item-title>

                <v-list-item-subtitle>{{ unit.battleHonours.join(', ') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div>
            <v-list-item v-if='unit.battleScars && unit.battleScars.length'>
              <v-list-item-content>
                <v-list-item-title>Battlescars:</v-list-item-title>

                <v-list-item-subtitle>{{ unit.battleScars.join(', ') }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { updateUnit } from "@/api/firebaseMethods";



  export default Vue.extend({
    name: 'UnitExperienceCard',

    data () {
      return {
        //
      }
    },

    props: {
      unit: {
        type: Object,
        required: true
      }
    },

    methods: {
      //
    },

    computed: {
      rank() {
        const xp = this.$store.getters.getUnitById(this.$route.params.id).experiencePoints
        if (xp <= 5) {
          return 'Battle-Ready';
        } else if (xp > 5 && xp <= 15) {
          return 'Blooded';
        } else if (xp > 15 && xp <= 30) {
          return 'Battle-Hardened';
        } else if (xp > 30 && xp <= 50) {
          return 'Heroic';
        } else {
          return 'Legendary';
        }
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

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
