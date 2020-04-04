import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./stores/store";
import buefy from "./buefy";
import { Auth0Plugin } from "./auth";

Vue.config.productionTip = false;

const domain = process.env.VUE_APP_Auth0_domain;
const clientId = process.env.VUE_APP_Auth0_clientId;
const audience = process.env.VUE_APP_Auth0_audience;

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
