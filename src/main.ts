import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
import Vuex from 'vuex';



// Import the Auth0 configuration
import { domain, clientId, audience, responseType } from "./auth_config.json";

// Import the plugin here
import { Auth0Plugin } from "./auth";

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  responseType,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});



Vue.config.productionTip = false;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
