import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#eb5e28',
        secondary: '#403d39',
        accent: '#252422',
        info: '#ccc5b9',
      },
    },
  },
});
