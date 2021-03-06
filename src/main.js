import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueKonva from "vue-konva";
import moment from "moment";
import converter from "number-to-words";
import InfiniteLoading from "vue-infinite-loading";
import Vuelidate from "vuelidate";
import VueObserveVisibility from "vue-observe-visibility";

import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";

import PdfCanvas from "vue-pdf-canvas/lib/pdfjs/index.common.js";
Vue.use(PdfCanvas);

import TapAndHold from "vue-tap-and-hold";
Vue.use(TapAndHold, {
  holdTime: 2000, // default is 1000
  tapTime: 200, // default is 200
});

import "./registerServiceWorker";

Vue.use(Viewer);
Vue.use(VueKonva);
Vue.use(InfiniteLoading);
Vue.use(Vuelidate);
Vue.use(VueObserveVisibility);

Vue.config.productionTip = false;


Vue.filter("formatDate", function(value) {
  if (value) {
    return moment(String(value)).format("D-MMM, YYYY");
  }
});
Vue.filter("fromNow", function(value) {
  if (value) {
    return moment(String(value)).fromNow();
  }
});
Vue.filter("toWords", function(value) {
  if (!value) return "";
  return converter.toWords(value);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
