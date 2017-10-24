import Vue from 'vue'
import App from './App.vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import moment from "moment";
import VueMomentJS from "vue-momentjs";

import router from './router'
import store from './store'

Vue.use(VueAxios, axios)
Vue.use(VueMomentJS, moment);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user.user) {
      next('/signin');
    } else {
      next();
    }
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
