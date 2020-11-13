import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from './store';
import Vuex from 'vuex';
import { domain, clientId, audience, responseType } from "./auth_config.json";
import { Auth0Plugin } from "./auth";
import VueNumberInput from '@chenfengyuan/vue-number-input';
import VueAnalytics from 'vue-ua';




// auth0
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

// number input
Vue.use(VueNumberInput);

// vue analytics
Vue.use(VueAnalytics, {
  // [Required] The name of your app as specified in Google Analytics.
  appName: 'Aemos',
  // [Required] The version of your app.
  appVersion: '1.0',
  // [Required] Your Google Analytics tracking ID.
  trackingId: '252715275',
})



Vue.config.productionTip = false;


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
