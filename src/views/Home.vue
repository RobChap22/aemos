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
          <div class='center-container img-box'>
            <v-img
              max-height='62'
              max-width='62'
              :src='army.factionImg'
            ></v-img>
          </div>
          <div class='center-container'>
            <h4>{{ army.name }}</h4>
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
                 <v-icon color='secondary'>mdi-plus</v-icon>
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

  .img-box {
    padding: 7px;
  }

</style>


