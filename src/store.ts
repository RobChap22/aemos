import Vue from 'vue';
import Vuex from 'vuex';
import { readArmies, readUnits } from "@/api/firebaseMethods";


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    roles: ['HQ', 'Troops', 'Elite', 'Fast Attack', 'Heavy Support', 'Flyer', 'Lord of War', 'Dedicated Transport'],
    factions: ['Imperium', 'Chaos', 'Aeldari', 'Tyranids', 'Orks', 'Necrons', 'Tau Empire'],
    userArmies: [],
    armyUnits: [],
  },

  mutations: {
    SET_USER_ARMIES(state, armies) {
      state.userArmies = armies;
    },
    SET_ARMY_UNITS(state, units) {
      state.armyUnits = units;
    },
  },

  actions: {
    async setUserArmies ({ commit }, id) {
      const armies = await readArmies(id);
      commit('SET_USER_ARMIES', armies)
    },

    async setArmyUnits ({ commit }, id) {
      const units = await readUnits(id);
      commit('SET_ARMY_UNITS', units);
    },
  },

  getters: {
    getArmyById: (state) => (id) => {
      return state.userArmies.find(army => army.id === id)
    },
    getUnitById: (state) => (id) => {
      return state.armyUnits.find(unit => unit.id === id)
    },
  }
})
