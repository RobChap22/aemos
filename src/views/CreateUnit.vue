<template>
  <v-container>

    <v-row>
      <v-col>
        <v-form>
          <v-text-field label='Name' v-model='formName'></v-text-field>
          <v-autocomplete label='Battlefield Role' :items='$store.state.roles' v-model='formRole'></v-autocomplete>
          <v-text-field
            label='Cost'
            v-model.number="formCost"
            hide-details
            single-line
            type="number"
          />

          <v-btn
            color='primary'
            @click='createNewUnit'
          >
            Create
          </v-btn>

        </v-form>
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
        formRole: '',
        formCost: null,
      }
    },

    methods: {
      async createNewUnit() {
        const id = await createUnit({
          name: this.formName,
          role: this.formRole,
          supplyCost: this.formCost,
          armyId: this.$route.params.id
        });
        this.$store.dispatch('setArmyUnits', this.$route.params.id)
        return this.$router.push({ name: 'Unit', params: { id } });
      },
    },
  })
</script>

