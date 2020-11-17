<template>
  <v-container>

    <v-row>
      <v-col>
        <v-card color='info' class='pa-3'>
          <v-form >

            <v-text-field
              label='Name'
              v-model='formName'
              required
            ></v-text-field>

            <v-text-field label='Unit Type' v-model='formUnitType'></v-text-field>

            <v-autocomplete label='Battlefield Role' :items='$store.state.roles' v-model='formRole'></v-autocomplete>

            <v-text-field
              label='Power Level'
              v-model.number="formCost"
              :error-messages="costRuleErrorMessages"
              single-line
              type="number"
            />

            <v-text-field label='Equipment' v-model='formEquipment'></v-text-field>

            <v-checkbox
              v-model="formCharacter"
              label="Character"
            ></v-checkbox>

            <v-checkbox
              v-model="formPsyker"
              label="Psyker"
            ></v-checkbox>

            <v-text-field v-if="formPsyker" label='Psychic Powers' v-model='formPsychicPowers'></v-text-field>

          </v-form>

          <v-card-actions>
            <v-btn
              color="primary"
              @click="returnToArmy"
            >
              Cancel
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
              color='primary'
              @click='createNewUnit'
            >
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import { createUnit } from "@/api/firebaseMethods";


  export default Vue.extend({
    name: 'Firebase',

    data() {
      return {
        formName: '',
        formUnitType: '',
        formRole: '',
        formCost: null,
        formEquipment: '',
        formCharacter: false,
        formPsyker: false,
        formPsychicPowers: '',
        // isValid: true,
      }
    },

    methods: {
      async createNewUnit() {
        const id = await createUnit({
          name: this.formName,
          role: this.formRole,
          supplyCost: this.formCost,
          armyId: this.$route.params.id,
          unitType: this.formUnitType,
          equipment: this.formEquipment,
          character: this.formCharacter,
          psyker: this.formPsyker,
          psychicPowers: this.formPsychicPowers,
        });
        this.$store.dispatch('setArmyUnits', this.$route.params.id)
        return this.$router.push({ name: 'Unit', params: { id } });
      },
      returnToArmy() {
        return this.$router.push({ name: 'Army', id: this.$route.params.id });
      },
    },

    computed: {
      army() {
        return this.$store.getters.getArmyById(this.$route.params.id)
      },
      costRuleErrorMessages() {
        if (this.formCost > this.army.supplyLimit) {
          return ['Power level exceeds supply limit.'];
        }
        return [];
      },
    },
  })
</script>


// v-model="isValid"
// :disabled="!isValid"
