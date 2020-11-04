<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(army, i) in armies"
        :key="i"
        :cols="army.flex"
      >
        <v-card>
          <h1>{{ army.name }}</h1>
        </v-card>
      </v-col>
    </v-row>

  </v-container>
</template>


<script lang="ts">
  import Vue from 'vue'
  import firebase from "../firebaseInit";


  const db = firebase.firestore();

  export default Vue.extend({
    name: 'Firebase',

    data() {
      return {
        armies: [],
      }
    },

    mounted() {

        db.collection("armies")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc);

              this.armies.push({
                id: doc.id,
                name: doc.data().name,
                faction: doc.data().faction,
              });
              console.log(doc.id, " => ", doc.data());
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });

    }
  })
</script>

