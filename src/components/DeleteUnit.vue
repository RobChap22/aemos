<template>
  <div class="text-center">
    <v-dialog
      v-model="isDeleteDialogueOpen"
      width="500"
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
          <v-icon color='secondary'>mdi-delete</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary">
          Delete
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete this unit permanently?
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn
            color="primary"
            text
            @click="isDeleteDialogueOpen = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="pushToDeleteUnit(unit.id)"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { deleteUnit } from "@/api/firebaseMethods";


  export default Vue.extend({
    name: 'Unit',

    data () {
      return {
        isDeleteDialogueOpen: false,
      }
    },

    props: {
      unit: {
        type: Object,
        required: true
      }
    },

    methods: {
      async pushToDeleteUnit(id) {
        const armyId = this.unit.armyRef;
        await deleteUnit(id);
        return this.$router.push({ name: 'Army', params: { id: armyId } });
      }
    },

  })
</script>
