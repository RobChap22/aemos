import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#F6982C',
        secondary: '#333333',
        accent: '#FFFFFF',
        info: '#666666',
      },
    },
  },
});
