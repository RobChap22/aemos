<template>
  <v-container>
    <v-row>
      <v-col cols='12'>
        <v-card color='info' class="d-flex pa-2">
          <div class='center-container img-box'>
            <v-img
              max-height='80'
              max-width='80'
              :src='unit.roleImg'
            ></v-img>
          </div>
          <div>
            <v-card-title class="headline">
              {{ unit.name }}
            </v-card-title>
            <v-card-subtitle>{{ unit.unitType}}</v-card-subtitle>
          </div>
          <v-spacer></v-spacer>
          <div>
            <div class="unit-numerical-display pr-3">
              <p class="unit-supply-cost">{{ unit.supplyCost }}</p>
              <p class="unit-crusade-points">{{ unit.crusadePoints }}</p>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <UnitEquipmentCard :unit="unit"></UnitEquipmentCard>

    <UnitExperienceCard :unit="unit"></UnitExperienceCard>

    <v-row>
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
              @click="pushToArmy(unit.armyRef)"
            >
                 <v-icon color='secondary'>mdi-arrow-left-thick</v-icon>
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
            <UpdateUnit :unit="unit"></UpdateUnit>
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
            <DeleteUnit :unit="unit"></DeleteUnit>
          </div>
        </v-card>
      </v-col>

    </v-row>
  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { updateUnit, deleteUnit } from "@/api/firebaseMethods";
  import UnitExperienceCard from "@/components/UnitExperienceCard.vue";
  import UnitEquipmentCard from "@/components/UnitEquipmentCard.vue";
  import UpdateUnit from "@/components/UpdateUnit.vue";
  import DeleteUnit from "@/components/DeleteUnit.vue";


  export default Vue.extend({
    name: 'Unit',

    data () {
      return {
        //
      }
    },

    components: {
      UnitExperienceCard,
      UnitEquipmentCard,
      UpdateUnit,
      DeleteUnit,
    },

    methods: {
      pushToArmy(id) {
        return this.$router.push({ name: 'Army', params: { id } });
      },
      async pushToDeleteUnit(id) {
        const armyId = this.unit.armyRef;
        await deleteUnit(id);
        return this.$router.push({ name: 'Army', params: { id: armyId } });
      }
    },

    computed: {
      unit() {
        return this.$store.getters.getUnitById(this.$route.params.id)
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
