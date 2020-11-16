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

              :rules="rules"
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

            <v-btn
              color='primary'

              @click='createNewUnit'
            >
              Create
            </v-btn>

          </v-form>
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

      validateField () {
        this.$refs.form.validate()
      },
    },

    computed: {
      army() {
        return this.$store.getters.getArmyById(this.$route.params.id)
      },
      rules () {
        const rules = []
        console.log(this.formCost);
        if (this.formCost) {
          const rule =
            v => v <= this.army.supplyCost || 'Power level exceeds supply limit.'
          rules.push(rule)
        }
        if (this.formName) {
          const rule =
            v => !!v || 'This field must be completed.'
          rules.push(rule)
        }
        return rules
      },
    },

    watch: {
      // match: 'validateField',
      // max: 'validateField',
      // model: 'validateField',
      formCost: 'validateField',
      formName: 'validateField',
    },
  })
</script>


// v-model="isValid"
// :disabled="!isValid"
