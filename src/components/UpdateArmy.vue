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
          class="mx-2"
          fab
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon color='secondary'>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card color='info'>
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
          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Requisition</h3>
              <number-input
                v-model='updateRequisition'
                :min="0"
                :max="5"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>

          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Supply Limit</h3>
              <number-input
                v-model='updateSupplyLimit'
                :min="50"
                :step="5"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>

          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Battle Tally</h3>
              <number-input
                v-model='updateBattleTally'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>


          <div class='center-container pt-4'>
            <div>
              <h3 class='text-center'>Battles Won</h3>
              <number-input
                v-model='updateBattlesWon'
                :min="0"
                inline
                center
                controls
                size="large"
              ></number-input>
            </div>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateArmy } from "@/api/firebaseMethods";



  export default Vue.extend({
    name: 'UnitExperienceCard',

    data () {
      return {
        dialog: false,
        updateRequisition: 0,
        updateSupplyLimit: 0,
        updateBattleTally: 0,
        updateBattlesWon: 0,
      }
    },

    props: {
      army: {
        type: Object,
        required: true
      }
    },

    methods: {
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
    },

    computed: {
      //
    },

    mounted() {
      this.updateRequisition = parseInt(this.$store.getters.getArmyById(this.$route.params.id).requisition, 10);
      this.updateSupplyLimit = parseInt(this.$store.getters.getArmyById(this.$route.params.id).supplyLimit, 10);
      this.updateBattleTally = parseInt(this.$store.getters.getArmyById(this.$route.params.id).battleTally, 10);
      this.updateBattlesWon = parseInt(this.$store.getters.getArmyById(this.$route.params.id).battlesWon, 10);
    },
  })
</script>
