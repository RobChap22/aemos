<template>
  <v-container>


    <v-row justify='center'>
      <v-col
        v-for="(army, i) in $store.state.userArmies"
        :key="i"
        cols="5"
      >
        <v-card
          class='army-index-card'
          color='info'
          @click='pushToArmy(army.id)'
        >
          <div>
          </div>
          <div class='army-content text-center'>
            <h2>{{ army.name }}</h2>
            <h3>{{ army.faction }}</h3>
          </div>

        </v-card>
      </v-col>

      <v-col
        cols="5"
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
              @click='pushToCreateArmy'
            >
                 <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>



  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',

  methods: {
    pushToArmy(id) {
      return this.$router.push({ name: 'Army', params: { id } });
    },
    pushToCreateArmy() {
      return this.$router.push({ name: 'CreateArmy' })
    },
  },

  mounted() {
    this.$store.dispatch('setUserArmies', this.$auth.user.sub)
  },

});
</script>


<style>

  .army-content {
    color: #403d39;
    text-decoration: none;
    font-weight: normal;
  }

  #new-army-card-text {
    color: #eb5e28;
  }

  .center-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>


