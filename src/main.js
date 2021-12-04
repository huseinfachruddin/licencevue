import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Particles from 'particlesjs';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  Particles,
  render: h => h(App),
}).$mount('#app')
