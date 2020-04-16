import Vue from "vue";
import 'babel-polyfill';
import App from "./App.vue";
import router from "./router.js";
import VueCookies from "vue-cookies";
import less from "less";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

Vue.config.productionTip = false;

Vue.use(ViewUI);
Vue.use(VueCookies);
Vue.use(less);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
