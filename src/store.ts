import Vue from 'vue';
import Vuex from 'vuex';
import { readArmies } from "@/api/firebaseMethods";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    userArmies: null,
  },

  mutations: {
    SET_USER_ARMIES(state, armies) {
      state.userArmies = armies;
    }
  },

  actions: {
    async setUserArmies ({ commit }, id) {
      const armies = await readArmies(id);
      commit('SET_USER_ARMIES', armies)
    }
  },
  getters: {
    getArmyById: (state) => (id) => {
      return state.userArmies.find(army => army.id === id)
    }
  }
})
